import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Image file is required.",
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(error ?? new Error("Image upload failed."));
            return;
          }

          resolve(result.secure_url);
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image.",
      },
      { status: 500 },
    );
  }
}
