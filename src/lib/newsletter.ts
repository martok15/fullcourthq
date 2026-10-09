import { getCloudflareContext } from "@opennextjs/cloudflare";

import { contactEmail } from "@/lib/contact";
import { newsletterAudienceLabels, newsletterAudiences } from "@/lib/newsletter-common";
import type { NewsletterAudience, NewsletterPreference } from "@/lib/newsletter-common";
import { siteUrl } from "@/lib/site";

export type NewsletterTokenScope = "confirm" | "manage" | "unsubscribe";

const defaultNewsletterFrom = "FullCourtHQ Updates <updates@mail.fullcourthq.com>";
const confirmTokenTtlMs = 72 * 60 * 60 * 1000;
const manageTokenTtlMs = 30 * 24 * 60 * 60 * 1000;
const unsubscribeTokenTtlMs = 365 * 24 * 60 * 60 * 1000;
const resendApiBase = "https://api.resend.com";
const fallbackWindowMs = 60 * 1000;
const fallbackBuckets = new Map<string, number[]>();
const optOutPropertyKeys = {
  parent: "fchq_parent_updates_opted_out_at",
  staff: "fchq_staff_updates_opted_out_at",
} as const;

export type NewsletterSignup = {
  email: string;
  name: string;
  audience: NewsletterAudience;
  consent: boolean;
};

export type NewsletterSignupErrors = Partial<Record<keyof NewsletterSignup, string>>;

export type NewsletterConfig = {
  apiKey: string;
  from: string;
  parentTopicId: string;
  staffTopicId: string;
  signingSecret: string;
  baseUrl: string;
};

type RateLimiter = { limit(options: { key: string }): Promise<{ success: boolean }> };

type NewsletterTokenPayload = {
  v: 1;
  scope: NewsletterTokenScope;
  email: string;
  name?: string;
  audience: NewsletterPreference;
  iat: number;
  exp: number;
};

type ResendError = {
  status: number;
  body: string;
};

type ResendContact = {
  email?: string;
  unsubscribed?: boolean;
  properties?: Record<string, { value?: unknown } | unknown>;
};

export function parseNewsletterSignup(body: unknown): NewsletterSignup {
  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const audience = typeof record.audience === "string" && isNewsletterAudience(record.audience) ? record.audience : "parent";

  return {
    email: normalizeEmail(record.email),
    name: normalizeName(record.name),
    audience,
    consent: record.consent === true,
  };
}

export function validateNewsletterSignup(signup: NewsletterSignup): NewsletterSignupErrors {
  const errors: NewsletterSignupErrors = {};
  if (!isEmail(signup.email)) errors.email = "Enter a valid email address.";
  if (signup.name.length > 80) errors.name = "Keep the name under 80 characters.";
  if (!newsletterAudiences.includes(signup.audience)) errors.audience = "Choose which updates you want.";
  if (!signup.consent) errors.consent = "Confirm that you want to receive these updates.";
  return errors;
}

export function isNewsletterAudience(value: string): value is NewsletterAudience {
  return newsletterAudiences.includes(value as NewsletterAudience);
}

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function normalizeName(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}

export function selectedTopicsForPreference(preference: NewsletterPreference, config: Pick<NewsletterConfig, "parentTopicId" | "staffTopicId">) {
  return [
    { id: config.parentTopicId, subscription: preference === "parent" || preference === "both" ? "opt_in" : "opt_out" },
    { id: config.staffTopicId, subscription: preference === "staff" || preference === "both" ? "opt_in" : "opt_out" },
  ];
}

export async function newsletterConfig(request?: Request): Promise<NewsletterConfig | null> {
  const [apiKey, parentTopicId, staffTopicId, signingSecret] = await Promise.all([
    readEnv("RESEND_API_KEY"),
    readEnv("RESEND_PARENT_TOPIC_ID"),
    readEnv("RESEND_STAFF_TOPIC_ID"),
    readEnv("NEWSLETTER_SIGNING_SECRET"),
  ]);

  if (!apiKey || !parentTopicId || !staffTopicId || !signingSecret) return null;

  return {
    apiKey,
    parentTopicId,
    staffTopicId,
    from: (await readEnv("NEWSLETTER_FROM")) ?? defaultNewsletterFrom,
    signingSecret,
    baseUrl: await publicBaseUrl(request),
  };
}

