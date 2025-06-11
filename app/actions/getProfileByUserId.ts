// app/actions/getProfileByUserId.ts
"use server";

import prisma from "@/lib/prisma";

export const getProfileByUserId = async (userId: string) => {
  if (!userId) return null;

  const profile = await prisma.profile.findFirst({
    where: { userId },
  });

  return profile;
};
