import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Admin } from "@/lib/models";
import bcrypt from "bcryptjs";

// Seed admin user - only works if no admin exists
export async function POST() {
  try {
    await dbConnect();

    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const email = process.env.ADMIN_EMAIL || "admin@portfolio.dev";
    const password = process.env.ADMIN_PASSWORD || "changeme123";
    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      email,
      password: hashedPassword,
      name: "Admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      credentials: { email },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed admin" },
      { status: 500 }
    );
  }
}
