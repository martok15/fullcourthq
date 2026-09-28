import { getCloudflareContext } from "@opennextjs/cloudflare";

import { contactEmail } from "@/lib/contact";
import { parseDemoRequest, validateDemoRequest } from "@/lib/demo-request";
import type { DemoRequest } from "@/lib/demo-request";

// Walkthrough requests are emailed through Resend (https://resend.com).
//   RESEND_API_KEY     required; a secret on the Cloudflare Worker, or in .env.local for local testing
//   DEMO_REQUEST_TO    optional; where requests go, defaults to the public contact address
//   DEMO_REQUEST_FROM  optional; must be on a domain verified in Resend
const defaultFrom = "FullCourtHQ Website <website@fullcourthq.com>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please send the form again." }, { status: 400 });
  }

  // Hidden field that people never see; bots that fill every input get a quiet success.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company_website) {
    return Response.json({ ok: true });
  }

  const demoRequest = parseDemoRequest(body);
  const errors = validateDemoRequest(demoRequest);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "A few details still need your attention.", errors }, { status: 400 });
  }

  const apiKey = await readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("Demo request not sent: RESEND_API_KEY is not set");
    return Response.json({ error: notSentMessage }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: (await readEnv("DEMO_REQUEST_FROM")) ?? defaultFrom,
      to: [(await readEnv("DEMO_REQUEST_TO")) ?? contactEmail],
      reply_to: `${demoRequest.name.replace(/[<>"]/g, "")} <${demoRequest.email}>`,
      subject: `Walkthrough request: ${demoRequest.organization}`,
      text: toText(demoRequest),
      html: toHtml(demoRequest),
    }),
  }).catch((error: unknown) => {
    console.error("Demo request not sent: Resend could not be reached", error);
    return null;
  });

  if (!response?.ok) {
    if (response) console.error("Demo request not sent: Resend returned", response.status, await response.text());
    return Response.json({ error: notSentMessage }, { status: 502 });
  }

  return Response.json({ ok: true });
}

const notSentMessage = `We couldn’t send your request just now. Please email ${contactEmail} and we’ll get right back to you.`;

/** Worker secrets live on the Cloudflare env; `next dev` and `next start` read .env.local instead. */
async function readEnv(name: string) {
  let value: unknown;
  try {
    const { env } = await getCloudflareContext({ async: true });
    value = (env as unknown as Record<string, unknown>)[name];
  } catch {
    // Not running inside the Worker.
  }
  if (typeof value !== "string" || !value.trim()) value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function rows(request: DemoRequest): Array<[string, string]> {
  return [
    ["Name", request.name],
    ["Email", request.email],
    ["Organization", request.organization],
    ["Role", request.role || "Not provided"],
    ["Organization type", request.organizationType],
    ["Wants to explore", request.focus.join(", ")],
    ["Anything else", request.message || "Nothing added"],
  ];
}

function toText(request: DemoRequest) {
  return [
    "New walkthrough request from fullcourthq.com",
    "",
    ...rows(request).map(([label, value]) => `${label}: ${value}`),
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
}

function toHtml(request: DemoRequest) {
  const tableRows = rows(request)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#667085;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 0;color:#11152a;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return (
    `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5">` +
    `<p style="margin:0 0 16px;font-size:17px;font-weight:600;color:#11152a">New walkthrough request from fullcourthq.com</p>` +
    `<table style="border-collapse:collapse">${tableRows}</table>` +
    `<p style="margin:20px 0 0;color:#667085">Reply to this email to answer ${escapeHtml(request.name)} directly.</p>` +
    `</div>`
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);
}
