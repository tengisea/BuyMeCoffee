import { notFound } from "next/navigation";
import { getProfileByUserId } from "@/app/actions/getProfileByUserId";
import Image from "next/legacy/image";
import DonateForm from "../components/Donate";
import RecentSupporters from "./components/RecentSupporters";

type Props = {
  params: {
    userId: string;
  };
};

export default async function UserProfilePage({ params }: Props) {
  const profile = await getProfileByUserId(params.userId);

  if (!profile) return notFound();

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 w-full h-[420px]">
        <Image
          src={profile.backgroundImage || "/default-bg.jpg"}
          alt={`${profile.name}'s background`}
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>

      <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-10 flex justify-center items-start gap-6 px-4">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="p-6 border rounded bg-white bg-opacity-90 shadow-lg">
            <div className="flex items-center gap-4 border-b pb-4">
              <Image
                src={profile.avatarImage || "/avatar-placeholder.png"}
                alt={`${profile.name}'s avatar`}
                className="rounded-full"
                width={48}
                height={48}
              />
              <h1 className="text-2xl font-bold">{profile.name}</h1>
            </div>
            <div className="pt-5">
              <strong>About {profile.name}</strong>
              <p className="mt-2 text-gray-700">{profile.about}</p>
            </div>
          </div>

          <div className="p-6 border rounded bg-white bg-opacity-90 shadow-lg">
            <strong>Social Media</strong>
            <a
              href={profile.socialMediaURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 underline break-all mt-2">
              {profile.socialMediaURL}
            </a>
          </div>

          <div className="p-6 border rounded bg-white bg-opacity-90 shadow-lg">
            <strong>Recent Supporters</strong>
            <RecentSupporters donations={profile.receivedDonations} />
          </div>
        </div>

        <DonateForm
          profile={{
            id: profile.id,
            name: profile.name,
            userId: profile.userId,
            avatarImage: profile.avatarImage,
            successMessage: profile.successMessage,
          }}
        />
      </div>
    </div>
  );
}
