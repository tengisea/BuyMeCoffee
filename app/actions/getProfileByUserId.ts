"use server";

import prisma from "@/lib/prisma";

export async function getProfileByUserId(userId: string) {
  if (!userId) return null;

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      receivedDonations: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          amount: true,
          specialMessage: true,
          sspecialURLOrBuyMeACoffeeURL: true, 
          donorId: true,
          donorName: true,
          recipent: true,
          recipentId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return profile;
}
