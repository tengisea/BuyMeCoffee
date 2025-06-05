"use client";

import Form from "next/form";
import { Input, Label, Button } from "@/components/ui";
import { useActionState } from "react";
import { ZodErrors } from "./ZodError";
import { addBankCard } from "../actions/AddBankCard";
import { FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";
import countries from "world-countries";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: {
    cardNumber: [],
    firstName: [],
    lastName: [],
    country: [],
    expiryData: [],
  },
};

const FormSchema = z.object({
  country: z.string({
    required_error: "Please select a country",
  }),
});

const countryOptions = countries.map((country) => ({
  value: country.name.common,
  label: country.name.common,
}));

export default function AddBankCardProfile({ nextStep }: ProfileStepProps) {
  const [formState, formAction] = useActionState(addBankCard, INITIAL_STATE);

  const handleSubmit = () => {
    nextStep();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add new card</h1>
      <Form action={formAction} className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="country" className="block text-lg mb-2">
              Select country
            </Label>

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
                  onChange={(selectedOption) => {
                    const value = selectedOption?.value ?? "";
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
            <div>
              <Label htmlFor="firstName" className="block text-lg mb-2">
                First Name
              </Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <ZodErrors error={formState?.ZodError?.firstName} />
            </div>

            <div>
              <Label htmlFor="lastName" className="block text-lg mb-2">
                Last Name
              </Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <ZodErrors error={formState?.ZodError?.lastName} />
            </div>
          </div>

          <div>
            <Label htmlFor="cardNumber" className="block text-lg mb-2">
              Enter card number
            </Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <ZodErrors error={formState?.ZodError?.cardNumber} />
          </div>

          <div>
            <Label htmlFor="expiryDate" className="block text-lg mb-2">
              Expiry Date
            </Label>
            <Input
              type="month"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ZodErrors error={formState?.ZodError?.expiryDate} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="py-3 w-1/2 rounded-lg hover:bg-blue-600">
            Add card
          </Button>
        </div>
      </Form>
    </div>
  );
}
