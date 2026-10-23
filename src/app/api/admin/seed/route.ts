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
export async function POST(req?: Request) {
  try {
    await dbConnect();

    const url = req ? new URL(req.url) : null;
    const shouldRefresh = url?.searchParams.get("sync") === "true";

    // 1. Seed Admin
    let adminCreated = false;
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const email = process.env.ADMIN_EMAIL || "chaitanya7101@gmail.com";
      const password = process.env.ADMIN_PASSWORD || "changeme123";
      const hashedPassword = await bcrypt.hash(password, 12);

      await Admin.create({
        email,
        password: hashedPassword,
        name: "Chaitanya",
      });
      adminCreated = true;
    } else if (existingAdmin.email === "admin@chaitanya.dev") {
      const email = process.env.ADMIN_EMAIL || "chaitanya7101@gmail.com";
      existingAdmin.email = email;
      await existingAdmin.save();
    }

    // 2. Seed / Update Profile
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        ...fallbackProfile,
        avatar: fallbackProfile.avatar || "/avatar.png",
        stats: {
          yearsExperience: 2,
          projectsCompleted: 6,
          happyClients: 10,
          githubStars: 15,
        },
      });
    } else if (shouldRefresh) {
      await Profile.findByIdAndUpdate(existingProfile._id, {
        $set: {
          tagline: fallbackProfile.tagline,
          bio: fallbackProfile.bio,
          location: fallbackProfile.location,
          email: existingProfile.email || fallbackProfile.email,
          phone: fallbackProfile.phone,
          socialLinks: {
            ...fallbackProfile.socialLinks,
            ...existingProfile.socialLinks,
            linkedin: existingProfile.socialLinks?.linkedin || fallbackProfile.socialLinks.linkedin,
            github: existingProfile.socialLinks?.github || fallbackProfile.socialLinks.github,
          },
        },
      });
      // Clean up legacy placeholder education
      await Education.deleteMany({ institution: "B.Tech" });
    }

    // 3. Seed / Upsert Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 || shouldRefresh) {
      for (const p of fallbackProjects) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, image, screenshots, ...rest } = p;
        await Project.findOneAndUpdate(
          { slug: p.slug },
          {
            $set: rest,
            $setOnInsert: {
              image: image || "",
              screenshots: screenshots ?? [],
            },
          },
          { upsert: true, new: true }
        );
      }
    }

    // 4. Seed / Upsert Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0 || shouldRefresh) {
      if (shouldRefresh) {
        // Remove skills that are no longer in fallbackSkills
        await Skill.deleteMany({
          name: { $nin: fallbackSkills.map((s) => s.name) },
        });
      }
      for (const s of fallbackSkills) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = s;
        await Skill.findOneAndUpdate(
          { name: s.name },
          {
            $set: {
              icon: "⚡",
              ...rest,
            },
          },
          { upsert: true, new: true }
        );
      }
    }

    // 5. Seed / Upsert Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0 || shouldRefresh) {
      for (const exp of fallbackExperiences) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = exp;
        await Experience.findOneAndUpdate(
          { company: exp.company },
          { $set: rest },
          { upsert: true, new: true }
        );
      }
    }

    // 6. Seed / Upsert Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0 || shouldRefresh) {
      for (const edu of fallbackEducation) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = edu;
        await Education.findOneAndUpdate(
          { institution: edu.institution },
          { $set: rest },
          { upsert: true, new: true }
        );
      }
    }

    // 7. Seed Blogs
    const blogs = fallbackBlogs as { _id?: string; [key: string]: unknown }[];
    if ((await Blog.countDocuments()) === 0 && blogs.length > 0) {
      const blogsToInsert = blogs.map((b) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = b;
        return rest;
      });
      await Blog.insertMany(blogsToInsert);
    }

    // 8. Seed Testimonials
    const testimonials = fallbackTestimonials as {
      _id?: string;
      [key: string]: unknown;
    }[];
    if ((await Testimonial.countDocuments()) === 0 && testimonials.length > 0) {
      const testToInsert = testimonials.map((t) => {
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
