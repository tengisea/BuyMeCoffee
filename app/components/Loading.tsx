"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import { useUser } from "@clerk/nextjs";
import { completeOnboarding } from "../onboarding/_actions";

export const Loading = () => {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const formData = new FormData();
    formData.append("applicationName", "MyApp");
    formData.append("applicationType", "Web");

    const timer = setTimeout(async () => {
      const res = await completeOnboarding(formData);

      if (res?.message) {
        await user?.reload();
        router.push("/");
      } else if (res?.error) {
        setError(res.error);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image src="/coffeeLoad.gif" alt="Loading" width={150} height={150} />
      <div className="text-xl font-medium mt-4">Loading...</div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};
