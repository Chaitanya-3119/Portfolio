import { NextResponse } from "next/server";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import {
  Project,
  Skill,
  Experience,
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

const fallbackResponse = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  experiences: fallbackExperiences,
  education: fallbackEducation,
  profile: fallbackProfile,
  source: "fallback" as const,
};

// GET all portfolio data
export async function GET() {
  if (!isDbConfigured) {
    return NextResponse.json(fallbackResponse);
  }

  try {
    await dbConnect();

    const [projects, skills, experiences, education, profile] =
      await Promise.all([
        Project.find().sort({ order: 1 }).lean(),
        Skill.find().sort({ order: 1 }).lean(),
        Experience.find().sort({ order: 1 }).lean(),
        Education.find().sort({ order: 1 }).lean(),
        Profile.findOne().lean(),
      ]);

    return NextResponse.json({
      projects: projects.length > 0 ? projects : fallbackProjects,
      skills: skills.length > 0 ? skills : fallbackSkills,
      experiences: experiences.length > 0 ? experiences : fallbackExperiences,
      education: education.length > 0 ? education : fallbackEducation,
      profile: profile ?? fallbackProfile,
      source: "database" as const,
    });
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return NextResponse.json(fallbackResponse);
  }
}
