"use server"

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
      about: true,
      socialMediaURL: true,
      avatarImage: true,
    },
  });

  if (!profile) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(profile), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
