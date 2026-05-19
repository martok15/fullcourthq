import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type DemoRequestInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  organization?: unknown;
  website?: unknown;
  location?: unknown;
  courtCount?: unknown;
  notes?: unknown;
  company_website?: unknown;
};

type HubSpotRecord = {
  id: string;
};

const HUBSPOT_BASE_URL = "https://api.hubapi.com";
const DEFAULT_DEAL_PIPELINE = "default";
const DEFAULT_DEAL_STAGE = "appointmentscheduled";

export async function POST(request: NextRequest) {
  let input: DemoRequestInput;

  try {
    input = (await request.json()) as DemoRequestInput;
  } catch {
    return jsonError("Please send the form again with valid details.", 400);
  }

  if (cleanString(input.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateDemoRequest(input);
  if (!validation.ok) {
    return jsonError(validation.message, 400);
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    return jsonError("Demo requests are not connected yet. Please email info@fullcourthq.com directly.", 503);
  }

  try {
    const contact = await upsertContact(token, validation.data);
    const company = await upsertCompany(token, validation.data);
    const deal = await createDeal(token, validation.data);
    const note = await createOptionalNote(token, validation.data);

    await Promise.allSettled([
      associate(token, "contacts", contact.id, "deals", deal.id),
      company ? associate(token, "companies", company.id, "deals", deal.id) : Promise.resolve(),
      company ? associate(token, "contacts", contact.id, "companies", company.id) : Promise.resolve(),
      note ? associate(token, "notes", note.id, "contacts", contact.id) : Promise.resolve(),
      note ? associate(token, "notes", note.id, "deals", deal.id) : Promise.resolve(),
      note && company ? associate(token, "notes", note.id, "companies", company.id) : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("HubSpot demo request failed", error);
    return jsonError("We could not send that request. Please try again in a moment.", 502);
  }
}

function validateDemoRequest(input: DemoRequestInput):
  | {
      ok: true;
      data: {
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        organization: string;
        website: string | null;
        domain: string | null;
        location: string | null;
        courtCount: string | null;
        notes: string;
      };
    }
  | { ok: false; message: string } {
  const name = cleanString(input.name);
  const email = cleanString(input.email)?.toLowerCase();
  const phone = cleanString(input.phone);
  const organization = cleanString(input.organization);
  const website = cleanUrl(input.website);
  const location = cleanString(input.location);
  const courtCount = cleanString(input.courtCount);
  const notes = cleanString(input.notes);

  if (!name || name.length < 2) {
    return { ok: false, message: "Please add your name." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please add a valid email address." };
  }

  if (!organization) {
    return { ok: false, message: "Please add your facility or organization name." };
  }

  if (!notes || notes.length < 8) {
    return { ok: false, message: "Please add a short note about what you want to review." };
  }

  if (courtCount && (!/^\d+$/.test(courtCount) || Number(courtCount) < 1 || Number(courtCount) > 200)) {
    return { ok: false, message: "Please use a court count between 1 and 200." };
  }

  const [firstName, ...lastNameParts] = name.split(/\s+/);

  return {
    ok: true,
    data: {
      name,
      firstName,
      lastName: lastNameParts.join(" "),
      email,
      phone,
      organization,
      website,
      domain: website ? getDomain(website) : null,
      location,
      courtCount,
      notes,
    },
  };
}

async function upsertContact(token: string, data: ValidDemoData) {
  const existing = await searchObject(token, "contacts", "email", data.email, ["email"]);
  const properties = {
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    phone: data.phone ?? "",
    company: data.organization,
    website: data.website ?? "",
  };

  if (existing) {
    return hubspotRequest<HubSpotRecord>(token, `/crm/v3/objects/contacts/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
  }

  return hubspotRequest<HubSpotRecord>(token, "/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
}

async function upsertCompany(token: string, data: ValidDemoData) {
  const existing = data.domain
    ? await searchObject(token, "companies", "domain", data.domain, ["domain", "name"])
    : await searchObject(token, "companies", "name", data.organization, ["name"]);

  const properties = {
    name: data.organization,
    domain: data.domain ?? "",
    website: data.website ?? "",
    city: data.location ?? "",
    description: buildDescription(data),
  };

  if (existing) {
    return hubspotRequest<HubSpotRecord>(token, `/crm/v3/objects/companies/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
  }

  return hubspotRequest<HubSpotRecord>(token, "/crm/v3/objects/companies", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
}

async function createDeal(token: string, data: ValidDemoData) {
  return hubspotRequest<HubSpotRecord>(token, "/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        dealname: `FullCourtHQ demo - ${data.organization}`,
        pipeline: getHubSpotDealPipeline(),
        dealstage: getHubSpotDealStage(),
        description: buildDescription(data),
      },
    }),
  });
}

async function createNote(token: string, data: ValidDemoData) {
  return hubspotRequest<HubSpotRecord>(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: [
          "<strong>FullCourtHQ demo request</strong>",
          "",
          `<strong>Name:</strong> ${escapeHtml(data.name)}`,
          `<strong>Email:</strong> ${escapeHtml(data.email)}`,
          data.phone ? `<strong>Phone:</strong> ${escapeHtml(data.phone)}` : null,
          `<strong>Facility:</strong> ${escapeHtml(data.organization)}`,
          data.website ? `<strong>Website:</strong> ${escapeHtml(data.website)}` : null,
          data.location ? `<strong>Location:</strong> ${escapeHtml(data.location)}` : null,
          data.courtCount ? `<strong>Courts:</strong> ${escapeHtml(data.courtCount)}` : null,
          "",
          `<strong>Notes:</strong><br>${escapeHtml(data.notes).replace(/\n/g, "<br>")}`,
        ]
          .filter(Boolean)
          .join("<br>"),
      },
    }),
  });
}

