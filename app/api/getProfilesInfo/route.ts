"use server"

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const profiles = await prisma.profile.findMany({
    where: q
      ? {
          name: {
            contains: q,
            mode: "insensitive", // Том жижиг үсгийг ялгахгүй
          },
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(profiles);
}
