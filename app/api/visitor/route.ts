import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Visitor } from "@/models/Visitor";

function isSameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export async function GET() {
  try {
    await connectDB();

    let visitor = await Visitor.findOne().lean();

    if (!visitor) {
      visitor = await Visitor.create({
        totalViews: 0,
        todayViews: 0,
        lastUpdated: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalViews: visitor.totalViews,
        todayViews: visitor.todayViews,
      },
    });
  } catch (error) {
    console.error("Failed to fetch visitor analytics.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch visitor analytics",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    const now = new Date();
    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = new Visitor({
        totalViews: 1,
        todayViews: 1,
        lastUpdated: now,
      });
      await visitor.save();
    } else {
      const shouldResetTodayViews = !isSameDay(new Date(visitor.lastUpdated), now);

      visitor.totalViews += 1;
      visitor.todayViews = shouldResetTodayViews ? 1 : visitor.todayViews + 1;
      visitor.lastUpdated = now;

      await visitor.save();
    }

    return NextResponse.json({
      success: true,
      data: {
        totalViews: visitor.totalViews,
        todayViews: visitor.todayViews,
      },
    });
  } catch (error) {
    console.error("Failed to update visitor analytics.", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update visitor analytics",
      },
      { status: 500 }
    );
  }
}
