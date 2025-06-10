"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import prisma from "@/lib/prisma";

const schemaUserProfile = z.object({
  avatarImageUrl: z
    .string()
    .url({ message: "Please upload a valid image URL." }),
  name: z.string().min(3, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  socialMediaURL: z.string().url({ message: "Please enter a valid URL" }),
});

export const createProfile = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    return {
      message: "No logged-in user",
      ZodError: {},
    };
  }

  const parsed = schemaUserProfile.safeParse({
    avatarImageUrl: formData.get("avatarImageUrl"),
    name: formData.get("name"),
    about: formData.get("about"),
    socialMediaURL: formData.get("socialMediaURL"),
  });

  if (!parsed.success) {
    return {
      ZodError: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const { avatarImageUrl, name, about, socialMediaURL } = parsed.data;

  const imageResponse = await fetch(avatarImageUrl);
  const imageBlob = await imageResponse.blob();

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
  });

  await clerkClient.users.updateUserProfileImage(user.id, { file: imageBlob });

  await prisma.profile.create({
    data: {
      name,
      about,
      avatarImage: avatarImageUrl,
      socialMediaURL,
      backgroundImage: "",
      userId: String(user.id),
      email: user.emailAddresses[0]?.emailAddress || "",
      successMessage: "",
    },
  });

  return {
    data: {
      success: true,
    },
    ZodError: {},
    message: "Profile created",
  };
};
