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
    _id: "harekrishnavizag",
    title: "Harekrisna Vizag",
    slug: "harekrishnavizag",
    description:
      "The main public platform for Harekrishna Vizag — profile, services, online donations, stories, and integrated live phone donor support.",
    image: "/projects/project1.jpg",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Payment Gateway"],
    liveUrl: "https://harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 1,
    year: "2024 — 25",
    role: "Full stack",
    status: "Live",
    highlights: [
      "Production web platform serving live users and community outreach",
      "Seamless online donation flow with real-time receipt generation",
      "Connects to the backend Donor Care Cell for synchronized donor management",
    ],
  },
  {
    _id: "makonissoft",
    title: "MakonisSoft",
    slug: "makonissoft",
    description:
      "The product business platform: open-source-friendly builds, modern web applications, client solutions, and core donor-care technical infrastructure.",
    image: "/projects/project2.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Cloud Infrastructure"],
    liveUrl: "https://makonissoft.com",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 2,
    year: "2024 — 25",
    role: "Full stack",
    status: "Live",
    highlights: [
      "High-performance edge delivery with responsive brand storytelling",
      "Product architecture backing the phone-side donor infrastructure",
      "Client inquiry funnel, service catalogs, and partner dashboards",
    ],
  },
  {
    _id: "donor-care-cell",
    title: "Donor Care Cell (DRM)",
    slug: "donor-care-cell",
    description:
      "Behind the scenes of both sites. Central admin login managing every donation made across Harekrisna Vizag and MakonisSoft, plus the call-from-laptop flow.",
    image: "/projects/project3.jpg",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "REST API", "CRM"],
    liveUrl: "https://drm.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 3,
    year: "2025",
    role: "Full stack",
    status: "Admin",
    highlights: [
      "Unified administration managing real-time donations and donor history",
      "Laptop-to-phone call automation without manual number dialing",
      "Secure role-based access control and financial reporting analytics",
    ],
  },
  {
    _id: "drm-caller",
    title: "DRM — Remote Contact Manager",
    slug: "drm-caller",
    description:
      "The phone-side telephony service of the donor-care cell. Install the DRM APK on a phone, then a call started from your laptop opens directly on that phone.",
    image: "/projects/project1.jpg",
    tags: ["Android", "Kotlin / Java", "Node.js", "WebSockets", "Telephony"],
    liveUrl: "https://drm.harekrishnavizag.org/drm.apk",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 4,
    year: "2025",
    role: "Full stack & Mobile",
    status: "Live",
    highlights: [
      "Zero manual dialing — laptop CRM clicks initiate calls on mobile phones",
      "Eliminates SIM swaps and human errors during donor communication",
      "Live call status and duration synchronization with central admin",
    ],
  },
  {
    _id: "careers",
    title: "Careers Portal",
    slug: "careers",
    description:
      "Career portal for positions across technical infrastructure, operations, and platform management with real-time applicant tracking.",
    image: "/projects/project2.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "https://careers.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: false,
    order: 5,
    year: "2025",
    role: "Full stack",
    status: "Live",
    highlights: [
      "Online job applications with automated resume intake",
      "Hiring workflow and applicant tracking pipeline",
    ],
  },
  {
    _id: "ecogaurdian",
    title: "EcoGuardian",
    slug: "ecogaurdian",
    description:
      "A civic environmental platform: report local pollution, watch live air quality, join clean-up drives and earn rewards for taking part.",
    image: "/projects/project3.jpg",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Air quality API"],
    liveUrl: "https://ecogaurdian.vercel.app",
    githubUrl: "https://github.com/Chaitanya-3119/Ecogaurdian",
    featured: true,
    order: 6,
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
    image: "/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    liveUrl: "https://gplan.vercel.app",
    githubUrl: "https://github.com/Chaitanya-3119/Gplan",
    featured: true,
    order: 7,
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
    image: "/projects/project2.jpg",
    tags: ["React", "TypeScript", "Vite", "AI"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119/codecraft",
    featured: false,
    order: 8,
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
    image: "/projects/project3.jpg",
    tags: ["PHP", "MySQL"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119/accounting-package",
    featured: false,
    order: 9,
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
    institution: "B.Tech",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    startYear: "2022",
    endYear: "2026",
    current: false,
    grade: "",
    description: "Bachelor of Technology in Computer Science & Engineering (2022 — 2026).",
    order: 1,
  },
];
