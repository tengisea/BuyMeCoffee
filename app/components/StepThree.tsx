"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "./ZodError";
import { BackgroundImage } from "../api";
import { createAdditionalProfileData } from "../actions/createAdditionalProfileData";

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
  data?: {
    success: boolean;
  };
};

const INITIAL_STATE: FormState = {
  ZodError: {},
  message: "",
  data: undefined,
};

export default function StepThree({ nextStep }: ProfileStepProps) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const profileReducer = async (
    _state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    return await createAdditionalProfileData(formData);
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    profileReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const noErrors = Object.values(formState?.ZodError || {}).every(
      (fieldErrors) => !fieldErrors || fieldErrors.length === 0
    );

    if (noErrors && formState?.data?.success) {
      nextStep();
    }
  }, [formState]);

  return (
    <div className="w-127 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Customize Your Profile</h3>

      <Form action={formAction} className="space-y-6">

        <div className="flex flex-col gap-2">
          <Label>Upload Background Image</Label>
          <BackgroundImage onUpload={(url) => setBackgroundImageUrl(url)} />
          <input
            type="hidden"
            name="backgroundImageUrl"
            value={backgroundImageUrl}
          />
          <ZodErrors error={formState?.ZodError?.backgroundImageUrl} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="successMessage">Success Message</Label>
          <Input
            id="successMessage"
            name="successMessage"
            placeholder="Thanks for your support!"
          />
          <ZodErrors error={formState?.ZodError?.successMessage} />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="py-3 w-1/2 rounded-lg"
            disabled={!backgroundImageUrl}>
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
