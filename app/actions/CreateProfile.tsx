"use server";
import { z } from "zod/v4";
import { currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const schemaUserProfile = z.object({
  avatarImage: z.any().refine((files) => files?.length == 1, {
    message: "Please enter image",
  }),
  name: z.string().min(3, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  socialMediaURL: z.url({ message: "Please enter a social link" }),
});

export const createProfile = async (previous: unknown, formData: FormData) => {
  const user = await currentUser();

  const validateFormData = schemaUserProfile.safeParse({
    avatarImage: formData.get("avatarImage"),
    name: formData.get("name"),
    about: formData.get("about"),
    socialMediaURL: formData.get("socialMediaURL"),
  });

  if (!validateFormData.success) {
    return {
      ZodError: validateFormData.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to maka a profile",
    };
  }

  const name = formData.get("name") as string;
  const about = formData.get("about") as string;
  const avatarImage = formData.get("avatarImage") as string;
  const socialMediaURL = formData.get("socialMediaURL") as string;
  const backgroundImage = formData.get("backgroundImage") as string;

  await prisma.profile.create({
    data: {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      userId: String(user?.id),
      email: user?.emailAddresses[0]?.emailAddress || '',
      successMessage,
    },
  });

  redirect("/");
};
