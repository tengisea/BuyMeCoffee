"use client"

import { SignUp } from "@clerk/nextjs";
import Image from "next/legacy/image";
import { Logo } from "../Button";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-[#FBBF24]">
        <div className="pl-10 pt-5">
          <Logo />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <Image
            src="/illustration.svg"
            alt="Clerk Logo"
            width={240}
            height={240}
            className="mb-5"
          />
          <h2 className="text-3xl font-bold bg-[#FBBF24]">
            Fund your creative work
          </h2>
          <h1 className="text-lg  bg-[#FBBF24]">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </h1>
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="flex justify-end pr-10 pt-5">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/sign-in")}>
            Sign In
          </Button>
        </div>
        <div className="flex items-center justify-center h-full">
          <SignUp routing="hash" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
