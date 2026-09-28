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

Demo calls to action use a direct `mailto:` link to `info@fullcourthq.com`.

## Scripts

```bash
npm run lint
npm run build
npm run start
```