export async function sendNewsletterConfirmation(config: NewsletterConfig, signup: NewsletterSignup) {
  const confirmToken = await createNewsletterToken(
    {
      scope: "confirm",
      email: signup.email,
      name: signup.name || undefined,
      audience: signup.audience,
      ttlMs: confirmTokenTtlMs,
    },
    config.signingSecret,
  );
  const unsubscribeToken = await createNewsletterToken(
    {
      scope: "unsubscribe",
      email: signup.email,
      name: signup.name || undefined,
      audience: "none",
      ttlMs: unsubscribeTokenTtlMs,
    },
    config.signingSecret,
  );
  const confirmUrl = `${config.baseUrl}/updates/confirm?token=${encodeURIComponent(confirmToken)}`;
  const unsubscribeUrl = `${config.baseUrl}/updates/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;

  return resendRequest(config.apiKey, "/emails", {
    method: "POST",
    body: {
      from: config.from,
      to: [signup.email],
      subject: "Confirm your FullCourtHQ updates",
      text: confirmationText(signup, confirmUrl, unsubscribeUrl),
      html: confirmationHtml(signup, confirmUrl, unsubscribeUrl),
    },
  });
}

export async function confirmNewsletterSignup(config: NewsletterConfig, payload: NewsletterTokenPayload) {
  await ensureContactCanReceiveSelectedTopics(config, payload);
  await ensureResendContact(config, payload);
  await updateNewsletterTopics(config, payload.email, payload.audience, payload.iat);
  return createNewsletterToken(
    {
      scope: "manage",
      email: payload.email,
      name: payload.name,
      audience: payload.audience,
      ttlMs: manageTokenTtlMs,
    },
    config.signingSecret,
  );
}

export async function unsubscribeNewsletterEmail(config: NewsletterConfig, payload: NewsletterTokenPayload) {
  await ensureResendContact(config, payload);
  await updateNewsletterTopics(config, payload.email, "none", payload.iat);
}

export async function updateNewsletterTopics(
  config: Pick<NewsletterConfig, "apiKey" | "parentTopicId" | "staffTopicId">,
  email: string,
  preference: NewsletterPreference,
  issuedAt = Date.now(),
) {
  if (preference !== "none") await ensureContactCanReceive(config, email, preference, issuedAt);
  await resendRequest(config.apiKey, `/contacts/${encodeURIComponent(email)}/topics`, {
    method: "PATCH",
    body: selectedTopicsForPreference(preference, config),
  });
  await updateOptOutMarkers(config, email, preference);
}

export async function verifyNewsletterToken(token: string | null, scope: NewsletterTokenScope, secret: string) {
  if (!token) return null;
  const [version, encodedIv, encodedCiphertext] = token.split(".");
  if (version !== "v1" || !encodedIv || !encodedCiphertext) return null;

  try {
    const plaintext = await decryptTokenPayload(encodedIv, encodedCiphertext, secret);
    const payload = JSON.parse(plaintext) as NewsletterTokenPayload;
    if (
      payload.v !== 1 ||
      payload.scope !== scope ||
      !isEmail(payload.email) ||
      !isNewsletterPreference(payload.audience) ||
      !Number.isFinite(payload.iat) ||
      !Number.isFinite(payload.exp) ||
      Date.now() > payload.exp
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createNewsletterToken(
  input: {
    scope: NewsletterTokenScope;
    email: string;
    name?: string;
    audience: NewsletterPreference;
    ttlMs: number;
  },
  secret: string,
) {
  const now = Date.now();
  const payload: NewsletterTokenPayload = {
    v: 1,
    scope: input.scope,
    email: normalizeEmail(input.email),
    name: input.name ? normalizeName(input.name) : undefined,
    audience: input.audience,
    iat: now,
    exp: now + input.ttlMs,
  };
  const { iv, ciphertext } = await encryptTokenPayload(JSON.stringify(payload), secret);
  return `v1.${iv}.${ciphertext}`;
}

export async function isNewsletterRateLimited(request: Request, email: string, kind: "signup" | "preferences") {
  const env = await workerEnv();
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

  if (!env) {
    const emailHash = await sha256(email);
    return (
      fallbackLimit(`newsletter:${kind}:ip:${ip}`, kind === "signup" ? 5 : 8) ||
      fallbackLimit(`newsletter:${kind}:email:${emailHash}`, kind === "signup" ? 2 : 8)
    );
  }

  if (kind === "signup") {
    const perIp = env.NEWSLETTER_SIGNUP_PER_IP as RateLimiter | undefined;
    const perEmail = env.NEWSLETTER_SIGNUP_PER_EMAIL as RateLimiter | undefined;
    const global = env.NEWSLETTER_SIGNUP_GLOBAL as RateLimiter | undefined;
    const emailHash = await sha256(email);
    if (!perIp || !perEmail || !global) {
      console.error("Newsletter signup rate limiters are not bound; check ratelimits in wrangler.jsonc");
      return true;
    }
    return (
      (await rateLimitExceeded(perIp, ip)) ||
      (await rateLimitExceeded(perEmail, emailHash)) ||
      (await rateLimitExceeded(global, "all"))
    );
  }

  const perIp = env.NEWSLETTER_PREFERENCES_PER_IP as RateLimiter | undefined;
  if (!perIp) {
    console.error("Newsletter preferences rate limiter is not bound; check ratelimits in wrangler.jsonc");
    return true;
  }
  return rateLimitExceeded(perIp, ip);
}

async function ensureContactCanReceiveSelectedTopics(config: NewsletterConfig, payload: NewsletterTokenPayload) {
  const contact = await getResendContact(config.apiKey, payload.email);
  if (!contact) return;

  if (contact.unsubscribed) throw new Error("Contact is globally unsubscribed");

  const selectedTopicIds = selectedTopicsForPreference(payload.audience, config)
    .filter((topic) => topic.subscription === "opt_in")
    .map((topic) => topic.id);
  const explicitOptOutTopic = selectedTopicIds.some((topicId) =>
    optOutTimestampForTopic(contact, config, topicId) >= payload.iat,
  );
  if (explicitOptOutTopic) throw new Error("Contact explicitly opted out after this confirmation was issued");
}

async function ensureContactCanReceive(
  config: Pick<NewsletterConfig, "apiKey" | "parentTopicId" | "staffTopicId">,
  email: string,
  preference: NewsletterPreference,
  issuedAt: number,
) {
  const contact = await getResendContact(config.apiKey, email);
  if (contact?.unsubscribed) throw new Error("Contact is globally unsubscribed");
  if (!contact) return;

  const selectedTopicIds = selectedTopicsForPreference(preference, config)
    .filter((topic) => topic.subscription === "opt_in")
    .map((topic) => topic.id);
  if (selectedTopicIds.some((topicId) => optOutTimestampForTopic(contact, config, topicId) >= issuedAt)) {
    throw new Error("Contact explicitly opted out after this preferences link was issued");
  }
}

async function ensureResendContact(config: NewsletterConfig, payload: NewsletterTokenPayload) {
  const body: Record<string, unknown> = { email: payload.email };
  if (payload.name) {
    const [firstName, ...rest] = payload.name.split(" ");
    body.first_name = firstName;
    if (rest.length > 0) body.last_name = rest.join(" ");
  }

  try {
    await resendRequest(config.apiKey, "/contacts", { method: "POST", body });
  } catch (error) {
    if (isAlreadyExists(error)) return;
    throw error;
  }
}

async function getResendContact(apiKey: string, email: string) {
  try {
    return await resendJson<ResendContact>(apiKey, `/contacts/${encodeURIComponent(email)}`, { method: "GET" });
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

async function updateOptOutMarkers(
  config: Pick<NewsletterConfig, "apiKey" | "parentTopicId" | "staffTopicId">,
  email: string,
  preference: NewsletterPreference,
) {
  const now = new Date().toISOString();
  const properties = {
    [optOutPropertyKeys.parent]: preference === "parent" || preference === "both" ? null : now,
    [optOutPropertyKeys.staff]: preference === "staff" || preference === "both" ? null : now,
  };

  await resendRequest(config.apiKey, `/contacts/${encodeURIComponent(email)}`, {
    method: "PATCH",
    body: { properties },
  });
}

async function resendJson<T>(apiKey: string, path: string, options: { method: string; body?: unknown }) {
  const response = await resendRequest(apiKey, path, options);
  return (await response.json()) as T;
}

function optOutTimestampForTopic(
  contact: ResendContact,
  config: Pick<NewsletterConfig, "parentTopicId" | "staffTopicId">,
  topicId: string,
) {
  const key =
    topicId === config.parentTopicId ? optOutPropertyKeys.parent : topicId === config.staffTopicId ? optOutPropertyKeys.staff : null;
  if (!key) return 0;
  return propertyTimestamp(contact.properties?.[key]);
}

function propertyTimestamp(property: { value?: unknown } | unknown) {
  const value = property && typeof property === "object" && "value" in property ? property.value : property;
  if (typeof value !== "string") return 0;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

async function resendRequest(apiKey: string, path: string, options: { method: string; body?: unknown }) {
  const response = await fetch(`${resendApiBase}${path}`, {
    method: options.method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  }).catch((error: unknown) => {
    console.error("Newsletter Resend request failed before response", error);
    return null;
  });

  if (!response) throw new Error("Resend could not be reached");
  if (response.ok) return response;

  const body = await response.text();
  throw { status: response.status, body } satisfies ResendError;
}

function confirmationText(signup: NewsletterSignup, confirmUrl: string, unsubscribeUrl: string) {
  return [
    `Confirm ${newsletterAudienceLabels[signup.audience]} from FullCourtHQ.`,
    "",
    "Click this link within 72 hours to confirm your email and join the selected update list:",
    confirmUrl,
    "",
    "If you did not request this, you can ignore this email. To opt this address out of these FullCourtHQ updates, use:",
    unsubscribeUrl,
    "",
    `Questions? Email ${contactEmail}.`,
  ].join("\n");
}

function confirmationHtml(signup: NewsletterSignup, confirmUrl: string, unsubscribeUrl: string) {
  const label = escapeHtml(newsletterAudienceLabels[signup.audience]);
  return (
    `<div style="margin:0;background:#f6f7fb;padding:28px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#11152a">` +
    `<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7e9f0;border-radius:8px;padding:28px">` +
    `<p style="margin:0 0 10px;color:#431486;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">FullCourtHQ updates</p>` +
    `<h1 style="margin:0 0 14px;font-size:26px;line-height:1.15">Confirm your email</h1>` +
    `<p style="margin:0 0 18px;line-height:1.55;color:#3b4259">You asked to receive <strong>${label}</strong>. Confirm within 72 hours and we will add this address to the selected Resend Broadcast topic.</p>` +
    `<p style="margin:0 0 24px"><a href="${escapeHtml(confirmUrl)}" style="display:inline-block;border-radius:999px;background:#431486;color:#ffffff;padding:13px 18px;font-weight:700;text-decoration:none">Confirm updates</a></p>` +
    `<p style="margin:0 0 14px;font-size:13px;line-height:1.5;color:#667085">If the button does not work, copy and paste this link into your browser:<br><a href="${escapeHtml(confirmUrl)}" style="color:#431486">${escapeHtml(confirmUrl)}</a></p>` +
    `<p style="margin:18px 0 0;font-size:13px;line-height:1.5;color:#667085">If you did not request this, you can ignore this email. You can also <a href="${escapeHtml(unsubscribeUrl)}" style="color:#431486">opt this address out</a> of these FullCourtHQ updates.</p>` +
    `</div></div>`
  );
}

