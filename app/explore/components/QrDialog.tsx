"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { useQRCode } from "next-qrcode";

type QrDialogProps = {
  profile: {
    userId: string;
  };
  amountToUse: number;
  open: boolean;
  onClose: () => void;
  onDonate: () => void; 
};

export default function QrDialog({
  profile,
  amountToUse,
  open,
  onClose,
  onDonate, 
}: QrDialogProps) {
  const { Image } = useQRCode();

  const donationUrl = `https://buymeacoffee.com/${profile.userId}?amount=${amountToUse}`;

  const handleClick = () => {
    onDonate();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan QR code</DialogTitle>
          <DialogDescription>Scan to complete your donation</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center my-4">
          <div className="relative w-fit p-4">
            <Image
              text={donationUrl}
              options={{
                type: "image/jpeg",
                quality: 0.8,
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 6,
                width: 200,
                color: {
                  dark: "#000",
                  light: "#fff",
                },
              }}
            />
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded border-[#A0A4A9]" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 rounded border-[#A0A4A9]" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 rounded border-[#A0A4A9]" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded border-[#A0A4A9]" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>I’ve donated</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
