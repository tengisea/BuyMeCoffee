"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function updateUser(form: { name: string; email: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const validated = schema.safeParse(form);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        name: validated.data.name,
        email: validated.data.email,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Database update failed" };
  }
}
