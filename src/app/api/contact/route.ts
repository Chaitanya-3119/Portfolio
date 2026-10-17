import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Contact } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      await Contact.create({ name, email, subject, message });
    } catch {
      // If DB is not connected, just log it
      console.log("Contact form submission (DB unavailable):", {
        name,
        email,
        subject,
        message,
      });
    }

    return NextResponse.json(
      { success: true, message: "Message received!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
