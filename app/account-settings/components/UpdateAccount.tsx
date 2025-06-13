"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/actions";
import { Button, Input, Label } from "@/components/ui";
import { ImageUpload } from "@/app/api";
import { useEffect } from "react";
import { z } from "zod";
import { ZodErrors } from "@/app/components";

export const UpdateAccount = () => {
  const [form, setForm] = useState({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });
  const [message, setMessage] = useState("");
  const [avatarImageUrl, setAvatarImageUrl] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const accountSchema = z.object({
    name: z.string().min(1, "Name is required"),
    about: z.string().min(1),
    socialMediaURL: z.string().url("Invalid URL").optional(),
    avatarImage: z.string().min(1, "Avatar image is required"),
  });

  useEffect(() => {
    if (avatarImageUrl && form.avatarImage !== avatarImageUrl) {
      setForm((prev) => ({ ...prev, avatarImage: avatarImageUrl }));
    }
  }, [avatarImageUrl]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/getAccountInfo");
      
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
        setForm({
          name: data.name || "",
          about: data.about || "",
          socialMediaURL: data.socialMediaURL || "",
          avatarImage: data.avatarImage || "",
        });
        setAvatarImageUrl(data.avatarImage || "");
      }
    };
    fetchUser();
  }, []);
  const [hasZodError, setHasZodError] = useState(false);

  useEffect(() => {
    const result = accountSchema.safeParse(form);
    setHasZodError(!result.success);
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasZodError) {
      setMessage("Please fix validation errors before submitting.");
      return;
    }
    const result = await updateUser({
      ...form,
      avatarImageUrl: avatarImageUrl,
    });

    if (result?.success) {
      setMessage("Account updated successfully!");
      router.refresh();
    } else {
      setMessage("Something went wrong.");
    }
  };

  const parseResult = accountSchema.safeParse(form);

  return (
    <div className="w-142 mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">My account</h2>
        <div className="p-6 rounded border-1 flex flex-col gap-6">
          <div className="font-bold">Personal Info</div>
            <div className="flex flex-col gap-3">
            <Label htmlFor="avatarImage">Add photo</Label>
            <ImageUpload
              onUpload={(url) => {
              setAvatarImageUrl(url);
                }}
              />
              {!avatarImageUrl && (
                <ImageUpload
                onUpload={(url) => {
                  setAvatarImageUrl(url);
                }}
                />
              )}
            {/* Preview image if avatarImageUrl exists */}
            {avatarImageUrl && (
              <img
              src={avatarImageUrl}
              alt="Avatar preview"
              className="w-40 h-40 rounded-full object-cover mt-2 border"
              />
            )}
            <input type="hidden" name="avatarImageUrl" value={avatarImageUrl} />
            <ZodErrors
              error={
              !parseResult.success
                ? accountSchema.safeParse(form).error?.formErrors?.fieldErrors
                  ?.avatarImage
                : undefined
              }
            />
            </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <ZodErrors
              error={
                !parseResult.success
                  ? accountSchema.safeParse(form).error?.formErrors?.fieldErrors
                      ?.name
                  : undefined
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about">About</Label>
            <Input
              type="text"
              id="about"
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Write about yourself"
              className="w-full border rounded px-3 py-2"
            />
            <ZodErrors
              error={
                !parseResult.success
                  ? accountSchema.safeParse(form).error?.formErrors?.fieldErrors
                      ?.about
                  : undefined
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="socialMediaURL">Social media URL</Label>
              <Input
                type="text"
                id="socialMediaURL"
                name="socialMediaURL"
                placeholder="https://"
                value={form.socialMediaURL}
                onChange={handleChange}
              />
              <ZodErrors
                error={
                  !accountSchema.safeParse(form).success
                    ? accountSchema.safeParse(form).error?.formErrors
                        ?.fieldErrors?.socialMediaURL
                    : undefined
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            className="px-4 py-2 rounded"
            disabled={!avatarImageUrl}>
            Save changes
          </Button>
        </div>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </div>
  );
};
