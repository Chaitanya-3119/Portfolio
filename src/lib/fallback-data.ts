// Fallback data used when MongoDB is not connected or no data exists
// This ensures the portfolio looks great even without a database

export const fallbackProfile = {
  name: "Chaitanya",
  title: "Full Stack Developer",
  tagline: "Building exceptional digital experiences with modern technologies",
  bio: "I'm a passionate software developer who loves crafting elegant solutions to complex problems. With expertise spanning frontend and backend technologies, I build performant, scalable applications that deliver outstanding user experiences. I'm constantly learning and pushing the boundaries of what's possible with code.",
  avatar: "/avatar.png",
  email: "hello@chaitanya.dev",
  location: "India",
  socialLinks: {
    github: "https://github.com/chaitanya",
    linkedin: "https://linkedin.com/in/chaitanya",
    twitter: "https://twitter.com/chaitanya",
  },
  stats: {
    yearsExperience: 3,
    projectsCompleted: 25,
    happyClients: 15,
    githubStars: 500,
  },
};

export const fallbackProjects = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and an intuitive admin dashboard.",
    image: "/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/ecommerce",
    featured: true,
    order: 1,
  },
  {
    _id: "2",
    title: "AI Chat Application",
    slug: "ai-chat-app",
    description:
      "Real-time chat application powered by AI with smart responses, language translation, and sentiment analysis capabilities.",
    image: "/projects/project2.jpg",
    tags: ["React", "Node.js", "Socket.io", "OpenAI", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/ai-chat",
    featured: true,
    order: 2,
  },
  {
    _id: "3",
    title: "DevOps Dashboard",
    slug: "devops-dashboard",
    description:
      "Comprehensive monitoring dashboard for microservices with real-time metrics, alerting, and deployment management.",
    image: "/projects/project3.jpg",
    tags: ["Vue.js", "Python", "Docker", "Kubernetes", "Grafana"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/devops-dash",
    featured: true,
    order: 3,
  },
  {
    _id: "4",
    title: "Social Media Analytics",
    slug: "social-analytics",
    description:
      "Analytics platform that provides deep insights into social media performance with beautiful data visualizations.",
    image: "/projects/project1.jpg",
    tags: ["React", "D3.js", "FastAPI", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/social-analytics",
    featured: false,
    order: 4,
  },
  {
    _id: "5",
    title: "Task Management System",
    slug: "task-management",
    description:
      "Collaborative project management tool with Kanban boards, time tracking, and team collaboration features.",
    image: "/projects/project2.jpg",
    tags: ["Next.js", "Prisma", "PostgreSQL", "WebSocket"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/task-mgmt",
    featured: false,
    order: 5,
  },
  {
    _id: "6",
    title: "Crypto Portfolio Tracker",
    slug: "crypto-tracker",
    description:
      "Real-time cryptocurrency portfolio tracker with price alerts, portfolio analytics, and market insights.",
    image: "/projects/project3.jpg",
    tags: ["React Native", "Node.js", "CoinGecko API", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/chaitanya/crypto-tracker",
    featured: false,
    order: 6,
  },
];

export const fallbackSkills = [
  { _id: "1", name: "React / Next.js", category: "Frontend", proficiency: 95, icon: "⚛️", order: 1 },
  { _id: "2", name: "TypeScript", category: "Frontend", proficiency: 90, icon: "🔷", order: 2 },
  { _id: "3", name: "JavaScript", category: "Frontend", proficiency: 95, icon: "💛", order: 3 },
  { _id: "4", name: "HTML / CSS", category: "Frontend", proficiency: 95, icon: "🎨", order: 4 },
  { _id: "5", name: "Tailwind CSS", category: "Frontend", proficiency: 90, icon: "🌊", order: 5 },
  { _id: "6", name: "Node.js", category: "Backend", proficiency: 90, icon: "💚", order: 6 },
  { _id: "7", name: "Python", category: "Backend", proficiency: 85, icon: "🐍", order: 7 },
  { _id: "8", name: "MongoDB", category: "Backend", proficiency: 88, icon: "🍃", order: 8 },
  { _id: "9", name: "PostgreSQL", category: "Backend", proficiency: 82, icon: "🐘", order: 9 },
  { _id: "10", name: "Docker", category: "DevOps", proficiency: 80, icon: "🐳", order: 10 },
  { _id: "11", name: "AWS / Cloud", category: "DevOps", proficiency: 78, icon: "☁️", order: 11 },
  { _id: "12", name: "Git / GitHub", category: "DevOps", proficiency: 92, icon: "🔀", order: 12 },
];

export const fallbackExperiences = [
  {
    _id: "1",
    company: "Tech Corp",
    position: "Senior Full Stack Developer",
    description:
      "Led development of customer-facing applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers. Improved application performance by 40%.",
    startDate: "Jan 2023",
    endDate: "",
    current: true,
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    order: 1,
  },
  {
    _id: "2",
    company: "StartupXYZ",
    position: "Full Stack Developer",
    description:
      "Built and shipped the core product from scratch. Implemented real-time features, payment processing, and automated CI/CD pipelines. Grew the product to 50k active users.",
    startDate: "Jun 2021",
    endDate: "Dec 2022",
    current: false,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    order: 2,
  },
  {
    _id: "3",
    company: "Digital Agency",
    position: "Frontend Developer",
    description:
      "Developed responsive web applications for enterprise clients. Created reusable component libraries and design systems that accelerated development by 30%.",
    startDate: "Jan 2020",
    endDate: "May 2021",
    current: false,
    technologies: ["React", "JavaScript", "SCSS", "Redux"],
    order: 3,
  },
];

export const fallbackEducation = [
  {
    _id: "1",
    institution: "University of Technology",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    startYear: "2016",
    endYear: "2020",
    current: false,
    grade: "8.5 CGPA",
    description: "Specialized in Software Engineering and Machine Learning. Active member of coding clubs and hackathon winner.",
    order: 1,
  },
];

export const fallbackTestimonials = [
  {
    _id: "1",
    name: "Alex Johnson",
    position: "CTO",
    company: "TechStartup Inc.",
    content:
      "One of the most talented developers I've worked with. Chaitanya consistently delivers high-quality code and brings creative solutions to complex problems. A true asset to any team.",
    rating: 5,
    order: 1,
  },
  {
    _id: "2",
    name: "Sarah Chen",
    position: "Product Manager",
    company: "Digital Solutions",
    content:
      "Working with Chaitanya was an absolute pleasure. His attention to detail and ability to translate design requirements into pixel-perfect implementations is remarkable.",
    rating: 5,
    order: 2,
  },
  {
    _id: "3",
    name: "Michael Park",
    position: "Lead Developer",
    company: "CloudTech",
    content:
      "Chaitanya has an exceptional understanding of both frontend and backend technologies. His code is clean, well-documented, and highly maintainable. Highly recommended!",
    rating: 5,
    order: 3,
  },
];

export const fallbackBlogs = [
  {
    _id: "1",
    title: "Building Scalable Applications with Next.js 14",
    slug: "scalable-nextjs-14",
    excerpt: "Learn how to build enterprise-grade applications using the latest features of Next.js 14, including Server Actions, Partial Prerendering, and more.",
    coverImage: "/blog/blog1.png",
    tags: ["Next.js", "React", "Performance"],
    published: true,
    readTime: 8,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    _id: "2",
    title: "The Art of Writing Clean TypeScript",
    slug: "clean-typescript",
    excerpt: "Explore best practices for writing maintainable TypeScript code with proper typing, generics, and design patterns that scale.",
    coverImage: "/blog/blog2.png",
    tags: ["TypeScript", "Best Practices", "Clean Code"],
    published: true,
    readTime: 6,
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    _id: "3",
    title: "Docker for Full Stack Developers",
    slug: "docker-fullstack",
    excerpt: "A comprehensive guide to containerizing your full-stack applications with Docker, from development to production deployment.",
    coverImage: "/blog/blog3.png",
    tags: ["Docker", "DevOps", "Deployment"],
    published: true,
    readTime: 10,
    createdAt: "2024-01-10T10:00:00Z",
  },
];
