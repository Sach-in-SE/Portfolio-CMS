import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await connectDB();

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Failed to send contact message.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
      },
      { status: 500 }
    );
  }
}
