// Content used when MongoDB isn't configured (and default seed data).
// Everything here reflects verified production platforms and academic projects from Dasari Chaitanya's resume.

export const fallbackProfile = {
  name: "Dasari Chaitanya",
  shortName: "Chaitanya",
  title: "Full Stack Developer",
  headline: "I build web products that",
  headlineEm: "ship.",
  avatar: "",
  tagline:
    "Full stack developer with proven production track record — architecting systems raising ₹95L+ across 12,000+ donors, managing 20,000+ CRM records, and scaling Redis for 2 lakh+ peak-day visitors.",
  bio: "I'm a full stack developer based in Visakhapatnam, India experienced in building and shipping production web applications on the MERN stack and Next.js, with hands-on experience deploying and maintaining live backend services on DigitalOcean and Railway. My systems are live in production right now: Hare Krishna Movement's main platform and donation engine (powering ₹95L+ across 12,000+ donors with Redis caching for 2L+ peak visitors), the Donor Care Cell (DRM) managing 20,000+ records with an automated laptop-to-phone dialer app, an independent HKM Careers recruitment portal with automated SMTP pipelines, and Makonis AI Solutions' platform. I bridge responsive frontend interfaces with resilient backend REST APIs, caching, and database modeling across MongoDB and PostgreSQL.",
  location: "Visakhapatnam, Andhra Pradesh",
  phone: "+91 9951141915",
  email: "chaitanya9work@gmail.com",
  availability: "Open to work · Will relocate if required",
  socialLinks: {
    github: "https://github.com/Chaitanya-3119",
    linkedin: "https://www.linkedin.com/in/dasari-chaitanya-69a431281",
    twitter: "",
  },
};

