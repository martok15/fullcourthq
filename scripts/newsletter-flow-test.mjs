import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

process.env.RESEND_API_KEY = "re_test_key";
process.env.RESEND_PARENT_TOPIC_ID = "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6";
process.env.RESEND_STAFF_TOPIC_ID = "0f50f68a-ff7b-44f6-8bcd-5764da82944d";
process.env.NEWSLETTER_SIGNING_SECRET = "test_secret_that_is_long_enough_for_encryption";

const calls = [];
let contactExists = false;
let contactGloballyUnsubscribed = false;
let topicSubscriptions = [];
let contactProperties = {};
const originalConsoleError = console.error;
console.error = (...args) => {
  const first = String(args[0] ?? "");
  if (first.startsWith("Newsletter signup confirmation failed") || first.startsWith("Newsletter preferences update failed")) {
    return;
  }
  originalConsoleError(...args);
};

global.fetch = async (url, init = {}) => {
  const parsedBody = init.body ? JSON.parse(String(init.body)) : null;
  calls.push({ url: String(url), method: init.method ?? "GET", body: parsedBody });

  if (String(url).endsWith("/emails")) return jsonResponse({ id: "email_123" });
  if (String(url).includes("/contacts/") && String(url).endsWith("/topics") && init.method === "GET") {
    return jsonResponse({ object: "list", has_more: false, data: topicSubscriptions });
  }
  if (String(url).includes("/contacts/") && init.method === "GET") {
    if (!contactExists) return new Response("not found", { status: 404 });
    return jsonResponse({
      object: "contact",
      id: "contact_123",
      email: "parent.one@example.com",
      unsubscribed: contactGloballyUnsubscribed,
      properties: Object.fromEntries(Object.entries(contactProperties).map(([key, value]) => [key, { value }])),
    });
  }
  if (String(url).endsWith("/contacts") && init.method === "POST") {
    if (contactExists) return new Response("contact already exists", { status: 409 });
    contactExists = true;
    return jsonResponse({ object: "contact", id: "contact_123" });
  }
  if (String(url).includes("/topics") && init.method === "PATCH") {
    topicSubscriptions = parsedBody;
    return jsonResponse({ object: "contact_topics", id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6" });
  }
  if (String(url).includes("/contacts/") && init.method === "PATCH") {
    contactProperties = { ...contactProperties, ...parsedBody.properties };
    return jsonResponse({ object: "contact", id: "contact_123" });
  }

  return new Response("unexpected request", { status: 500 });
};

const signupRoute = routeUserland("../.next/server/app/api/newsletter/signup/route.js");
const confirmRoute = routeUserland("../.next/server/app/api/newsletter/confirm/route.js");
const preferencesRoute = routeUserland("../.next/server/app/api/newsletter/preferences/route.js");
const unsubscribeRoute = routeUserland("../.next/server/app/api/newsletter/unsubscribe/route.js");

const signupBody = {
  email: "Parent.One@Example.com",
  name: "Parent One",
  audience: "both",
  consent: true,
};

const signupResponse = await signupRoute.POST(jsonRequest("http://localhost/api/newsletter/signup", signupBody));
assert.equal(signupResponse.status, 200);
assert.equal(calls.filter((call) => call.url.endsWith("/emails")).length, 1);

await signupRoute.POST(jsonRequest("http://localhost/api/newsletter/signup", signupBody));
await signupRoute.POST(jsonRequest("http://localhost/api/newsletter/signup", signupBody));
assert.equal(calls.filter((call) => call.url.endsWith("/emails")).length, 2);

const emailBody = calls.find((call) => call.url.endsWith("/emails")).body;
const confirmUrl = emailBody.text.match(/http:\/\/localhost\/updates\/confirm\?token=\S+/u)?.[0];
const unsubscribeUrl = emailBody.text.match(/http:\/\/localhost\/updates\/unsubscribe\?token=\S+/u)?.[0];
assert.ok(confirmUrl);
assert.ok(unsubscribeUrl);
assert.equal(confirmUrl.includes("parent.one@example.com"), false);
assert.equal(confirmUrl.includes("Parent"), false);

const forgedConfirm = `${confirmUrl.slice(0, -1)}x`;
const forgedResponse = await confirmRoute.GET(new Request(forgedConfirm));
assert.equal(new URL(forgedResponse.headers.get("location")).pathname, "/updates/confirm");
assert.equal(calls.filter((call) => String(call.url).includes("/topics")).length, 0);

const confirmToken = new URL(confirmUrl).searchParams.get("token");
const confirmResponse = await confirmRoute.POST(jsonRequest("http://localhost/api/newsletter/confirm", { token: confirmToken }));
assert.equal(confirmResponse.status, 200);

const confirmResult = await confirmResponse.json();
assert.equal(new URL(confirmResult.redirectTo).searchParams.get("status"), "confirmed");

const repeatedConfirmResponse = await confirmRoute.POST(jsonRequest("http://localhost/api/newsletter/confirm", { token: confirmToken }));
assert.equal(repeatedConfirmResponse.status, 200);

const manageToken = new URL(confirmResult.redirectTo).searchParams.get("manage");
assert.ok(manageToken);
assert.equal(manageToken.includes("parent.one@example.com"), false);

const topicUpdates = topicPatchCalls();
assert.deepEqual(topicUpdates.at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_in" },
]);

const preferenceResponse = await preferencesRoute.POST(
  jsonRequest("http://localhost/api/newsletter/preferences", { token: manageToken, audience: "parent" }),
);
assert.equal(preferenceResponse.status, 200);
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);

