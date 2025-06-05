// "use client";

// import Form from "next/form";
// import { createProfile } from "../actions/CreateProfile";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageUpload } from "../api";
// import { useActionState, useEffect } from "react";
// import { ZodErrors } from "./ZodError";

// type ProfileStepProps = {
//   currentStep: number;
//   nextStep: () => void;
//   previousStep: () => void;
// };

// const INITIAL_STATE = {
//   data: null,
//   message: "",
//   ZodError: { avatarImage: [], name: [], about: [], socialMediaURL: [] },
// };

// export default function NewProfile({ nextStep }: ProfileStepProps) {
//   const [formState, formAction] = useActionState(createProfile, INITIAL_STATE);

//   const handleSubmit = (formData: FormData) => {
//     formAction(formData);
//     if (!Object.values(formState?.ZodError).filter((item) => item.length)) {
//       nextStep();
//     }
//   };

//   useEffect(() => {
//     const noErrors = Object.values(formState?.ZodError || {}).every(
//       (fieldErrors) => fieldErrors.length === 0
//     );

//     if (noErrors && formState?.data) {
//       nextStep(); // ✅ зөв бөглөгдвөл дараагийн алхам руу орно
//     }
//   }, [formState]);

//   // const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
//   //   event.preventDefault();
//   //   // formAction(formData);
//   //   // if (ZodErrors.length === 0 ) {
//   //     nextStep();
//   //   // }
//   // };

//   return (
//     <div className="w-127 w-max-168 flex flex-col gap-6">
//       <h3 className="font-semibold text-2xl">Complete your profile page</h3>
//       <Form action={formAction} className="space-y-6">
//         <label htmlFor="avatarImage" className="block text-lg mb-3 font-medium">
//           Add photo
//         </label>

//         <div className="relative w-full">
//           <ImageUpload />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your name here"
//           />
//           <ZodErrors error={formState?.ZodError?.name} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="about">About</Label>
//           <Input
//             type="text"
//             id="about"
//             name="about"
//             placeholder="Write about yourself here"
//             className="min-h-20"
//           />
//           <ZodErrors error={formState?.ZodError?.about} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="socialMediaURL">Social media URL</Label>
//           <Input
//             type="text"
//             id="socialMediaURL"
//             name="socialMediaURL"
//             placeholder="https://"
//           />
//           <ZodErrors error={formState?.ZodError?.socialMediaURL} />
//         </div>

//         <div className="flex justify-end">
//           <Button
//             type="submit"
//             className="py-3 w-1/2 rounded-lg hover:bg-blue-600">
//             Continue
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import Form from "next/form";
import { createProfile } from "../actions/CreateProfile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "../api";
import { useActionState } from "react";
import { ZodErrors } from "./ZodError";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
};

type FormState = {
  ZodError: {
    name?: string[];
    about?: string[];
    socialMediaURL?: string[];
    avatarImage?: string[];
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
  const [formState, formAction] = useActionState<FormState, FormData>(
    createProfile,
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
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form action={formAction} className="space-y-6">
        <label htmlFor="avatarImage" className="block text-lg mb-3 font-medium">
          Add photo
        </label>

        <div className="relative w-full">
          <ImageUpload />
          <ZodErrors error={formState?.ZodError?.avatarImage} />
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

        <div className="flex justify-end">
          <Button
            type="submit"
            className="py-3 w-1/2 rounded-lg">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
