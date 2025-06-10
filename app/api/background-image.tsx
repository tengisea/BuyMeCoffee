"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Camera } from "lucide-react";

type Props = {
  onUpload: (url: string) => void;
};

export const BackgroundImage = ({ onUpload }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    const form = new FormData();
    form.append("upload_preset", "food-delivery");
    form.append("file", file);
    form.append("folder", "food-delivery");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drdp3z5so/image/upload",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await response.json();
    onUpload(data.secure_url);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <label
        onClick={() => fileInputRef.current?.click()}
        className="w-400 h-150 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Camera className="w-10 h-10" />
        )}
      </label>
    </>
  );
};
