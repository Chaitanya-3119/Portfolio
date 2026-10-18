import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import {
  Project,
  Skill,
  Experience as ExperienceModel,
  Education,
  Profile,
} from "@/lib/models";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackEducation,
} from "@/lib/fallback-data";

export type PortfolioProject = {
  _id: string;
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
};

export type PortfolioData = {
  profile: typeof fallbackProfile;
  projects: PortfolioProject[];
  skills: (typeof fallbackSkills)[number][];
  experiences: typeof fallbackExperiences;
  education: typeof fallbackEducation;
};

function fallbackData(): PortfolioData {
  return {
    profile: fallbackProfile,
    projects: fallbackProjects,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
    education: fallbackEducation,
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!isDbConfigured) return fallbackData();

  try {
    await dbConnect();

    const [projects, skills, experiences, education, profile] =
      await Promise.all([
        Project.find().sort({ order: 1 }).lean(),
        Skill.find().sort({ order: 1 }).lean(),
        ExperienceModel.find().sort({ order: 1 }).lean(),
        Education.find().sort({ order: 1 }).lean(),
        Profile.findOne().lean(),
      ]);

    const typedProfile = profile
      ? { ...fallbackProfile, ...JSON.parse(JSON.stringify(profile)) }
      : fallbackProfile;

    return {
      profile: typedProfile,
      projects:
        projects && projects.length > 0
          ? JSON.parse(JSON.stringify(projects))
          : fallbackProjects,
      skills:
        skills && skills.length > 0
          ? JSON.parse(JSON.stringify(skills))
          : fallbackSkills,
      experiences:
        experiences && experiences.length > 0
          ? JSON.parse(JSON.stringify(experiences))
          : fallbackExperiences,
      education:
        education && education.length > 0
          ? JSON.parse(JSON.stringify(education))
          : fallbackEducation,
    };
  } catch (error) {
    console.error("Falling back to local content:", error);
    return fallbackData();
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  const data = await getPortfolioData();
  return data.projects.find((p) => p.slug === slug) ?? null;
}
