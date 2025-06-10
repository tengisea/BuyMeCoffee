"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";
import { createProfile } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "./ZodError";
import { ImageUpload } from "../api";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
};

type FormState = {
  ZodError: {
    name?: string[];
    about?: string[];
    socialMediaURL?: string[];
    avatarImageUrl?: string[];
  };
  message: string;
  data?: {
    success: boolean;
  };
};

const INITIAL_STATE: FormState = {
  data: undefined,
  message: "",
  ZodError: {},
};

export default function NewProfile({ nextStep }: ProfileStepProps) {
  const profileReducer = async (
    _state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    return await createProfile(formData);
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    profileReducer,
    INITIAL_STATE
  );
  const [avatarImageUrl, setAvatarImageUrl] = useState("");

  useEffect(() => {
    const noErrors = Object.values(formState?.ZodError || {}).every(
      (fieldErrors) => !fieldErrors || fieldErrors.length === 0
    );

    if (noErrors && formState?.data?.success) {
      nextStep();
    }
  }, [formState]);

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form action={formAction} className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label>Add photo</Label>

          <ImageUpload
            onUpload={(url) => {
              setAvatarImageUrl(url);
            }}
          />

          <input type="hidden" name="avatarImageUrl" value={avatarImageUrl} />
          <ZodErrors error={formState?.ZodError?.avatarImageUrl} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here"
          />
          <ZodErrors error={formState?.ZodError?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="about">About</Label>
          <Input
            type="text"
            id="about"
            name="about"
            placeholder="Write about yourself"
          />
          <ZodErrors error={formState?.ZodError?.about} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="socialMediaURL">Social media URL</Label>
          <Input
            type="text"
            id="socialMediaURL"
            name="socialMediaURL"
            placeholder="https://"
          />
          <ZodErrors error={formState?.ZodError?.socialMediaURL} />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="py-3 w-1/2 rounded-lg"
            disabled={!avatarImageUrl}>
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
