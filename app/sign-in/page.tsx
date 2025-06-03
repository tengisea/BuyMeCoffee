import { SignIn } from '@clerk/nextjs';
import Image from 'next/legacy/image';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex flex-col gap-5 items-center justify-center bg-[#FBBF24]">
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
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </h1>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;