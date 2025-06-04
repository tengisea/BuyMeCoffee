"use client";

import Form from "next/form";
import { createProfile } from "../actions/CreateProfile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "../api";
import { useActionState } from "react";
import { ZodErrors } from "./ZodError";
import { object } from "zod/v4";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: { avatarImage: [], name: [], about: [], socialMediaURL: [] },
};

export default function NewProfile({ nextStep }: ProfileStepProps) {
  const [formState, formAction] = useActionState(createProfile, INITIAL_STATE);

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
    if (!Object.values(formState?.ZodError).filter((item) => item.length)) {
      nextStep();
    }
  };

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form action={handleSubmit} className="space-y-6">
        <label htmlFor="avatarImage" className="block text-lg mb-3 font-medium">
          Add photo
        </label>

        <div className="relative w-full">
          <ImageUpload />
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
            placeholder="Write about yourself here"
            className="min-h-20"
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

        <Button type="submit">Continue</Button>
      </Form>
    </div>
  );
}
