"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { ExternalLink, User } from "lucide-react";
import { useRouter } from "next/navigation";

type Profile = {
  id: number;
  userId: string;
  email: string;
  name: string;
  about: string;
  avatarImage: string;
  receivedDonations: [];
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  bankCard?: [];
  createdAt: string;
  updatedAt: string;
};

const ExploreCreators = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(
          `/api/getProfilesInfo?q=${encodeURIComponent(search)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profiles");
        }

        const data = await res.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [search]);
  

  return (
    <div className="flex flex-col gap-6">
      <div className="text-xl font-semibold">Explore creators</div>
      <Input
        className="w-64"
        placeholder="Search name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="p-4 border rounded">
            <div className="flex items-center justify-between gap-3">
              <div>
                <img
                  src={profile.avatarImage}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={profile.name}
                />
                <div className="font-bold">{profile.name}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push(`/explore/${profile.userId}`)}>
                View profile <ExternalLink />
              </Button>
            </div>
            <div className="flex gap-5 mt-2">
              <div className="w-105">
                <div className="font-semibold">About {profile.name}</div>
                <div className="text-sm">{profile.about}</div>
              </div>
              <div>
                <div className="font-semibold">Social media URL</div>
                <a className="text-sm" href={profile.socialMediaURL}>
                  {profile.socialMediaURL}
                </a>
              </div>
            </div>
          </div>
        ))}
        {profiles.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="rounded-full p-5 bg-[#F4F4F5]">
              <User />
            </div>
            <div className="font-semibold flex items-center">
              No creators have signed up yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCreators;
