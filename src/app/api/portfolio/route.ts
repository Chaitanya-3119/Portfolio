import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project, Skill, Experience, Education, Blog, Testimonial, Profile } from "@/lib/models";

// GET all portfolio data
export async function GET() {
  try {
    await dbConnect();

    const [projects, skills, experiences, education, blogs, testimonials, profile] =
      await Promise.all([
        Project.find().sort({ order: 1 }).lean(),
        Skill.find().sort({ order: 1 }).lean(),
        Experience.find().sort({ order: 1 }).lean(),
        Education.find().sort({ order: 1 }).lean(),
        Blog.find({ published: true }).sort({ createdAt: -1 }).lean(),
        Testimonial.find().sort({ order: 1 }).lean(),
        Profile.findOne().lean(),
      ]);

    return NextResponse.json({
      projects,
      skills,
      experiences,
      education,
      blogs,
      testimonials,
      profile,
    });
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