export const fallbackProjects = [
  {
    _id: "harekrishnavizag",
    title: "Hare Krishna Movement Vizag",
    slug: "harekrishnavizag",
    description:
      "High-throughput production web platform and donation engine raising ₹95L+ from 12,000+ donors, backed by Redis for 2 lakh+ peak-day visitors, volunteer QR access control, and Razorpay integration.",
    longDescription:
      "Own and scale the organization's primary production web platform for Hare Krishna Movement Visakhapatnam. The platform powers public community outreach, festival events, user authentication, a devotional merchandise shop, and high-throughput online donations. Built with Next.js, React, and Node.js with Redis caching to smoothly absorb 200,000+ peak-day concurrent visitors during major events like Janmashtami without latency spikes. Architected an administrative QR code access control system for event volunteers, integrated Razorpay payment webhooks and API keys, and collaborated on backend APIs for the Vaikuntham mobile application.",
    image: "",
    tags: ["Next.js", "React.js", "Node.js", "Redis", "MongoDB", "Razorpay", "DigitalOcean", "REST APIs"],
    liveUrl: "https://harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 1,
    year: "2024 — 2026",
    role: "Full Stack Developer",
    status: "Live in Production",
    screenshots: [],
    highlights: [
      "Raised an estimated ₹95 Lakh+ from 12,000+ donors through seamless Razorpay donation flow",
      "Scaled infrastructure with Redis caching to reliably serve 2 Lakh+ peak-day visitors (Janmashtami)",
      "Engineered volunteer QR code access control with holder types, permission categories, and dynamic QR issuance",
      "Migrated Razorpay webhooks and collaborated on backend REST APIs for the Vaikuntham mobile app",
    ],
  },
  {
    _id: "makonissoft",
    title: "Makonis AI Solutions",
    slug: "makonissoft",
    description:
      "Corporate digital platform and product showcase for Makonis AI Solutions featuring responsive brand storytelling, reusable component architecture, and client inquiry funnels.",
    longDescription:
      "Developed and optimized responsive web pages, reusable component architectures, and client funnels for Makonis AI Solutions Pvt. Ltd., Hyderabad. Focused on edge performance, cross-device responsiveness, clean component contracts, and seamless backend API integrations. Collaborated closely with core engineering to redesign company digital surfaces, streamline assets, and optimize load speeds.",
    image: "",
    tags: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "REST APIs", "Tailwind CSS"],
    liveUrl: "https://makonissoft.com",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 2,
    year: "2025",
    role: "Full Stack Intern",
    status: "Live in Production",
    screenshots: [],
    highlights: [
      "Engineered reusable, modular React component architecture integrated with backend API endpoints",
      "Optimized asset delivery, video heroes, and styling for high-performance responsive experiences",
      "Collaborated with senior development team on company website redesign and Git release workflows",
    ],
  },
  {
    _id: "careers",
    title: "HKM Careers",
    slug: "careers",
    description:
      "Full-cycle recruitment platform with public application tracking, automated interview scheduling, SMTP notifications, candidate document intake via Cloudflare R2 links, and one-click LinkedIn job sharing.",
    longDescription:
      "Independently designed, engineered, and deployed the complete recruitment platform for Hare Krishna Movement Visakhapatnam. The platform features an applicant tracking system (ATS) with live application status lookup, automated interview scheduling, and instant multi-stage SMTP email notifications. Recruiter workflows include automated document verification links sent via SMTP, enabling applicants to upload required documents directly to secure Cloudflare R2 storage. Administrators can create new job openings with structured criteria and share them instantly across social platforms like LinkedIn with one click.",
    image: "",
    tags: ["Next.js", "React.js", "TypeScript", "Node.js", "PostgreSQL", "Cloudflare R2", "SMTP", "DigitalOcean"],
    liveUrl: "https://careers.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 3,
    year: "2025 — 2026",
    role: "Full Stack Developer",
    status: "Live in Production",
    screenshots: [],
    highlights: [
      "Application tracking system (ATS) allowing applicants to check live status and interview schedules",
      "Automated interview scheduling with multi-stage SMTP candidate and recruiter email notifications",
      "Automated document verification links sent via SMTP with secure candidate upload to Cloudflare R2",
      "Simplified job creation dashboard with one-click social sharing (LinkedIn & direct candidate links)",
      "Independently architected end-to-end on Next.js, Node.js, and PostgreSQL hosted on DigitalOcean",
    ],
  },
  {
    _id: "donor-care-cell",
    title: "Donor Relation Manager (DRM)",
    slug: "donor-care-cell",
    description:
      "Centralized donor administration and tele-calling CRM managing 20,000+ donor records with real-time API sync across 4 HKM centers and an automated laptop-to-phone dialer app.",
    longDescription:
      "Architected a full-featured PostgreSQL-backed Donor Relation Management (DRM) suite for internal donor care teams across 4 HKM centers. The system centralizes over 20,000 donor records, real-time donation auditing, call logs, recurring pledge tracking, and receipt issuance. To eliminate manual dialing friction, developed an automated companion laptop-to-phone Android APK dialer that seamlessly triggers calls directly from the tele-caller's desktop dashboard through the phone network via WebSockets.",
    image: "",
    tags: ["PostgreSQL", "Node.js", "React.js", "TypeScript", "Android APK", "WebSockets", "Railway"],
    liveUrl: "https://drm.harekrishnavizag.org",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: true,
    order: 4,
    year: "2025 — 2026",
    role: "Full Stack & Mobile",
    status: "Live & Internal Suite",
    screenshots: [],
    highlights: [
      "Architected PostgreSQL database and REST API managing 20,000+ donor profiles and transaction histories",
      "Real-time bi-directional API synchronization connecting 4 HKM centers and Tele-CRM operations",
      "Built laptop-to-phone automated dialer with companion Android APK eliminating manual number entry",
      "Role-based access control (RBAC), donor communication histories, and real-time performance analytics",
    ],
  },
  {
    _id: "gplan",
    title: "GPLAN — AI Floor Plan Generator",
    slug: "gplan",
    description:
      "Generative AI architecture combining a Retrieval-Augmented Generation (RAG) pipeline, Google Gemini API, and Fabric.js canvas to produce validated architectural floor plans in milliseconds.",
    longDescription:
      "An innovative AI-powered architectural platform engineered using React.js, Python Flask, MongoDB, Google Gemini API, and Fabric.js. Instead of slow and expensive image generation models, designed a RAG pipeline that matches user parameters (plot dimensions, room counts, orientations) against a MongoDB library of architectural layouts, prompting Gemini with the nearest exemplar to return structured, lightweight JSON. Built a mathematical validation layer to enforce real-world room dimensions and wall feasibility before rendering, accompanied by a rule-based algorithmic fallback engine that guarantees zero user downtime during AI rate limits.",
    image: "",
    tags: ["React.js", "Python", "Flask", "Google Gemini API", "RAG", "Fabric.js", "MongoDB"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: false,
    order: 5,
    year: "2025",
    role: "Creator & AI Architect",
    status: "Academic AI Project",
    screenshots: [],
    highlights: [
      "Engineered RAG pipeline pairing user constraints with MongoDB layout library for low-latency Gemini generation",
      "Mathematical validation layer verifying room dimensions, clearances, and layout feasibility prior to display",
      "Algorithmic rule-based fallback engine providing graceful degradation if AI APIs hit rate limits or timeouts",
      "Interactive dynamic canvas rendering powered by Fabric.js with exportable architectural schemas",
    ],
  },
  {
    _id: "ecoguardian",
    title: "EcoGuardian — Pollution Portal",
    slug: "ecoguardian",
    description:
      "Responsive, database-driven environmental dashboard featuring real-time pollution metrics, citizen grievance redressal, and gamification rewards.",
    longDescription:
      "Engineered a full-stack environmental monitoring and community reporting web application built with PHP, MySQL, JavaScript, HTML5, and CSS3. Provides real-time visual dashboards tracking air and water quality indicators, integrated with an end-to-end citizen complaint management system. Features gamification mechanisms (badges, community leaderboards, environmental action rewards) to drive civic engagement in environmental reporting.",
    image: "",
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    liveUrl: "",
    githubUrl: "https://github.com/Chaitanya-3119",
    featured: false,
    order: 6,
    year: "2024 — 2025",
    role: "Full Stack Developer",
    status: "Academic Project",
    screenshots: [],
    highlights: [
      "Real-time database-driven dashboard visualizing environmental pollution telemetry",
      "End-to-end complaint filing, tracking, and civic grievance resolution pipeline",
      "Gamification system with milestone rewards to incentivize community environmental participation",
    ],
  },
];

