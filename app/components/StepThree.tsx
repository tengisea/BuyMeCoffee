"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "./ZodError";
import { BackgroundImage } from "../api";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

type FormState = {
  ZodError: {
    backgroundImageUrl?: string[];
    successMessage?: string[];
  };
  message: string;
};

export default function StepThree({ nextStep }: ProfileStepProps) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formState, setFormState] = useState<FormState>({
    ZodError: {},
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/additional-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ backgroundImageUrl, successMessage }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setFormState({ ZodError: {}, message: "Success" });
      nextStep();
    } else {
      setFormState({
        ZodError: data.errors || {},
        message: data.error || "Something went wrong",
      });
    }
  };

  return (
    <div className="w-127 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Customize Your Profile</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label>Upload Background Image</Label>
          <BackgroundImage onUpload={(url) => setBackgroundImageUrl(url)} />
          <input
            type="hidden"
            name="backgroundImageUrl"
            value={backgroundImageUrl}
          />
          <ZodErrors error={formState.ZodError.backgroundImageUrl} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="successMessage">Success Message</Label>
          <Input
            id="successMessage"
            name="successMessage"
            placeholder="Thanks for your support!"
            value={successMessage}
            onChange={(e) => setSuccessMessage(e.target.value)}
          />
          <ZodErrors error={formState.ZodError.successMessage} />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="py-3 w-1/2 rounded-lg"
            disabled={!backgroundImageUrl}>
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
