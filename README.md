# FullCourtHQ Sales Site

Marketing site for FullCourtHQ, the court operations platform for scheduling, rentals, payments, memberships, waivers, and reporting.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`.

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://fullcourthq.com
HUBSPOT_PRIVATE_APP_TOKEN=
HUBSPOT_DEAL_PIPELINE=default
HUBSPOT_DEAL_STAGE=appointmentscheduled
```

`HUBSPOT_PRIVATE_APP_TOKEN` is used only by the server-side demo request route at `/api/demo-request`. A HubSpot Service Key can be used here as long as it can make CRM API requests with the scopes below.

The demo request route creates or updates a Contact, creates or updates a Company, creates a Deal, and stores the submitted message in the company/deal description. If the key also has Notes access, the route adds a HubSpot Note with the submitted context. `HUBSPOT_DEAL_PIPELINE` and `HUBSPOT_DEAL_STAGE` default to HubSpot's default Sales Pipeline and Appointment Scheduled stage.

## HubSpot Setup

Create a HubSpot Service Key or private app token with these CRM scopes:

- Contacts: read/write
- Companies: read/write
- Deals: read/write
- Notes: read/write, optional

If Notes is not available in your HubSpot permissions screen, leave it out. Demo requests will still create the Contact, Company, and Deal. Add the key/token to `HUBSPOT_PRIVATE_APP_TOKEN` in `.env.local` for local development and in the production deployment environment.

## Scripts

```bash
npm run lint
npm run build
npm run start
```
