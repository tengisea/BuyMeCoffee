// "use server";
// import { z } from "zod/v4";
// import { currentUser } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import { redirect } from "next/navigation";

// const schemaUserProfile = z.object({
//   avatarImage: z.any().refine((files) => files?.length == 1, {
//     message: "Please enter image",
//   }),
//   name: z.string().min(3, { message: "Please enter name" }),
//   about: z.string().min(1, { message: "Please enter info about yourself" }),
//   socialMediaURL: z.url({ message: "Please enter a social link" }),
// });

// export const createProfile = async (previous: unknown, formData: FormData) => {
//   const user = await currentUser();

//   const validateFormData = schemaUserProfile.safeParse({
//     avatarImage: formData.get("avatarImage"),
//     name: formData.get("name"),
//     about: formData.get("about"),
//     socialMediaURL: formData.get("socialMediaURL"),
//   });

//   if (!validateFormData.success) {
//     return {
//       ZodError: validateFormData.error.flatten().fieldErrors,
//       message: "Missing Fields, Failed to maka a profile",
//     };
//   }

//   const name = formData.get("name") as string;
//   const about = formData.get("about") as string;
//   const avatarImage = formData.get("avatarImage") as string;
//   const socialMediaURL = formData.get("socialMediaURL") as string;
//   const backgroundImage = formData.get("backgroundImage") as string;

//   await prisma.profile.create({
//     data: {
//       name,
//       about,
//       avatarImage,
//       socialMediaURL,
//       backgroundImage,
//       userId: String(user?.id),
//       email: user?.emailAddresses[0]?.emailAddress || "",
//       successMessage:"",
//     },
//   });

//   redirect("/");
// };




// "use server";

// import { z } from "zod";
// import { currentUser } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// const schemaUserProfile = z.object({
//   name: z.string().min(3, { message: "Please enter a name" }),
//   about: z.string().min(1, { message: "Please enter info about yourself" }),
//   socialMediaURL: z
//     .string()
//     .url({ message: "Please enter a valid social link" }),
// });

// export const createProfile = async (prevState: any, formData: FormData) => {
//   const user = await currentUser();

//   const result = schemaUserProfile.safeParse({
//     avatarImage: formData.get("avatarImage"),
//     name: formData.get("name"),
//     about: formData.get("about"),
//     socialMediaURL: formData.get("socialMediaURL"),
//   });

//   if (!result.success) {
//     return {
//       ZodError: result.error.flatten().fieldErrors,
//       message: "Validation failed",
//     };
//   }

//   const { name, about, socialMediaURL } = result.data;
//   const avatarImage = formData.get("avatarImage") as string;
//   const backgroundImage = formData.get("backgroundImage") as string;

//   await prisma.profile.create({
//     data: {
//       name,
//       about,
//       avatarImage,
//       backgroundImage,
//       socialMediaURL,
//       userId: String(user?.id),
//       email: user?.emailAddresses[0]?.emailAddress || "",
//       successMessage: ""
//     },
//   });

//   return {
//     ZodError: {},
//     message: "Profile created successfully",
//     data: { success: true },
//   };
// };







"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Zod validation schema
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

  // Валидейшн хийх
  const parsed = schemaUserProfile.safeParse({
    avatarImage: formData.get("avatarImage"),
    name: formData.get("name"),
    about: formData.get("about"),
    socialMediaURL: formData.get("socialMediaURL"),
  });

  // Хэрвээ алдаатай бол алдаануудыг буцаах
  if (!parsed.success) {
    return {
      ZodError: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  // File объектоос зөвхөн нэрийг нь авах
  const avatarImageFile = formData.get("avatarImage") as File;
  const avatarImageName = avatarImageFile.name;

  const name = formData.get("name") as string;
  const about = formData.get("about") as string;
  const socialMediaURL = formData.get("socialMediaURL") as string;
  const backgroundImage = formData.get("backgroundImage") as string | null;

  // DB-д хадгалах
  await prisma.profile.create({
    data: {
      name,
      about,
      avatarImage: avatarImageName, // Зөвхөн file name хадгалж байна
      socialMediaURL,
      backgroundImage:"",
      userId: String(user?.id),
      email: user?.emailAddresses[0]?.emailAddress || "",
      successMessage: "",
    },
  });

  // Амжилттай бол redirect хийх
  redirect("/");
};
