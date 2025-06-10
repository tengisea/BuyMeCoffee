import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  backgroundImageUrl: z
    .string()
    .url({ message: "Invalid background image URL" }),
  successMessage: z.string().min(5, { message: "Please write a message" }),
});

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { backgroundImageUrl, successMessage } = parsed.data;

  await prisma.profile.update({
    where: { userId: user.id },
    data: {
      backgroundImage: backgroundImageUrl,
      successMessage,
    },
  });

  return NextResponse.json({ success: true });
}
