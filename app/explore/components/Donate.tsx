"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createDonation } from "@/app/actions/createDonation";
import { Input, Button } from "@/components/ui";
import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import ThankDonateDialog from "./ThankDonateDialog";
import QrDialog from "./QrDialog";

type DonateProps = {
  profile: {
    id: number;
    name: string;
    userId: string;
    avatarImage: string;
    successMessage: string;
  };
};

export default function DonateForm({ profile }: DonateProps) {
  const { user } = useUser();
  const router = useRouter();
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showThanksDialog, setShowThanksDialog] = useState(false);
  const [donationUrl, setDonationUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountToUse = customAmount ?? 1;
    const qrText = `https://buymeacoffee.com/${profile.userId}?amount=${amountToUse}`;

    setDonationUrl(qrText);
    setIsDialogOpen(true);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("donorId", user?.id || "anonymous");
    formData.append("donorName", user?.username || "Anonymous");
    formData.append("recipent", profile.userId);
    formData.append("recipentId", profile.id.toString());
    formData.append("amount", amountToUse.toString());
    formData.append("sspecialURLOrBuyMeACoffeeURL", url);
    formData.append("specialMessage", message);

    const response = await createDonation(formData);

    if (response && response.data) {
      setCustomAmount(null);
      setUrl("");
      setMessage("");
    }

    setIsSubmitting(false);
  };

  const handleReturnToExplore = () => {
    setShowThanksDialog(false);
    router.push("/explore");
  };

  const handleDonate = async () => {
    setIsSubmitting(true);}

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded p-6 bg-opacity-90 shadow-lg">
        <div>
          <label>Select amount:</label>
          <div className="flex gap-2 mt-2 items-center">
            {[1, 2, 5, 10].map((amt) => (
              <button
                type="button"
                key={amt}
                className={`flex items-center gap-1 p-2 rounded border ${
                  customAmount === amt ? "bg-blue-200" : "bg-gray-100"
                }`}
                onClick={() => setCustomAmount(amt)}
                disabled={isSubmitting}>
                <Coffee size={16} /> ${amt}
              </button>
            ))}
            <input
              type="number"
              name="amount"
              placeholder="Custom"
              value={customAmount ?? ""}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="w-20 px-2 py-2 border rounded"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label>Social/BMC URL</label>
          <Input
            name="sspecialURLOrBuyMeACoffeeURL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://buymeacoffee.com/..."
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Special Message</label>
          <Input
            name="specialMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Thanks for inspiring me!"
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Support"}
        </Button>
      </form>
      <QrDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setShowThanksDialog(true);
        }}
        profile={{ userId: profile.userId }}
        amountToUse={customAmount ?? 1}
        onDonate={handleDonate} // donation function-ийг дамжуулж байна
      />

      <ThankDonateDialog
        open={showThanksDialog}
        onClose={() => setShowThanksDialog(false)}
        onNavigate={handleReturnToExplore}
        profile={profile}
      />
    </>
  );
}
