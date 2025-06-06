"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import countries from "world-countries";
import { Input, Label, Button } from "@/components/ui";
import { FormField } from "@/components/ui/form";
import { ZodErrors } from "./ZodError";
import { addBankCard } from "../actions/AddBankCard";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

type FormState = {
  ZodError: {
    country?: string[];
    firstName?: string[];
    lastName?: string[];
    cardNumber?: string[];
    expiryDate?: string[];
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

const countryOptions = countries.map((country) => ({
  value: country.name.common,
  label: country.name.common,
}));

const schema = z.object({
  country: z.string().min(2, "Please select a country"),
});

export default function AddBankCardProfile({
  nextStep,
  previousStep,
}: ProfileStepProps) {
  const [formState, formAction] = React.useActionState<FormState, FormData>(
    addBankCard,
    INITIAL_STATE
  );
  const [cardNumber, setCardNumber] = useState("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const noErrors = Object.values(formState?.ZodError || {}).every(
      (fieldErrors) => !fieldErrors || fieldErrors.length === 0
    );

    if (noErrors && formState?.data?.success) {
      nextStep();
    }
  }, [formState]);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1-") 
      .slice(0, 19);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add new card</h1>

      <form action={formAction} className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="country">Select country</Label>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <Select
                  name="country"
                  options={countryOptions}
                  value={countryOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(option) => {
                    const value = option?.value ?? "";
                    field.onChange(value);
                  }}
                  placeholder="Select a country"
                  isClearable
                />
              )}
            />
            <ZodErrors error={formState?.ZodError?.country} />
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
              />
              <ZodErrors error={formState?.ZodError?.firstName} />
            </div>
            <div className="w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
              />
              <ZodErrors error={formState?.ZodError?.lastName} />
            </div>
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>

            <Input
              name="cardNumber"
              id="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
            <ZodErrors error={formState?.ZodError?.cardNumber} />
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input name="expiryDate" id="expiryDate" type="month" />
            <ZodErrors error={formState?.ZodError?.expiryDate} />
          </div>
        </div>

        <div className="flex gap-2 justify-between">
          <Button type="button" onClick={previousStep}>
            Back
          </Button>
          <Button type="submit">Add Card</Button>
        </div>
      </form>
    </div>
  );
}
