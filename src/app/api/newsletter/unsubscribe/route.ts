import { isNewsletterRateLimited, newsletterConfig, unsubscribeNewsletterEmail, verifyNewsletterToken } from "@/lib/newsletter";

const unavailableMessage = "We could not unsubscribe that address just now. Please try again later.";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const destination = new URL("/updates/unsubscribe", requestUrl.origin);
  const token = requestUrl.searchParams.get("token");
  if (token) destination.searchParams.set("token", token);
  return Response.redirect(destination.toString(), 303);
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please send the form again." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const token = typeof record.token === "string" ? record.token : null;
  const config = await newsletterConfig(request);
  if (!config) {
    console.error(
      "Newsletter unsubscribe not updated: configure RESEND_API_KEY, RESEND_PARENT_TOPIC_ID, RESEND_STAFF_TOPIC_ID, and NEWSLETTER_SIGNING_SECRET",
    );
    return Response.json({ error: unavailableMessage }, { status: 503 });
  }

  const payload = await verifyNewsletterToken(token, "unsubscribe", config.signingSecret);
  if (!payload) return Response.json({ error: "This unsubscribe link is no longer valid." }, { status: 400 });

  if (await isNewsletterRateLimited(request, payload.email, "preferences")) {
    return Response.json({ error: "Please wait a minute before updating again." }, { status: 429 });
  }

  try {
    await unsubscribeNewsletterEmail(config, payload);
    return Response.json({ ok: true, redirectTo: statusUrl(requestUrl, "unsubscribed") });
  } catch (error) {
    console.error("Newsletter unsubscribe failed", error);
    return Response.json({ error: unavailableMessage }, { status: 502 });
  }
}

function statusUrl(requestUrl: URL, status: string) {
  const destination = new URL("/updates/confirmed", requestUrl.origin);
  destination.searchParams.set("status", status);
  return destination.toString();
}
