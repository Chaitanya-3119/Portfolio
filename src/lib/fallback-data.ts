// Content used when MongoDB isn't configured (the default for this site).
// Everything here is editable in one place; see CONTENT.md for the checklist.
//
// Rule of thumb: no dead links, no invented employers, no fake testimonials.
// Anything that isn't filled in stays empty and its section hides itself.

export const fallbackProfile = {
  name: "Dasari Chaitanya",
  shortName: "Chaitanya",
  title: "Full Stack Developer",
  headline: "I build web products that",
  headlineEm: "ship.",
  tagline:
    "Full stack developer working across the interface, the API and the database. I've launched live products with real users — live air-quality reporting, an AI floor-plan generator, and an AI event recreator.",
  bio: "I'm a full stack developer based in India. I like the whole path of a product: shaping the interface, wiring the API, modelling the data, then getting it deployed and actually working in someone's browser. Most of what I build is TypeScript and React on the front, Node and Mongo or Postgres behind it.",
  location: "India",
  email: "chaitanya7101@gmail.com",
  availability: "Open to work",
  socialLinks: {
    github: "https://github.com/Chaitanya-3119",
    linkedin: "",
    twitter: "",
  },
};

export const fallbackProjects = [
  {
    _id: "ecogaurdian",
    title: "EcoGuardian",
    slug: "ecogaurdian",
    description:
      "A civic environmental platform: report local pollution, watch live air quality, join clean-up drives and earn rewards for taking part.",
    image: "/projects/ecogaurdian.png",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Air quality API"],
    liveUrl: "https://ecogaurdian.vercel.app",
    githubUrl: "https://github.com/Chaitanya-3119/Ecogaurdian",
    featured: true,
    order: 1,
    year: "2025 — 26",
    role: "Full stack",
    status: "Live",
    highlights: [
      "Live AQI and PM2.5 readings across Indian cities on a map",
      "Pin-and-report issues with photo uploads and a moderation path",
      "Community drives, a contributor leaderboard and redeemable eco points",
    ],
  },
  {
    _id: "gplan",
    title: "GPlan",
    slug: "gplan",
    description:
      "An AI floor-plan generator. Describe the space you need and it returns a plan you can work from, instead of a blank grid.",
    image: "/projects/gplan.png",
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    liveUrl: "https://gplan.vercel.app",
    githubUrl: "https://github.com/Chaitanya-3119/Gplan",
    featured: true,
    order: 2,
    year: "2025",
    role: "Full stack",
    status: "Live",
    highlights: [
      "Prompt to generated floor plan in one flow",
      "Server-side generation with a typed API boundary",
      "Responsive plan canvas that works on a phone",
    ],
  },
  {
    _id: "codecraft",
    title: "CodeCraft — AI Event Recreator",
    slug: "codecraft",
    description:
      "Upload the photos from an event, describe what happened, and get a shareable AI recreation of it you can download.",
    image: "",
    tags: ["React", "TypeScript", "Vite", "AI"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119/codecraft",
    featured: true,
    order: 3,
    year: "2025",
    role: "Frontend",
    status: "Source available",
    highlights: [
      "Photo upload plus a guided description step",
      "Generation, download and share in a single session",
      "Responsive layout down to small screens",
    ],
  },
  {
    _id: "accounting-package",
    title: "Accounting Package",
    slug: "accounting-package",
    description:
      "A small accounting package for a business: ledgers, entries and the reports that go with them.",
    image: "",
    tags: ["PHP", "MySQL"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119/accounting-package",
    featured: false,
    order: 4,
    year: "2025",
    role: "Full stack",
    status: "Source available",
    highlights: [],
  },
];

export const fallbackSkills = [
  { _id: "s1", name: "React", category: "Frontend", order: 1 },
  { _id: "s2", name: "Next.js", category: "Frontend", order: 2 },
  { _id: "s3", name: "TypeScript", category: "Frontend", order: 3 },
  { _id: "s4", name: "JavaScript", category: "Frontend", order: 4 },
  { _id: "s5", name: "Tailwind CSS", category: "Frontend", order: 5 },
  { _id: "s6", name: "HTML / CSS", category: "Frontend", order: 6 },
  { _id: "s7", name: "Node.js", category: "Backend", order: 1 },
  { _id: "s8", name: "Express", category: "Backend", order: 2 },
  { _id: "s9", name: "REST APIs", category: "Backend", order: 3 },
  { _id: "s10", name: "PHP", category: "Backend", order: 4 },
  { _id: "s11", name: "MongoDB", category: "Database", order: 1 },
  { _id: "s12", name: "PostgreSQL", category: "Database", order: 2 },
  { _id: "s13", name: "MySQL", category: "Database", order: 3 },
  { _id: "s14", name: "Git & GitHub", category: "Tools", order: 1 },
  { _id: "s15", name: "Vercel", category: "Tools", order: 2 },
  { _id: "s16", name: "Postman", category: "Tools", order: 3 },
];

// Blog posts and testimonials aren't shown on the site, but the admin panel still
// manages those collections. Keep the arrays so its API keeps working.
export const fallbackBlogs: unknown[] = [];
export const fallbackTestimonials: unknown[] = [];

// Add real roles here — the Experience section stays hidden while this is empty.
export const fallbackExperiences: {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
  order: number;
}[] = [];

export const fallbackEducation: {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  grade?: string;
  description?: string;
  order: number;
}[] = [
  {
    _id: "btech",
    // Add your college and years here — they render as tags under the degree.
    institution: "",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    startYear: "",
    endYear: "",
    current: true,
    grade: "",
    description: "",
    order: 1,
  },
];
