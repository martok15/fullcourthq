import {
  isNewsletterRateLimited,
  newsletterConfig,
  parseNewsletterSignup,
  sendNewsletterConfirmation,
  validateNewsletterSignup,
} from "@/lib/newsletter";

const acceptedMessage = "If that address can receive FullCourtHQ updates, a confirmation email is on the way.";
const unavailableMessage = "We could not start the signup just now. Please try again later.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please send the form again." }, { status: 400 });
  }

  if (body && typeof body === "object" && (body as Record<string, unknown>).company_website) {
    return Response.json({ ok: true, message: acceptedMessage });
  }

  const signup = parseNewsletterSignup(body);
  const errors = validateNewsletterSignup(signup);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "A few details still need your attention.", errors }, { status: 400 });
  }

  if (await isNewsletterRateLimited(request, signup.email, "signup")) {
    return Response.json({ ok: true, message: acceptedMessage });
  }

  const config = await newsletterConfig(request);
  if (!config) {
    console.error(
      "Newsletter signup not sent: configure RESEND_API_KEY, RESEND_PARENT_TOPIC_ID, RESEND_STAFF_TOPIC_ID, and NEWSLETTER_SIGNING_SECRET",
    );
    return Response.json({ error: unavailableMessage }, { status: 503 });
  }

  try {
    await sendNewsletterConfirmation(config, signup);
  } catch (error) {
    console.error("Newsletter confirmation not sent: Resend returned an error", error);
    return Response.json({ error: unavailableMessage }, { status: 502 });
  }

  return Response.json({ ok: true, message: acceptedMessage });
}
