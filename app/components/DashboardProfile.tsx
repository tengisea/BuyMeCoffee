"use client";

import { Button, Combobox } from "@/components/ui";
import { useUser } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import Image from "next/legacy/image";

export const DashboardProfile = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col p-6 border-1 border-[#E4E4E7] rounded-lg">
      <div className="flex justify-between items-start self-stretch border-b-1 pb-4">
        <div>
          <Image
            src={user?.imageUrl || "/illustration.svg"}
            alt=""
            width={48}
            height={48}
          />
          <div>
            <p className="font-bold">{user?.username}</p>
            <p className="text-xs">{user?.emailAddresses?.[0]?.emailAddress}</p>
          </div>
        </div>
        <Button>
          <Copy />
          Share page link
        </Button>
      </div>
      <div className="py-4 border-b-1 flex flex-col gap-6">
        <div className="flex">
          <div className="text-xl font-semibold">Earnings</div>
          <Combobox />
        </div>
        <div></div>
      </div>
    </div>
  );
};
