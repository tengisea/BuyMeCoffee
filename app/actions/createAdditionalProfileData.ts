"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const schemaAdditional = z.object({
  backgroundImageUrl: z
    .string()
    .url({ message: "Please upload a valid background image URL." }),
  successMessage: z
    .string()
    .min(5, { message: "Please write a message with at least 5 characters." }),
});

export const createAdditionalProfileData = async (formData: FormData) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        message: "No logged-in user",
        ZodError: {},
      };
    }

    const parsed = schemaAdditional.safeParse({
      backgroundImageUrl: formData.get("backgroundImageUrl"),
      successMessage: formData.get("successMessage"),
    });

    if (!parsed.success) {
      return {
        ZodError: parsed.error.flatten().fieldErrors,
        message: "Validation failed",
      };
    }

    const { backgroundImageUrl, successMessage } = parsed.data;

    await prisma.profile.updateMany({
      where: { userId: user.id },
      data: {
        backgroundImage: backgroundImageUrl,
        successMessage,
      },
    });

    return {
      data: { success: true },
      ZodError: {},
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating additional profile:", error);
    return {
      message: "Something went wrong while updating your profile.",
      ZodError: {},
    };
  }
};
