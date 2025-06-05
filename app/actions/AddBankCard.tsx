"use server";
import { z } from "zod/v4";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const schemaBankCardProfile = z.object({
  cardNumber: z
    .string()
    .min(1, "Please enter your card number")
    .regex(/^[0-9]+$/, "Card number must contain only digits")
    .min(13, "Card number is too short")
    .max(19, "Card number is too long"),
  firstName: z.string().min(3, { message: "Please enter your first name" }),
  lastName: z.string().min(3, { message: "Please enter your last name" }),
  country: z.string().min(2, "Country is required"),
  expiryDate: z
    .string()
    .regex(
      /^([0-9]{4})-(0[1-9]|1[0-2])$/,
      "Invalid expiry date format (YYYY-MM)"
    )
    .refine((val) => {
      const [year, month] = val.split("-");
      const expiry = new Date(parseInt(year), parseInt(month) - 1);
      const today = new Date();

      expiry.setMonth(expiry.getMonth() + 1);
      return expiry > today;
    }, "Card has expired"),
});

export const addBankCard = async (previous: unknown, formData: FormData) => {
  const user = await currentUser();
  console.log({ asd: formData.get("country")?.toString() });
  const cardNumber = formData.get("cardNumber")?.toString() || "";
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const country = formData.get("country")?.toString() || "";
  const expiryDate = formData.get("expiryDate")?.toString() || "";

  const validateFormData = schemaBankCardProfile.safeParse({
    cardNumber,
    firstName,
    lastName,
    country,
    expiryDate,
  });

  if (!validateFormData.success) {
    return {
      ZodError: validateFormData.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to maka a profile",
    };
  }

  // const cardNumber = formData.get("cardNumber") as string;
  // const firstName = formData.get("firstName") as string;
  // const lastName = formData.get("lastName") as string;
  // const country = formData.get("country") as string;
  // const expiryDate = formData.get("expiryDate") as string;

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