function isNewsletterPreference(value: string): value is NewsletterPreference {
  return value === "none" || isNewsletterAudience(value);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isAlreadyExists(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const resendError = error as Partial<ResendError>;
  return resendError.status === 409 || (resendError.status === 422 && /already|exist/i.test(resendError.body ?? ""));
}

function isNotFound(error: unknown) {
  return Boolean(error && typeof error === "object" && (error as Partial<ResendError>).status === 404);
}

async function rateLimitExceeded(limiter: RateLimiter, key: string) {
  try {
    return !(await limiter.limit({ key })).success;
  } catch (error) {
    console.error("Newsletter rate limiter failed", error);
    return true;
  }
}

async function publicBaseUrl(request?: Request) {
  const configured = await readEnv("NEWSLETTER_CONFIRM_BASE_URL");
  if (configured) return configured.replace(/\/+$/, "");
  if (request) {
    const origin = new URL(request.url).origin;
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return origin;
  }
  return siteUrl;
}

async function workerEnv(): Promise<Record<string, unknown> | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as unknown as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function readEnv(name: string) {
  let value = (await workerEnv())?.[name];
  if (typeof value !== "string" || !value.trim()) value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

async function encryptTokenPayload(value: string, secret: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await aesKey(secret);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(value));
  return {
    iv: base64UrlEncodeBytes(iv),
    ciphertext: base64UrlEncodeBytes(new Uint8Array(ciphertext)),
  };
}

async function decryptTokenPayload(encodedIv: string, encodedCiphertext: string, secret: string) {
  const key = await aesKey(secret);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64UrlDecodeBytes(encodedIv) },
    key,
    base64UrlDecodeBytes(encodedCiphertext),
  );
  return new TextDecoder().decode(plaintext);
}

async function aesKey(secret: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return base64UrlEncodeBytes(new Uint8Array(digest));
}

function fallbackLimit(key: string, limit: number) {
  const now = Date.now();
  const recent = (fallbackBuckets.get(key) ?? []).filter((timestamp) => now - timestamp < fallbackWindowMs);
  recent.push(now);
  fallbackBuckets.set(key, recent);
  return recent.length > limit;
}

function base64UrlEncodeBytes(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

function base64UrlDecodeBytes(value: string) {
  return Buffer.from(value, "base64url");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);
}
