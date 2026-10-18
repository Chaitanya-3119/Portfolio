import { NextRequest, NextResponse } from "next/server";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import { Contact } from "@/lib/models";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured) {
    return NextResponse.json([]);
  }

  try {
    await dbConnect();
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, read } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    if (!isDbConfigured) {
      return NextResponse.json({ success: true, read });
    }

    await dbConnect();
    const updated = await Contact.findByIdAndUpdate(
      id,
      { read: typeof read === "boolean" ? read : true },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
  }

  if (!isDbConfigured) {
    return NextResponse.json({ success: true, message: "Deleted (Demo)" });
  }

  try {
    await dbConnect();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
