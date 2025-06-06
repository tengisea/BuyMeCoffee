"use server";

import { z } from "zod";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const schemaUserProfile = z.object({
  avatarImage: z
    .any()
    .refine((file) => file instanceof File && file.name.length > 0, {
      message: "Please upload an image",
    }),
  name: z.string().min(3, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  socialMediaURL: z.string().url({ message: "Please enter a valid URL" }),
});

export const createProfile = async (prev: any, formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    return {
      message: "No logged-in user",
      ZodError: {},
    };
  }

  const parsed = schemaUserProfile.safeParse({
    avatarImage: formData.get("avatarImage"),
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

  const avatarImageFile = formData.get("avatarImage") as File;
  const avatarImageUrl = avatarImageFile.name; 
  const name = formData.get("name") as string;
  const about = formData.get("about") as string;
  const socialMediaURL = formData.get("socialMediaURL") as string;

  const clerk = await clerkClient();
  await clerk.users.updateUser(user.id, {
    publicMetadata: {
      avatarImageUrl: avatarImageUrl,
    },
  });

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
