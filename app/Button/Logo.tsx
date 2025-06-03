"use client";
import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

export const Logo = () => {
      const router = useRouter();
  return (
    <button className="flex gap-2 font-bold" onClick={() => router.push("/")}>
      <Coffee />
      Buy Me Coffee
    </button>
  );
};
