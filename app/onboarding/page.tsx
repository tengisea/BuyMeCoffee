"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NewProfile from "../components/NewProfile";
import AddBankCardProfile from "../components/AddBankCard";
import { Loading } from "../components";

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const StepsComponents = [NewProfile, AddBankCardProfile, Loading][currentStep];

  return (
    <div className="flex justify-center items-center mt-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}>
          <StepsComponents
            currentStep={currentStep}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
