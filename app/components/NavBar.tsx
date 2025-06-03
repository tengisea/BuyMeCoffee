"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <Button
        className="flex justify-start"
        variant="outline"
        onClick={() => router.push("/")}>
        Home
      </Button>
      <Button
        className="flex justify-start"
        variant="outline"
        onClick={() => router.push("/explore")}>
        Explore
      </Button>

      <Button
        className="flex justify-start"
        variant="outline"
        onClick={() => router.push("/account-settings")}>
        Account settings
      </Button>
    </div>
  );
};
