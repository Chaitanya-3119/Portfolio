import { NextRequest, NextResponse } from "next/server";
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
import { verifyAuth } from "@/lib/auth";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperiences,
  fallbackEducation,
  fallbackBlogs,
  fallbackTestimonials,
} from "@/lib/fallback-data";

const models: Record<string, any> = {
  projects: Project,
  skills: Skill,
  experiences: Experience,
  education: Education,
  blogs: Blog,
  testimonials: Testimonial,
  profile: Profile,
};

const fallbackDataMap: Record<string, any> = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  experiences: fallbackExperiences,
  education: fallbackEducation,
  blogs: fallbackBlogs,
  testimonials: fallbackTestimonials,
  profile: fallbackProfile,
};

// GET all items for a collection
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  const Model = models[collection];
  if (!Model) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  if (!isDbConfigured) {
    const data = fallbackDataMap[collection];
    if (collection === "profile") {
      return NextResponse.json(data ? [data] : []);
    }
    return NextResponse.json(data || []);
  }

  try {
    await dbConnect();
    const items = await Model.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST create new item
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  const Model = models[collection];
  if (!Model) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  if (!isDbConfigured) {
    const body = await req.json();
    return NextResponse.json(
      { ...body, _id: "demo-" + Date.now() },
      { status: 201 }
    );
  }

  try {
    await dbConnect();
    const body = await req.json();
    const item = await Model.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PUT update item
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  const Model = models[collection];
  if (!Model) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  if (!isDbConfigured) {
    const body = await req.json();
    return NextResponse.json({ ...body, _id: body._id || "demo-" + Date.now() });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;
    const item = await Model.findByIdAndUpdate(_id, updateData, { new: true });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await params;
  const Model = models[collection];
  if (!Model) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  if (!isDbConfigured) {
    return NextResponse.json({ success: true, message: "Deleted (demo mode)" });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    await Model.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
