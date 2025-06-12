"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const donationSchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Amount must be at least 1")
  ),
  specialMessage: z
    .string()
    .min(5, "Please enter a message of at least 5 characters"),
  sspecialURLOrBuyMeACoffeeURL: z.string().url("Please enter a valid URL"),
  recipent: z.string().min(1),
  recipentId: z.preprocess((val) => Number(val), z.number().int()),
  donorId: z.string().optional(),
  donorName: z.string().optional(),
});

export async function createDonation(formData: FormData) {
  const parsed = donationSchema.safeParse({
    amount: formData.get("amount"),
    specialMessage: formData.get("specialMessage"),
    sspecialURLOrBuyMeACoffeeURL: formData.get("sspecialURLOrBuyMeACoffeeURL"),
    recipent: formData.get("recipent"),
    recipentId: formData.get("recipentId"),
    donorId: formData.get("donorId") ?? undefined,
    donorName: formData.get("donorName") ?? undefined,
  });

  if (!parsed.success) {
    return {
      message: "Validation failed",
      ZodError: parsed.error.flatten().fieldErrors,
    };
  }

  const user = await currentUser();

  const {
    amount,
    specialMessage,
    sspecialURLOrBuyMeACoffeeURL,
    recipent,
    recipentId,
    donorId,
    donorName,
  } = parsed.data;

  const finalDonorId = donorId ?? (user ? user.id : "anonymous");
  const finalDonorName =
    donorName ?? (user ? user.username ?? "Anonymous" : "Anonymous");

  let newDonation;

  try {
    newDonation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        sspecialURLOrBuyMeACoffeeURL,
        recipent,
        recipentId,
        donorId: finalDonorId,
        donorName: finalDonorName,
      },
      include: {
        recipientProfile: true, // recipient profile-ийг оруулж байна
      },
    });
  } catch (error) {
    return {
      message:
        "Database error: " +
        (error instanceof Error ? error.message : String(error)),
      ZodError: {},
    };
  }

  return {
    message: "Donation successful! Thank you!",
    ZodError: {},
    data: {
      success: true,
      donation: newDonation, // recipientProfile-тай хамт буцаана
      recipientAvatar: newDonation.recipientProfile.avatarImage, // шууд avatarImage-ийг авах боломжтой
    },
  };
}
