"use server"
// api/getProfilesInfo

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        userId: true,
        name: true,
        avatarImage: true,
        about: true,
        socialMediaURL: true,
      },
      take: 10,
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
