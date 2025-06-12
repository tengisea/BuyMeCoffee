"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/actions";

const AccountSettings = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateUser(form);

    if (result?.success) {
      setMessage("Account updated successfully!");
      router.refresh(); // Хэрэглэгчийн шинэчлэлт UI дээр гарч ирнэ
    } else {
      setMessage("Something went wrong.");
    }
  };
  
  export const UpdateAccount = () => {
    return (
      <div className="max-w-xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="mb-4">
            <label className="block" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>
      </div>
    );
  };
};
