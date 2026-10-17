import { NextRequest, NextResponse } from "next/server";
import dbConnect, { isDbConfigured } from "@/lib/mongodb";
import { Admin } from "@/lib/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "default-secret-change-me";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!isDbConfigured) {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@chaitanya.dev";
      const defaultPassword = process.env.ADMIN_PASSWORD || "changeme123";

      if (email === defaultEmail && password === defaultPassword) {
        const token = jwt.sign(
          { id: "local-admin", email, name: "Admin (Demo Mode)" },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        const response = NextResponse.json({
          success: true,
          user: { name: "Admin (Demo Mode)", email },
        });

        response.cookies.set("admin-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        return response;
      }

      return NextResponse.json(
        { error: "Invalid credentials. Use credentials from .env.local" },
        { status: 401 }
      );
    }

    await dbConnect();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      user: { name: admin.name, email: admin.email },
    });

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
