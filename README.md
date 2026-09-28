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

## Scripts

```bash
npm run lint
npm run build
npm run start
```
