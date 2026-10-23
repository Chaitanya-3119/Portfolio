import { NextRequest, NextResponse } from "next/server";
import type { Model } from "mongoose";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import {
  Project,
  Skill,
  Experience,
  Education,
  Blog,
  Testimonial,
  Profile,
  Contact,
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

// The models share one CRUD surface but carry different document types, so the
// map is typed against a single loose document shape rather than `any`.
type CollectionModel = Model<Record<string, unknown>>;

const models = {
  projects: Project,
  skills: Skill,
  experiences: Experience,
  education: Education,
  blogs: Blog,
  testimonials: Testimonial,
  profile: Profile,
  messages: Contact,
} as unknown as Record<string, CollectionModel>;

const fallbackDataMap: Record<string, unknown> = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  experiences: fallbackExperiences,
  education: fallbackEducation,
  blogs: fallbackBlogs,
  testimonials: fallbackTestimonials,
  profile: fallbackProfile,
  messages: [],
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
    const sortConfig: Record<string, 1 | -1> =
      collection === "messages"
        ? { createdAt: -1 }
        : { order: 1, createdAt: -1 };
    const items = await Model.find().sort(sortConfig).lean();
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

  const body = (await req.json()) as Record<string, unknown>;

  if (!isDbConfigured) {
    return NextResponse.json(
      { ...body, _id: "demo-" + Date.now() },
      { status: 201 }
    );
  }

  try {
    await dbConnect();
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

  const body = (await req.json()) as Record<string, unknown>;

  if (!isDbConfigured) {
    return NextResponse.json({ ...body, _id: body._id || "demo-" + Date.now() });
  }

  try {
    await dbConnect();
    const { _id, ...updateData } = body;
    const item = await Model.findByIdAndUpdate(_id, updateData, { new: true });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch {
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
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
