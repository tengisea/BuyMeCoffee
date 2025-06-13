"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Donation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  specialMessage: string;
  sspecialURLOrBuyMeACoffeeURL: string;
  donorId: string | null;
  donorName: string;
  recipent: string;
  recipentId: number;
};

const amountFilters = [
  { label: "All", value: 0 },
  { label: "Above $5", value: 5 },
  { label: "Above $10", value: 10 },
];

export default function RecentSupporters({
  donations,
}: {
  donations: Donation[];
}) {
  const [selectedAmount, setSelectedAmount] = useState(0);

  const filtered = donations
    .filter((donation) => donation.amount > selectedAmount)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label>Filter by amount:</Label>
        <select
          className="border rounded px-2 py-1"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}>
          {amountFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          No supporters found for this filter.
        </p>
      ) : (
        filtered.map((donation) => (
          <div key={donation.id} className="flex gap-2 border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                {donation.donorName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {donation.donorName} bought ${donation.amount} coffee
                </span>
                {donation.specialMessage && (
                  <div className="text-sm italic text-gray-700">
                    “{donation.specialMessage}”
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
