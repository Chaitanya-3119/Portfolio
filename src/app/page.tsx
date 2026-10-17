import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ExperienceSection from "@/components/Experience";
import EducationSection from "@/components/Education";
import BlogSection from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import {
  Project,
  Skill,
  Experience,
  Education,
  Blog,
  Testimonial,
  Profile,
} from "@/lib/models";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackEducation,
  fallbackBlogs,
  fallbackTestimonials,
} from "@/lib/fallback-data";

async function getPortfolioData() {
  if (!isDbConfigured) {
    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      skills: fallbackSkills,
      experiences: fallbackExperiences,
      education: fallbackEducation,
      blogs: fallbackBlogs,
      testimonials: fallbackTestimonials,
    };
  }

  try {
    await dbConnect();

    const [
      projects,
      skills,
      experiences,
      education,
      blogs,
      testimonials,
      profile,
    ] = await Promise.all([
      Project.find().sort({ order: 1 }).lean(),
      Skill.find().sort({ order: 1 }).lean(),
      Experience.find().sort({ order: 1 }).lean(),
      Education.find().sort({ order: 1 }).lean(),
      Blog.find({ published: true }).sort({ createdAt: -1 }).lean(),
      Testimonial.find().sort({ order: 1 }).lean(),
      Profile.findOne().lean(),
    ]);

    return {
      profile: profile ? JSON.parse(JSON.stringify(profile)) : fallbackProfile,
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
      blogs:
        blogs && blogs.length > 0
          ? JSON.parse(JSON.stringify(blogs))
          : fallbackBlogs,
      testimonials:
        testimonials && testimonials.length > 0
          ? JSON.parse(JSON.stringify(testimonials))
          : fallbackTestimonials,
    };
  } catch (error) {
    console.log("Using fallback data (DB not connected or query error):", error);
    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      skills: fallbackSkills,
      experiences: fallbackExperiences,
      education: fallbackEducation,
      blogs: fallbackBlogs,
      testimonials: fallbackTestimonials,
    };
  }
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <ExperienceSection experiences={data.experiences} />
        <EducationSection education={data.education} />
        <BlogSection blogs={data.blogs} />
        <Testimonials testimonials={data.testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
