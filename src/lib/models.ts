import mongoose, { Schema, Document, Model } from "mongoose";

// ===== PROJECT MODEL =====
export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  year?: string;
  role?: string;
  status?: string;
  highlights?: string[];
  screenshots?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    image: { type: String, default: "" },
    tags: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    year: { type: String },
    role: { type: String },
    status: { type: String },
    highlights: [{ type: String }],
    screenshots: [{ type: String }],
  },
  { timestamps: true }
);

// ===== SKILL MODEL =====
export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, default: 90, min: 0, max: 100 },
  icon: { type: String, default: "⚡" },
  order: { type: Number, default: 0 },
});

// ===== EXPERIENCE MODEL =====
export interface IExperience extends Document {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
  companyLogo?: string;
  order: number;
}

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  current: { type: Boolean, default: false },
  technologies: [{ type: String }],
  companyLogo: { type: String },
  order: { type: Number, default: 0 },
});

// ===== EDUCATION MODEL =====
export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  grade?: string;
  description?: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, default: "" },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startYear: { type: String, default: "" },
  endYear: { type: String },
  current: { type: Boolean, default: false },
  grade: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
});

// ===== BLOG MODEL =====
export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true }
);

// ===== TESTIMONIAL MODEL =====
export interface ITestimonial extends Document {
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  order: { type: Number, default: 0 },
});

// ===== PROFILE MODEL =====
export interface IProfile extends Document {
  name: string;
  shortName?: string;
  headline?: string;
  headlineEm?: string;
  availability?: string;
  title: string;
  tagline: string;
  bio: string;
  avatar: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
    githubStars: number;
  };
}

const ProfileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  shortName: { type: String, default: "" },
  headline: { type: String, default: "" },
  headlineEm: { type: String, default: "" },
  availability: { type: String, default: "Open to work · Will relocate if required" },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, default: "" },
  resumeUrl: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    website: { type: String },
  },
  stats: {
    yearsExperience: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    happyClients: { type: Number, default: 0 },
    githubStars: { type: Number, default: 0 },
  },
});

// ===== CONTACT MESSAGE MODEL =====
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ===== ADMIN USER MODEL =====
export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// ===== MODEL EXPORTS =====
export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export const Profile: Model<IProfile> =
  mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);

export const Contact: Model<IContact> =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);

export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
