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

    const defaultEmail = process.env.ADMIN_EMAIL || "admin@chaitanya.dev";
    const defaultPassword = process.env.ADMIN_PASSWORD || "changeme123";

    if (!isDbConfigured) {
      if (email.trim().toLowerCase() === defaultEmail.trim().toLowerCase() && password === defaultPassword) {
        const token = jwt.sign(
          { id: "local-admin", email: defaultEmail, name: "Admin (Demo Mode)" },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        const response = NextResponse.json({
          success: true,
          user: { name: "Admin (Demo Mode)", email: defaultEmail },
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
        { error: "Invalid credentials. Please use the ADMIN_EMAIL and ADMIN_PASSWORD configured in your environment." },
        { status: 401 }
      );
    }

    try {
      await dbConnect();

      const admin = await Admin.findOne({
        email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
      });

      if (!admin) {
        // Fallback: If DB is connected but Admin account hasn't been seeded yet,
        // allow logging in with environment credentials
        if (
          email.trim().toLowerCase() === defaultEmail.trim().toLowerCase() &&
          password === defaultPassword
        ) {
          const token = jwt.sign(
            { id: "env-admin", email: defaultEmail, name: "Admin" },
            JWT_SECRET,
            { expiresIn: "7d" }
          );

          const response = NextResponse.json({
            success: true,
            user: { name: "Admin", email: defaultEmail },
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
          { error: "Invalid credentials or admin not created yet. Use your ADMIN_EMAIL and ADMIN_PASSWORD." },
          { status: 401 }
        );
      }

      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        // Also check default env password as alternative
        if (
          email.trim().toLowerCase() === defaultEmail.trim().toLowerCase() &&
          password === defaultPassword
        ) {
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
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });

          return response;
        }

        return NextResponse.json(
          { error: "Invalid password" },
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
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    } catch (dbError: unknown) {
      console.error("Database connection/query error during login:", dbError);

      // Emergency fallback: If MongoDB is unreachable (e.g., Atlas IP whitelist),
      // allow logging in with ADMIN_EMAIL and ADMIN_PASSWORD so you are never locked out
      if (
        email.trim().toLowerCase() === defaultEmail.trim().toLowerCase() &&
        password === defaultPassword
      ) {
        const token = jwt.sign(
          { id: "fallback-admin", email: defaultEmail, name: "Admin (Fallback)" },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        const response = NextResponse.json({
          success: true,
          user: { name: "Admin (Fallback)", email: defaultEmail },
          warning: "Database is unreachable. Logged in with fallback environment credentials.",
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

      const errObj = dbError as { name?: string; message?: string };
      const isWhitelistError =
        errObj?.name === "MongooseServerSelectionError" ||
        errObj?.message?.includes("IP that isn't whitelisted");

      return NextResponse.json(
        {
          error: isWhitelistError
            ? "MongoDB Atlas IP whitelist error: Please add 0.0.0.0/0 to Network Access in MongoDB Atlas."
            : "Database error during authentication. Check MongoDB connection.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("General auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
