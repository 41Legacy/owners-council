# The Owners Council

theownerscouncil.com, a 41 Legacy concept. Cloudflare Worker (TanStack Start, SSR) with a D1 database. Forms write to D1 and push contacts, notes and opportunities into GoHighLevel (41 Legacy sub-account, Owners Council pipeline).

## Cloudflare build settings
- Root directory: `app`
- Build command: `bun install && bun run build`
- Deploy command: `npx wrangler deploy`

## Secrets (Worker > Settings > Variables and Secrets)
- `GHL_PRIVATE_TOKEN`: GHL Private Integration token (contacts and opportunities, read and write)
- `ADMIN_KEY`: passphrase for /admin
- `LEAD_WEBHOOK_URL` (optional): extra webhook copy of each submission

Strategic and Architectural Partner, 41 Legacy.
