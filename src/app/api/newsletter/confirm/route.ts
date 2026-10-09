import { confirmNewsletterSignup, newsletterConfig, verifyNewsletterToken } from "@/lib/newsletter";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const destination = new URL("/updates/confirm", requestUrl.origin);
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
    return Response.json({ error: "Please open the confirmation link again." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const token = typeof record.token === "string" ? record.token : null;
  const config = await newsletterConfig(request);
  if (!config) return Response.json({ redirectTo: statusUrl(requestUrl, "setup") }, { status: 503 });

  const payload = await verifyNewsletterToken(token, "confirm", config.signingSecret);
  if (!payload) return Response.json({ redirectTo: statusUrl(requestUrl, "invalid") }, { status: 400 });

  try {
    const manageToken = await confirmNewsletterSignup(config, payload);
    return Response.json({ ok: true, redirectTo: statusUrl(requestUrl, "confirmed", manageToken) });
  } catch (error) {
    console.error("Newsletter signup confirmation failed", error);
    return Response.json({ redirectTo: statusUrl(requestUrl, "error") }, { status: 502 });
  }
}

function statusUrl(requestUrl: URL, status: string, manageToken?: string) {
  const destination = new URL("/updates/confirmed", requestUrl.origin);
  destination.searchParams.set("status", status);
  if (manageToken) destination.searchParams.set("manage", manageToken);
  return destination.toString();
}
