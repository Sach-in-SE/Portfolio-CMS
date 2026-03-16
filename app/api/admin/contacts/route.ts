import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Failed to fetch contacts.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await request.json().catch(() => null);
      id = body?.id ?? null;
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Contact id is required",
        },
        { status: 400 }
      );
    }

    await connectDB();
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Query deleted",
    });
  } catch (error) {
    console.error("Failed to delete contact query.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete query",
      },
      { status: 500 }
    );
  }
}
