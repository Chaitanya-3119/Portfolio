import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import {
  Admin,
  Project,
  Skill,
  Experience,
  Education,
  Blog,
  Testimonial,
  Profile,
} from "@/lib/models";
import bcrypt from "bcryptjs";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackEducation,
  fallbackBlogs,
  fallbackTestimonials,
} from "@/lib/fallback-data";

// Seed admin user and initial portfolio data
export async function POST() {
  try {
    await dbConnect();

    // 1. Seed Admin
    let adminCreated = false;
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const email = process.env.ADMIN_EMAIL || "admin@chaitanya.dev";
      const password = process.env.ADMIN_PASSWORD || "changeme123";
      const hashedPassword = await bcrypt.hash(password, 12);

      await Admin.create({
        email,
        password: hashedPassword,
        name: "Chaitanya",
      });
      adminCreated = true;
    }

    // 2. Seed Profile
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...profileData } = fallbackProfile as any;
      await Profile.create({
        avatar: "/avatar.png",
        stats: {
          yearsExperience: 2,
          projectsCompleted: 6,
          happyClients: 10,
          githubStars: 15,
        },
        ...profileData,
      });
    }

    // 3. Seed Projects
    if ((await Project.countDocuments()) === 0) {
      const projectsToInsert = fallbackProjects.map((p, idx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = p;
        return {
          ...rest,
          image: p.image || `/projects/project${(idx % 3) + 1}.jpg`,
          screenshots: p.screenshots ?? [],
        };
      });
      await Project.insertMany(projectsToInsert);
    }

    // 4. Seed Skills
    if ((await Skill.countDocuments()) === 0) {
      const skillsToInsert = fallbackSkills.map((s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = s;
        return {
          icon: "⚡",
          ...rest,
        };
      });
      await Skill.insertMany(skillsToInsert);
    }

    // 5. Seed Experience
    if ((await Experience.countDocuments()) === 0) {
      const expToInsert = fallbackExperiences.map((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = e;
        return rest;
      });
      if (expToInsert.length > 0) {
        await Experience.insertMany(expToInsert);
      }
    }

    // 6. Seed Education
    if ((await Education.countDocuments()) === 0) {
      const eduToInsert = fallbackEducation.map((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = e;
        return {
          ...rest,
          institution: e.institution && e.institution.trim() !== "" ? e.institution : "B.Tech University",
          startYear: e.startYear && e.startYear.trim() !== "" ? e.startYear : "2022",
        };
      });
      if (eduToInsert.length > 0) {
        await Education.insertMany(eduToInsert);
      }
    }

    // 7. Seed Blogs
    if ((await Blog.countDocuments()) === 0 && (fallbackBlogs as any[]).length > 0) {
      const blogsToInsert = (fallbackBlogs as any[]).map((b) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = b;
        return rest;
      });
      await Blog.insertMany(blogsToInsert);
    }

    // 8. Seed Testimonials
    if ((await Testimonial.countDocuments()) === 0 && (fallbackTestimonials as any[]).length > 0) {
      const testToInsert = (fallbackTestimonials as any[]).map((t) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = t;
        return rest;
      });
      await Testimonial.insertMany(testToInsert);
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with initial portfolio data and admin account!",
      adminCreated,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database: " + (error as Error).message },
      { status: 500 }
    );
  }
}
