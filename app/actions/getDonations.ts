"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getProfileWithDonations() {
  const { userId } = await auth();
  if (!userId) return null;

  const profile = await prisma.profile.findMany({
    where: { userId },
    include: {
      receivedDonations: {
        orderBy: { createdAt: "desc" },
        include: {
          recipientProfile: true,
        },
      },
    },
  });

  return profile;
}
