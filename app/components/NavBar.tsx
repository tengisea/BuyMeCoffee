"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        className={cn(
          "flex justify-start px-4 py-2 w-58 h-9",
          currentPath === "/" && "bg-[#F4F4F5] "
        )}
        variant="outline"
        onClick={() => router.push("/")}>
        Home
      </Button>
      <Button
        className={cn(
          "flex justify-start px-4 py-2 w-58 h-9",
          currentPath === "/explore" && "bg-[#F4F4F5] "
        )}
        variant="outline"
        onClick={() => router.push("/explore")}>
        Explore
      </Button>

      <Button
        className={cn(
          "flex justify-start px-4 py-2 w-58 h-9",
          currentPath === "/account-settings" && "bg-[#F4F4F5] "
        )}
        variant="outline"
        onClick={() => router.push("/account-settings")}>
        Account settings
      </Button>
    </div>
  );
};
