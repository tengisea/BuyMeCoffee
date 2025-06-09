"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "No logged in user." };
  }

  try {
    const clerk = await clerkClient();
    const updatedUser = await clerk.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        applicationName: formData.get("applicationName"),
        applicationType: formData.get("applicationType"),
      },
    });

    return {
      message: "Onboarding complete",
      data: updatedUser.publicMetadata,
    };
  } catch (err) {
    return { error: "Failed to update user metadata." };
  }
};
