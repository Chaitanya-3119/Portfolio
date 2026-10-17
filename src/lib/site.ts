export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Chaitanya";

export const siteDescription =
  "Chaitanya is a full stack developer building web products end to end — real-time interfaces, APIs and databases that hold up in production.";