async function createOptionalNote(token: string, data: ValidDemoData) {
  try {
    return await createNote(token, data);
  } catch (error) {
    console.warn("HubSpot note creation skipped", error);
    return null;
  }
}

async function associate(
  token: string,
  fromObjectType: string,
  fromObjectId: string,
  toObjectType: string,
  toObjectId: string,
) {
  await hubspotRequest(token, `/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/default/${toObjectType}/${toObjectId}`, {
    method: "PUT",
  });
}

async function searchObject(
  token: string,
  objectType: string,
  propertyName: string,
  value: string,
  properties: string[],
) {
  const response = await hubspotRequest<{ results: HubSpotRecord[] }>(token, `/crm/v3/objects/${objectType}/search`, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName,
              operator: "EQ",
              value,
            },
          ],
        },
      ],
      limit: 1,
      properties,
    }),
  });

  return response.results[0] ?? null;
}

async function hubspotRequest<T = unknown>(token: string, path: string, init: RequestInit = {}) {
  const response = await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HubSpot request failed: ${response.status} ${body}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function cleanString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim().replace(/\s+/g, " ");
  return cleaned ? cleaned.slice(0, 1200) : null;
}

function cleanUrl(value: unknown) {
  const raw = cleanString(value);
  if (!raw) {
    return null;
  }

  try {
    const url = new URL(raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`);
    return url.toString().slice(0, 220);
  } catch {
    return null;
  }
}

function getDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function buildDescription(data: ValidDemoData) {
  return [
    `FullCourtHQ demo request from ${data.name} (${data.email}).`,
    `Facility: ${data.organization}.`,
    data.location ? `Location: ${data.location}.` : null,
    data.courtCount ? `Courts: ${data.courtCount}.` : null,
    data.website ? `Website: ${data.website}.` : null,
    `Notes: ${data.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function getHubSpotDealPipeline() {
  return process.env.HUBSPOT_DEAL_PIPELINE?.trim() || DEFAULT_DEAL_PIPELINE;
}

function getHubSpotDealStage() {
  return process.env.HUBSPOT_DEAL_STAGE?.trim() || DEFAULT_DEAL_STAGE;
}

type ValidDemoData = Extract<ReturnType<typeof validateDemoRequest>, { ok: true }>["data"];
