"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const schemaBankCardProfile = z.object({
  cardNumber: z
    .string()
    .transform((val) => val.replace(/-/g, ""))
    .refine((val) => /^\d+$/.test(val), {
      message: "Card number must contain only digits",
    })
    .refine((val) => val.length >= 13, {
      message: "Card number is too short",
    })
    .refine((val) => val.length <= 19, {
      message: "Card number is too long",
    }),
  firstName: z.string().min(3, "Please enter your first name"),

  lastName: z.string().min(3, "Please enter your last name"),

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
      expiry.setMonth(expiry.getMonth() + 1);
      return expiry > new Date();
    }, "Card has expired"),
});

export const addBankCardAction = async (_: unknown, formData: FormData) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return {
      message: "Unauthorized: User not found.",
      ZodError: {},
    };
  }

  const values = {
    cardNumber: formData.get("cardNumber")?.toString() || "",
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    country: formData.get("country")?.toString() || "",
    expiryDate: formData.get("expiryDate")?.toString() || "",
  };

  const validation = schemaBankCardProfile.safeParse(values);
  if (!validation.success) {
    return {
      ZodError: validation.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
    };
  }

  try {
    await prisma.bankCard.create({
      data: {
        ...validation.data,
        userId: user.id,
      },
    });

    return {
      data: {
        success: true,
      },
      message: "Bank card successfully added.",
      ZodError: {},
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "An unexpected error occurred while saving the bank card.",
      ZodError: {},
    };
  }
};
