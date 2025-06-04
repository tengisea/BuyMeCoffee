"use client";

import Form from "next/form";
import { Input, Label, Button } from "@/components/ui";
import { useActionState } from "react";
import { ZodErrors } from "./ZodError";
import { addBankCard } from "../actions/AddBankCard";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: { cardNumber: [], firstName: [], lastName: [], country: [], expiryData: [] },
};

export default function AddBankCardProfile({ nextStep }: ProfileStepProps) {
  const [formState, formAction] = useActionState(addBankCard, INITIAL_STATE);

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add new card</h1>
      <Form action={formAction} className="space-y-6">
        <div>
          <Label htmlFor="cardNumber" className="block text-lg mb-2">
            Card Number
          </Label>
          <Input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter card number"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <ZodErrors error={formState?.ZodError?.cardNumber} />

          <Label htmlFor="firstName" className="block text-lg mb-2">
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <ZodErrors error={formState?.ZodError?.firstName} />

          <Label htmlFor="lastName" className="block text-lg mb-2">
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <ZodErrors error={formState?.ZodError?.lastName} />

          <Label htmlFor="country" className="block text-lg mb-2">
            Country
          </Label>
          <Input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <ZodErrors error={formState?.ZodError?.country} />

          <Label htmlFor="expiryDate" className="block text-lg mb-2">
            Expiry Date
          </Label>
          <Input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <ZodErrors error={formState?.ZodError?.expiryDate} />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          Add card
        </Button>
      </Form>
    </div>
  );
};
