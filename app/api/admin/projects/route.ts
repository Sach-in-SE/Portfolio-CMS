import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch admin projects.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, techStack, githubLink, liveDemo, image } =
      await request.json();

    await connectDB();

    const project = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveDemo,
      image,
      isVisible: true,
    });

    await project.save();

    return NextResponse.json({
      success: true,
      message: "Project created",
    });
  } catch (error) {
    console.error("Failed to create project.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, title, description, techStack, githubLink, liveDemo, image, isVisible } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Project id is required",
        },
        { status: 400 }
      );
    }

    const updatedData: {
      title?: string;
      description?: string;
      techStack?: string[];
      githubLink?: string;
      liveDemo?: string;
      image?: string;
      isVisible?: boolean;
    } = {};

    if (title) {
      updatedData.title = title;
    }
    if (description) {
      updatedData.description = description;
    }
    if (techStack) {
      updatedData.techStack = techStack;
    }
    if (githubLink) {
      updatedData.githubLink = githubLink;
    }
    if (liveDemo) {
      updatedData.liveDemo = liveDemo;
    }
    if (image) {
      updatedData.image = image;
    }
    if (typeof isVisible !== "undefined") {
      updatedData.isVisible = isVisible;
    }

    if (!Object.keys(updatedData).length) {
      return NextResponse.json(
        {
          success: false,
          error: "No fields provided to update",
        },
        { status: 400 }
      );
    }

    await connectDB();
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Failed to update project.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update project",
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
          error: "Project id is required",
        },
        { status: 400 }
      );
    }

    await connectDB();
    await Project.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error("Failed to delete project.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
