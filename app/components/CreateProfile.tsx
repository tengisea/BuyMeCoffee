import prisma from "@/lib/prisma"; // server-д байгаа, client-д ашиглахгүй
import Form from "next/form";
import { auth, currentUser } from "@clerk/nextjs/server"; // Add this import at the top
import { Camera } from "lucide-react";
import { ImageUpload } from "../api";

export const CreateProfile = () => {
  async function CreateProfile(profileData: FormData) {
    "use server";
    const name = profileData.get("name") as string;
    const about = profileData.get("about") as string;
    const avatarImage = profileData.get("avatarImage") as string;
    const socialMediaURL = profileData.get("socialMediaURL") as string;
    const backgroundImage = profileData.get("backgroundImage") as string;
    const successMessage = profileData.get("successMessage") as string;
    const email = profileData.get("email") as string;

    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await currentUser();

    await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage: user?.imageUrl ?? "",
        socialMediaURL,
        backgroundImage,
        successMessage,
        userId: userId,
        email: user?.emailAddresses?.[0]?.emailAddress ?? "",
      },
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete your profile page</h1>
      <Form action={CreateProfile} className="space-y-6">
        <div>
          <label
            htmlFor="avatarImage"
            className="block text-lg mb-3 font-medium">
            Add photo
          </label>

          <div className="relative w-full">
            <ImageUpload />
          </div>

          <label htmlFor="name" className="block text-lg mb-3 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here"
            className="w-full px-4 py-2 border rounded-lg mb-4 font-medium"
            required
          />

          <label htmlFor="about" className="block text-lg mb-2 font-medium">
            About
          </label>
          <textarea
            id="about"
            name="about"
            placeholder="Write about yourself here"
            className="w-full px-4 py-2 border rounded-lg mb-4 font-medium"
            rows={3}
            required
          />

          <label
            htmlFor="socialMediaURL"
            className="block text-lg mb-2 font-medium">
            Social Media URL
          </label>
          <input
            type="url"
            id="socialMediaURL"
            name="socialMediaURL"
            placeholder="https://"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label
            htmlFor="backgroundImage"
            className="block text-lg mb-2 font-medium">
            Background Image URL
          </label>
          <input
            type="url"
            id="backgroundImage"
            name="backgroundImage"
            placeholder="Paste your background image URL"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label
            htmlFor="successMessage"
            className="block text-lg mb-2 font-medium">
            Success Message
          </label>
          <input
            type="text"
            id="successMessage"
            name="successMessage"
            placeholder="Enter a thank you message"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          create profile
        </button>
      </Form>
    </div>
  );
};