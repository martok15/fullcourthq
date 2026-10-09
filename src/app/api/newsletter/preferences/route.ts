import {
  isNewsletterAudience,
  isNewsletterRateLimited,
  newsletterConfig,
  updateNewsletterTopics,
  verifyNewsletterToken,
} from "@/lib/newsletter";
import type { NewsletterPreference } from "@/lib/newsletter-common";

const unavailableMessage = "We could not update those preferences just now. Please try again later.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please send the form again." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const token = typeof record.token === "string" ? record.token : null;
  const preference = parsePreference(record.audience);
  if (!preference) return Response.json({ error: "Choose the updates you want." }, { status: 400 });

  const config = await newsletterConfig(request);
  if (!config) {
    console.error(
      "Newsletter preferences not updated: configure RESEND_API_KEY, RESEND_PARENT_TOPIC_ID, RESEND_STAFF_TOPIC_ID, and NEWSLETTER_SIGNING_SECRET",
    );
    return Response.json({ error: unavailableMessage }, { status: 503 });
  }

  const payload = await verifyNewsletterToken(token, "manage", config.signingSecret);
  if (!payload) return Response.json({ error: "This preferences link is no longer valid." }, { status: 400 });

  if (await isNewsletterRateLimited(request, payload.email, "preferences")) {
    return Response.json({ error: "Please wait a minute before updating again." }, { status: 429 });
  }

  try {
    await updateNewsletterTopics(config, payload.email, preference, payload.iat);
  } catch (error) {
    console.error("Newsletter preferences update failed", error);
    return Response.json({ error: unavailableMessage }, { status: 502 });
  }

  return Response.json({ ok: true, message: "Your FullCourtHQ update preferences have been saved." });
}

function parsePreference(value: unknown): NewsletterPreference | null {
  if (value === "none") return "none";
  if (typeof value === "string" && isNewsletterAudience(value)) return value;
  return null;
}