export const fallbackSkills = [
  // Frontend (4)
  { _id: "s1", name: "React.js", category: "Frontend", proficiency: 95, order: 1 },
  { _id: "s2", name: "Next.js", category: "Frontend", proficiency: 93, order: 2 },
  { _id: "s3", name: "TypeScript", category: "Frontend", proficiency: 90, order: 3 },
  { _id: "s4", name: "Tailwind CSS", category: "Frontend", proficiency: 92, order: 4 },

  // Backend (4)
  { _id: "s5", name: "Node.js", category: "Backend", proficiency: 92, order: 1 },
  { _id: "s6", name: "Express.js", category: "Backend", proficiency: 90, order: 2 },
  { _id: "s7", name: "REST APIs", category: "Backend", proficiency: 94, order: 3 },
  { _id: "s8", name: "Redis", category: "Backend", proficiency: 86, order: 4 },

  // Database (4)
  { _id: "s9", name: "PostgreSQL", category: "Database", proficiency: 90, order: 1 },
  { _id: "s10", name: "MongoDB", category: "Database", proficiency: 92, order: 2 },
  { _id: "s11", name: "MySQL", category: "Database", proficiency: 86, order: 3 },
  { _id: "s12", name: "SQL & Modeling", category: "Database", proficiency: 88, order: 4 },

  // DevOps & Cloud (4)
  { _id: "s13", name: "DigitalOcean", category: "DevOps & Cloud", proficiency: 88, order: 1 },
  { _id: "s14", name: "Railway", category: "DevOps & Cloud", proficiency: 88, order: 2 },
  { _id: "s15", name: "Cloudflare & R2", category: "DevOps & Cloud", proficiency: 86, order: 3 },
  { _id: "s16", name: "Git & GitHub", category: "DevOps & Cloud", proficiency: 92, order: 4 },
];

export const fallbackBlogs: unknown[] = [];
export const fallbackTestimonials: unknown[] = [];

export const fallbackExperiences = [
  {
    _id: "exp-hkm",
    company: "Hare Krishna Movement, Visakhapatnam",
    position: "Full Stack Developer",
    description:
      "Own and scale primary production platforms: main website raising ₹95L+ from 12,000+ donors with Redis handling for 2L+ peak-day visitors; independent HKM Careers recruitment portal with resume intake and SMTP automated hiring workflows; PostgreSQL-backed DRM tele-calling CRM managing 20,000+ records with companion Android dialer app; and DigitalOcean/Railway deployment.",
    startDate: "Jul 2026",
    endDate: "Oct 2026",
    current: true,
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Razorpay",
      "DigitalOcean",
      "Railway",
      "SMTP",
      "REST APIs",
    ],
    order: 1,
  },
  {
    _id: "exp-makonis",
    company: "Makonis AI Solutions Pvt. Ltd., Hyderabad",
    position: "Full Stack Development Intern",
    description:
      "Developed and optimized responsive web pages using React.js, JavaScript, HTML5, and CSS3. Built reusable UI components, integrated frontends with backend REST APIs, and collaborated on website redesign and performance optimization using Git.",
    startDate: "May 2025",
    endDate: "Jul 2025",
    current: false,
    technologies: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Node.js",
      "REST APIs",
      "Git",
    ],
    order: 2,
  },
];

export const fallbackEducation = [
  {
    _id: "btech-gvp",
    institution: "Gayatri Vidya Parishad College for Degree & P.G. Courses (A)",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    startYear: "2022",
    endYear: "2026",
    current: false,
    grade: "Undergraduate",
    description: "",
    order: 1,
  },
];
