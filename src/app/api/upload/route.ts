import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  const configured = isCloudinaryConfigured();
  return NextResponse.json({
    configured,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
    message: configured
      ? "Cloudinary is configured and ready to use."
      : "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env.local",
  });
}

export async function POST(req: NextRequest) {
  // Verify admin authentication
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in as admin to upload images." },
      { status: 401 }
    );
  }

  // Check if Cloudinary credentials are set up
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error: "Cloudinary credentials not configured",
        message:
          "Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env.local file.",
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    let buffer: Buffer;
    let folder = "portfolio";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");
      const folderParam = formData.get("folder");

      if (folderParam && typeof folderParam === "string") {
        folder = folderParam;
      }

      if (!file || !(file instanceof Blob)) {
        return NextResponse.json(
          { error: "No image file provided in form data" },
          { status: 400 }
        );
      }

      // Check max size (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds 10MB limit" },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      // JSON body with base64 string
      const body = await req.json();
      const { file, folder: customFolder } = body;

      if (customFolder && typeof customFolder === "string") {
        folder = customFolder;
      }

      if (!file || typeof file !== "string") {
        return NextResponse.json(
          { error: "No image data provided" },
          { status: 400 }
        );
      }

      // Handle data URI base64
      const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
      buffer = Buffer.from(base64Data, "base64");
    }

    const uploadResult = await uploadToCloudinary(buffer, { folder });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
