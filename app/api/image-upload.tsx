"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Camera } from "lucide-react";

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const form = new FormData();
    form.append("upload_preset", "food-delivery");
    form.append("file", selectedFile);
    form.append("folder", "food-delivery");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drdp3z5so/image/upload",
      { method: "POST", body: form }
    );

    const parsed = await response.json();
    console.log("Uploaded image URL:", parsed.secure_url);
  };

  return (
    <div className="relative w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <label
        onClick={() => fileInputRef.current?.click()} onChange={handleUpload}
        className="w-40 h-40 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Camera className="w-6 h-6" />
        )}
      </label>
    </div>
  );
};
