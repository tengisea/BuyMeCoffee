"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node"; // 👈 энд clerk-sdk-node ашиглаж байна
import prisma from "@/lib/prisma";

const schemaUserProfile = z.object({
  avatarImageUrl: z
    .string()
    .url({ message: "Please upload a valid image URL." }),
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

  // Fetch the image and convert it to a Blob
  const imageResponse = await fetch(avatarImageUrl);
  const imageBlob = await imageResponse.blob();
console.log(imageBlob);

  await users.updateUserProfileImage(user.id, { file: imageBlob });

  // ✅ Prisma-р profile үүсгэх
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
