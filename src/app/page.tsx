import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import { primaryNav } from "@/lib/nav";
import { Project, Skill, Experience as ExperienceModel, Education, Profile } from "@/lib/models";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackEducation,
} from "@/lib/fallback-data";

export const instant = false;

async function getPortfolioData() {
  await connection();
  const fallback = {
    profile: fallbackProfile,
    projects: fallbackProjects,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
    education: fallbackEducation,
  };

  if (!isDbConfigured) return fallback;

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

    return {
      profile: profile
        ? { ...fallbackProfile, ...JSON.parse(JSON.stringify(profile)) }
        : fallbackProfile,
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
    return fallback;
  }
}

export default async function Home() {
  const data = await getPortfolioData();
  return (
    <>
      <Navbar links={primaryNav} email={data.profile.email} />
      <main id="main" className="relative z-[1]">
        <Hero profile={data.profile} projects={data.projects} />
        <Projects projects={data.projects} />
        <About
          profile={data.profile}
          projectCount={
            data.projects.filter((p: { featured?: boolean }) => p.featured)
              .length || 4
          }
        />
        <Stack skills={data.skills} />
        <Experience
          experiences={data.experiences}
          education={data.education}
        />
        <Contact profile={data.profile} />
      </main>
      <Footer
        name={data.profile.shortName ?? data.profile.name}
        email={data.profile.email}
        availability={data.profile.availability}
        links={primaryNav}
        socialLinks={data.profile.socialLinks}
      />
    </>
  );
}
