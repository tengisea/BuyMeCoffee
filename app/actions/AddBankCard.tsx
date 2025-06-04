"use server";
import { z } from "zod/v4";
import { currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const schemaUserProfile = z.object({
  cardNumber: z.any().refine((files) => files?.length == 1, {
    message: "Please enter your card number",
  }),
  firstName: z.string().min(3, { message: "Please enter your first name" }),
  lastName: z.string().min(3, { message: "Please enter your last name" }),
  country: z.string().min(1, { message: "Please enter your country" }),
  expiryDate: z.url({ message: "Please enter your card expiry date" }),
});

export const addBankCard = async (previous: unknown, formData: FormData) => {
  const user = await currentUser();

  const validateFormData = schemaUserProfile.safeParse({
    cardNumber: formData.get("cardNumber"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    country: formData.get("country"),
    expiryDate: formData.get("expiryDate"),
  });

  if (!validateFormData.success) {
    return {
      ZodError: validateFormData.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to maka a profile",
    };
  }

  const name = formData.get("cardNumber") as string;
  const about = formData.get("firstName") as string;
  const avatarImage = formData.get("lastName") as string;
  const socialMediaURL = formData.get("country") as string;
  const backgroundImage = formData.get("expiryDate") as string;

  await prisma.bankCard.create({
    data: {
      cardNumber,
      firstName,
      lastName,
      country,
      expiryDate,
      userId: String(user?.id),
    },
  });

  redirect("/");
};