const unsubscribeScanResponse = await unsubscribeRoute.GET(
  new Request(unsubscribeUrl.replace("/updates/unsubscribe", "/api/newsletter/unsubscribe")),
);
assert.equal(new URL(unsubscribeScanResponse.headers.get("location")).pathname, "/updates/unsubscribe");
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);

const unsubscribeToken = new URL(unsubscribeUrl).searchParams.get("token");
const unsubscribeResponse = await unsubscribeRoute.POST(
  jsonRequest("http://localhost/api/newsletter/unsubscribe", { token: unsubscribeToken }),
);
assert.equal(unsubscribeResponse.status, 200);
const unsubscribeResult = await unsubscribeResponse.json();
assert.equal(new URL(unsubscribeResult.redirectTo).searchParams.get("status"), "unsubscribed");
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_out" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);
assert.ok(contactProperties.fchq_parent_updates_opted_out_at);
assert.ok(contactProperties.fchq_staff_updates_opted_out_at);

const staleConfirmResponse = await confirmRoute.POST(jsonRequest("http://localhost/api/newsletter/confirm", { token: confirmToken }));
assert.equal(staleConfirmResponse.status, 502);
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_out" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);

const laterConfirmToken = await encryptedToken({
  v: 1,
  scope: "confirm",
  email: "parent.one@example.com",
  name: "Parent One",
  audience: "both",
  iat: Date.now() + 1000,
  exp: Date.now() + 72 * 60 * 60 * 1000,
});
const laterConfirmResponse = await confirmRoute.POST(jsonRequest("http://localhost/api/newsletter/confirm", { token: laterConfirmToken }));
assert.equal(laterConfirmResponse.status, 200);
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_in" },
]);
assert.equal(contactProperties.fchq_parent_updates_opted_out_at, null);
assert.equal(contactProperties.fchq_staff_updates_opted_out_at, null);

const defaultOptOutFreshToken = await encryptedToken({
  v: 1,
  scope: "confirm",
  email: "parent.one@example.com",
  name: "Parent One",
  audience: "parent",
  iat: Date.now() + 2000,
  exp: Date.now() + 72 * 60 * 60 * 1000,
});
contactProperties = {};
topicSubscriptions = [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_out" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
];
const defaultOptOutConfirmResponse = await confirmRoute.POST(
  jsonRequest("http://localhost/api/newsletter/confirm", { token: defaultOptOutFreshToken }),
);
assert.equal(defaultOptOutConfirmResponse.status, 200);
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);

contactGloballyUnsubscribed = true;
const globalUnsubscribePreferenceResponse = await preferencesRoute.POST(
  jsonRequest("http://localhost/api/newsletter/preferences", { token: manageToken, audience: "staff" }),
);
assert.equal(globalUnsubscribePreferenceResponse.status, 502);
assert.deepEqual(topicPatchCalls().at(-1).body, [
  { id: "d4eecf4a-db85-436e-a5f2-a63fdbb71ab6", subscription: "opt_in" },
  { id: "0f50f68a-ff7b-44f6-8bcd-5764da82944d", subscription: "opt_out" },
]);

console.log("newsletter flow smoke test passed");
process.exit(0);

function jsonRequest(url, body) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function jsonResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function topicPatchCalls() {
  return calls.filter((call) => String(call.url).includes("/topics") && call.method === "PATCH");
}

function routeUserland(path) {
  return require(path).routeModule.userland;
}

async function encryptedToken(payload) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const keyMaterial = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(process.env.NEWSLETTER_SIGNING_SECRET));
  const key = await crypto.subtle.importKey("raw", keyMaterial, { name: "AES-GCM" }, false, ["encrypt"]);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(payload)));
  return `v1.${base64Url(iv)}.${base64Url(new Uint8Array(ciphertext))}`;
}

function base64Url(bytes) {
  return Buffer.from(bytes).toString("base64url");
}
