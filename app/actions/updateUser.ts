"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { z } from "zod";

const schema = z.object({
  avatarImageUrl: z
    .string()
    .url({ message: "Please upload a valid image URL." }),
  name: z.string().min(3, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  socialMediaURL: z.string().url({ message: "Please enter a valid URL" }),
});

export async function updateUser(form: {
  name: string;
  about: string;
  socialMediaURL: string;
  avatarImageUrl: string;
}) {
  const user = await currentUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const validated = schema.safeParse(form);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  const imageResponse = await fetch(validated.data.avatarImageUrl);
  const imageBlob = await imageResponse.blob();

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
  });

  await clerkClient.users.updateUserProfileImage(user.id, { file: imageBlob });

  try {
    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        name: validated.data.name,
        about: validated.data.about,
        socialMediaURL: validated.data.socialMediaURL,
        avatarImage: validated.data.avatarImageUrl,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database update failed" };
  }
}
