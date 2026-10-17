import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "default-secret-change-me";

export function verifyAuth(req: NextRequest): { id: string; email: string; name: string } | null {
  const token = req.cookies.get("admin-token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
    };
    return decoded;
  } catch {
    return null;
  }
}
