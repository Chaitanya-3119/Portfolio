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
  avatar: "",
  tagline:
    "Full stack developer who has shipped live products with real users — public platforms, donation systems, a donor tele-calling suite, and a hiring pipeline.",
  bio: "I'm a full stack developer based in India who ships end to end — interface, API, data model, and deployment. My work is live in production right now: Harekrishna Vizag's public platform and donation flow, the Donor Care Cell tele-calling suite used by an internal team every day, and a careers portal processing real applicant pipelines. I work mostly in TypeScript — React and Next.js on the front, Node and PostgreSQL/MongoDB behind it — and I care about the parts users never see: performance, data integrity, and clean handoffs between layers.",
  location: "India",
  email: "chaitanya7101@gmail.com",
  availability: "Open to work",
  socialLinks: {
    github: "https://github.com/Chaitanya-3119",
    linkedin: "https://www.linkedin.com/in/dasari-chaitanya-69a431281",
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
    image: "",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Payment Gateway"],
    liveUrl: "https://harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 1,
    year: "2024 — 25",
    role: "Full stack",
    status: "Live",
    screenshots: [],
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
    image: "",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Cloud Infrastructure"],
    liveUrl: "https://makonissoft.com",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 2,
    year: "2024 — 25",
    role: "Full stack",
    status: "Live",
    screenshots: [],
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
      "Centralized donor administration and tele-calling platform managing real-time donations across Harekrishna Vizag & MakonisSoft, combined with an automated laptop-to-phone dialer app.",
    image: "",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Android APK", "WebSockets"],
    liveUrl: "https://drm.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 4,
    year: "2025",
    role: "Full stack & Mobile",
    status: "Live & Admin",
    screenshots: [],
    highlights: [
      "Unified administration managing donations, recurring givers, and receipts",
      "Laptop-to-phone call automation via companion DRM APK without manual dialing",
      "Secure role-based access control, call audit logs, and donor analytics",
    ],
  },
  {
    _id: "careers",
    title: "HKM Careers",
    slug: "careers",
    description:
      "Dedicated recruitment and candidate pipeline platform for Harekrishna Vizag with automated resume intake, applicant tracking, and recruiter notifications.",
    image: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    liveUrl: "https://careers.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 3,
    year: "2025",
    role: "Full stack",
    status: "Live",
    screenshots: [],
    highlights: [
      "Online job applications with automated candidate resume intake",
      "Hiring workflow and applicant tracking pipeline across departments",
      "Fast applicant processing with automated notifications",
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
    featured: false,
    order: 5,
    year: "2025",
    role: "Frontend",
    status: "Source available",
    screenshots: [],
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
    order: 6,
    year: "2025",
    role: "Full stack",
    status: "Source available",
    screenshots: [],
    highlights: [],
  },
];

export const fallbackSkills = [
  { _id: "s1", name: "React", category: "Frontend", proficiency: 95, order: 1 },
  { _id: "s2", name: "Next.js", category: "Frontend", proficiency: 92, order: 2 },
  { _id: "s3", name: "TypeScript", category: "Frontend", proficiency: 90, order: 3 },
  { _id: "s4", name: "JavaScript", category: "Frontend", proficiency: 93, order: 4 },
  { _id: "s5", name: "Tailwind CSS", category: "Frontend", proficiency: 90, order: 5 },
  { _id: "s6", name: "HTML / CSS", category: "Frontend", proficiency: 95, order: 6 },
  { _id: "s7", name: "Node.js", category: "Backend", proficiency: 90, order: 1 },
  { _id: "s8", name: "Express", category: "Backend", proficiency: 88, order: 2 },
  { _id: "s9", name: "REST APIs", category: "Backend", proficiency: 92, order: 3 },
  { _id: "s10", name: "PHP", category: "Backend", proficiency: 75, order: 4 },
  { _id: "s11", name: "MongoDB", category: "Database", proficiency: 90, order: 1 },
  { _id: "s12", name: "PostgreSQL", category: "Database", proficiency: 85, order: 2 },
  { _id: "s13", name: "MySQL", category: "Database", proficiency: 80, order: 3 },
  { _id: "s14", name: "Git & GitHub", category: "Tools", proficiency: 92, order: 1 },
  { _id: "s15", name: "Vercel", category: "Tools", proficiency: 88, order: 2 },
  { _id: "s16", name: "Postman", category: "Tools", proficiency: 90, order: 3 },
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
    description: "",
    order: 1,
  },
];
