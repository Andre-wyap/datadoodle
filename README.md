# DataDoodles Website

The DataDoodles landing page is an Astro 7 server-rendered site. It does not use Next.js or React.

## Run locally

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and provide:

- `N8N_LEAD_WEBHOOK_URL` — receives validated lead payloads from `/api/lead`
- `N8N_WEBHOOK_SECRET` — optional bearer token sent to n8n
- `PUBLIC_SITE_URL` — canonical production origin
- `PUBLIC_WHATSAPP_NUMBER` — international digits only, for example `60123456789`

## Production

```bash
npm run build
node dist/server/entry.mjs
```

The build uses the Astro Node adapter in standalone mode. Set `HOST` and `PORT` in the deployment environment as required by the host.

## Before launch

The page deliberately marks unsupplied proof as pending instead of fabricating it. Replace the evidence exhibits with real, dated AI-search screenshots and replace the three case-study placeholders with verified client results. Configure and test the n8n workflow through to Supabase and WhatsApp before accepting live traffic.
