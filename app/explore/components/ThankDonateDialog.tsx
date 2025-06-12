"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";

type ThankDonateDialogProps = {
  profile: {
    id: number;
    name: string;
    userId: string;
    avatarImage: string;
    successMessage: string;
  };
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
};

export default function ThankDonateDialog({
  profile,
  open,
  onClose,
  onNavigate,
}: ThankDonateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5 pb-8">
              <div className="p-4 bg-[#18BA51] w-16 h-16 rounded-full flex justify-center items-center">
                <CheckCircle2 size={28} color="white" />
              </div>
              <div>Donation Complete!</div>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="border-1 rounded p-3">
              <div className="flex gap-2 items-center">
                <img
                  src={profile.avatarImage}
                  alt={profile.name}
                  className="rounded-full my-4"
                  width={32}
                  height={32}
                />
                <div className="font-semibold text-black">{profile.name}:</div>
              </div>
              <div className="text-black">{profile.successMessage}</div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onNavigate}>Return to Explore</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
