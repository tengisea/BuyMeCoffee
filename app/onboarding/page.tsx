"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import NewProfile from "../components/NewProfile";
import AddBankCardProfile from "../components/AddBankCard";
import StepThree from "../components/StepThree";
import { Loading } from "../components";

export default function OnboardingComponent() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => {
      if (prev < stepsArray.length - 1) return prev + 1;
      return prev;
    });
  };

  const previousStep = () => setCurrentStep((prev) => prev - 1);

  const stepsArray = [NewProfile, AddBankCardProfile, 
    StepThree, 
    Loading];
  const StepsComponent = stepsArray[currentStep];

  if (!StepsComponent) {
    return <div>Component for step {currentStep} is not found.</div>;
  }

  return (
    <div className="flex justify-center items-center mt-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}>
          <StepsComponent
            currentStep={currentStep}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
