# Portfolio

Personal portfolio for Chaitanya — a single page with selected work, about,
stack and contact. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy, projects and stack live in **`src/lib/fallback-data.ts`** — one file,
no database required. Sections with no data (Experience, Education) hide
themselves, so nothing renders half-finished.

See [`CONTENT.md`](./CONTENT.md) for what still needs real details.

## Optional: database + admin

The site works fully without a database. If you want to edit content from the
admin panel at `/admin`, copy the env template and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata, OG image, sitemap |
| `MONGODB_URI` | MongoDB connection string |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login and the seed script |
| `NEXTAUTH_SECRET` | Secret used to sign the admin session cookie |

With MongoDB configured, run `POST /api/admin/seed` once to create the admin
user. Content read from Mongo overrides the local fallback; empty collections
fall back automatically.

## Structure

```
src/app/            layout, page, metadata routes (OG image, sitemap, robots)
src/app/api/        portfolio data, auth, contact, admin CRUD
src/app/admin/      login and dashboard
src/components/     page sections; no animation library in the page shell
src/lib/            content fallback, Mongoose models, auth, db helper
```

## Deploy

Any Node host works. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used
automatically; set `NEXT_PUBLIC_SITE_URL` if you serve it from a custom domain.
