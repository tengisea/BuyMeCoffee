import { notFound } from "next/navigation";
import { getProfileByUserId } from "@/app/actions/getProfileByUserId";
import Image from "next/legacy/image";
import Donate from "../components/Donate";
import RecentSupporters from "../components/RecentSupporters";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const profile = await getProfileByUserId(params.userId);

  if (!profile) return notFound();

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 w-full h-[420px]">
        <Image
          src={profile.backgroundImage}
          alt={profile.name}
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-10 flex justify-center items-start gap-2">
        <div
          className="flex flex-col gap-5 px-6"
          style={{ pointerEvents: "auto" }}>
          <div className="p-6 border-1 rounded bg-white bg-opacity-90 shadow-lg w-145">
            <div className="flex items-center gap-3 border-b-1 pb-4">
              <Image
                src={profile.avatarImage}
                alt={profile.name}
                className="rounded-full my-4"
                width={48}
                height={48}
              />
              <h1 className="text-2xl font-bold">{profile.name}</h1>
            </div>
            <div className="mb-2 flex flex-col gap-2 pt-5">
              <strong>About {profile.name}</strong>
              <p>{profile.about}</p>
            </div>
          </div>
          <div className="p-6 border-1 rounded flex flex-col gap-4 bg-white bg-opacity-90 shadow-lg">
            <strong>Social media URL</strong>{" "}
            <a
              href={profile.socialMediaURL}
              target="_blank"
              rel="noopener noreferrer">
              {profile.socialMediaURL}
            </a>
          </div>
          <div className="p-6 border-1 rounded flex flex-col gap-4 bg-white bg-opacity-90 shadow-lg">
            <strong>Recent Supporters</strong>
            <RecentSupporters donations={profile.receivedDonations} />
          </div>
        </div>
        <Donate
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
