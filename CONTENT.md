# Content to fill in

The site currently ships with real, verifiable content only: three public repos
(EcoGuardian, GPlan, CodeCraft) with live links or source, the real stack, and a
real email. Everything else hides itself until you fill it in.

Edit **`src/lib/fallback-data.ts`**.

## 1. Profile

| Field | Current | Action |
| --- | --- | --- |
| `name` | Dasari Chaitanya | Confirm how you want to be credited |
| `email` | chaitanya7101@gmail.com | Confirm this is the address you want public |
| `location` | India | Tighten to a city if you want |
| `socialLinks.linkedin` | empty | Add your LinkedIn URL |
| `socialLinks.twitter` | empty | Add X/Twitter, or leave empty (link hides) |
| `headline` / `headlineEm` | "I build web products that / ship." | Rewrite in your own words if it doesn't fit |

## 2. Work

Three projects are written from your repos and live sites. Check each one:

- **EcoGuardian** — confirm the feature list matches what's actually built.
- **GPlan** — I only had the page title, so the description is deliberately
  general. Replace the `highlights` with what it actually does.
- **CodeCraft** — no live URL and no screenshot, so it renders as a type tile.
  Add `liveUrl` if it's deployed, or a screenshot path in `image`.

Screenshots live in `public/projects/`. If you replace them, keep the 1440×900
(16:10) ratio so the browser frame stays even.

## 3. Articles

Articles are real pages on this domain: `/articles` lists them and
`/articles/[slug]` renders each one. Add entries to `src/lib/articles.ts`:

```ts
export const articles: Article[] = [
  {
    slug: "shipping-ecoguardian",
    title: "What shipping EcoGuardian taught me",
    summary: "One or two sentences shown on the index and in search results.",
    date: "2026-02-10",
    readingTime: 6,
    tags: ["Next.js", "MongoDB"],
    content: [
      "Opening paragraph.",
      "## A section heading",
      "A paragraph under the heading.",
    ],
  },
];
```

The index, sitemap and metadata all read from this file. Content lines starting
with `## ` render as section headings; everything else is a paragraph.

Until the first article exists, `/articles` shows a short empty state and
unknown article URLs render the not-found page.

## 4. Experience / Education (currently a single B.Tech)

`fallbackEducation` ships with one centered `B.Tech — Computer Science &
Engineering` entry. Add your college and years so the tags under the degree
have content:

```ts
institution: "Your college",
startYear: "2023",
endYear: "2027",
current: true,
```

`fallbackExperiences` is empty, so the work-history rows stay hidden. Add real
roles when you have them:

```ts
export const fallbackExperiences = [
  {
    _id: "exp-1",
    company: "Company",
    position: "Role",
    description: "One or two sentences on what you built and the impact.",
    startDate: "Jun 2025",
    endDate: "",
    current: true,
    technologies: ["Next.js", "TypeScript"],
    order: 1,
  },
];
```

Education uses `institution`, `degree`, `field`, `startYear`, `endYear`,
`current`, optional `grade`/`description`, `order`.

## 5. Optional

- **Resume** — drop `resume.pdf` in `public/` and add a link in `About.tsx`.
- **Blog / testimonials** — removed from the page on purpose. Don't add them
  back without real posts or real quotes.
- **Custom domain** — set `NEXT_PUBLIC_SITE_URL` when deploying.
