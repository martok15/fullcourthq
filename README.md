# FullCourtHQ Marketing Site

Marketing site for FullCourtHQ, the connected operating system for sports facilities and clubs. The site covers facility scheduling, programs, teams, billing, communications, tournaments, and the parent and coach experience.

## Local Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Site URL

Canonical URLs, link previews, structured data, the sitemap, and shareable links always use `https://fullcourthq.com`, set in `src/lib/site.ts`. It is not read from the environment, so local and preview builds cannot publish `localhost` or preview URLs.

## Walkthrough requests

The walkthrough form posts to `/api/demo-request`, which emails the request through [Resend](https://resend.com). The email's reply-to is the person who submitted it, so you can answer straight from your inbox.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key with sending access |
| `DEMO_REQUEST_TO` | No | Where requests go. Defaults to `info@fullcourthq.com` |
| `DEMO_REQUEST_FROM` | No | Sender. Defaults to `FullCourtHQ Website <website@fullcourthq.com>` and must be on a domain verified in Resend |

Production: add `fullcourthq.com` as a domain in Resend and let it create the DNS records in Cloudflare, then store the key as a Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

Local: put the same variables in `.env.local`. If the key is missing or Resend rejects the request, the form tells the visitor to email `info@fullcourthq.com` instead.

## Newsletter updates

The `/updates` page asks visitors to choose parent updates, coach/staff updates, or both. The signup endpoint sends a confirmation email only; the contact is created and subscribed to Resend Broadcast Topics only after the encrypted confirmation link is opened and the visitor presses the confirm button. Unsubscribe links also require a button press, so automated link scanners cannot change preferences just by opening a URL.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key with email and contact/topic access |
| `RESEND_PARENT_TOPIC_ID` | Yes | Resend Broadcast Topic ID for parent updates |
| `RESEND_STAFF_TOPIC_ID` | Yes | Resend Broadcast Topic ID for coach/staff updates |
| `NEWSLETTER_FROM` | No | Sender for confirmation emails. Defaults to `FullCourtHQ Updates <updates@mail.fullcourthq.com>` and must be verified in Resend |
| `NEWSLETTER_CONFIRM_BASE_URL` | No | Public base URL for confirmation links. Defaults to `https://fullcourthq.com`, or localhost in local dev |
| `NEWSLETTER_SIGNING_SECRET` | Yes | Secret for encrypting confirmation, manage-preference, and unsubscribe links |

Create both Resend Topics with default subscription `Opt-out`, which means recipients do not receive Topic mail unless explicitly subscribed. Use those Topic IDs in `RESEND_PARENT_TOPIC_ID` and `RESEND_STAFF_TOPIC_ID`. Before activation, verify that the configured topic IDs resolve in Resend and that both topics still report `default_subscription: "opt_out"`.

Create these Resend custom Contact Properties before activation so old confirmation links cannot override later explicit opt-outs:

| Property key | Type | Purpose |
| --- | --- | --- |
| `fchq_parent_updates_opted_out_at` | string | Timestamp for explicit parent-topic opt-outs |
| `fchq_staff_updates_opted_out_at` | string | Timestamp for explicit coach/staff-topic opt-outs |

Production activation also needs the newsletter rate limit bindings in `wrangler.jsonc` published with the Worker. Store secrets with:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put NEWSLETTER_SIGNING_SECRET
```

## Scripts

```bash
npm run lint
npm run build
npm run start
```
