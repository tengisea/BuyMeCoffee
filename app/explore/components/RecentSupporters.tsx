import React from "react";

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
  // recipentProfile: {
  //   avatarImage: string;
  // };
};

export default function RecentSupporters({
  donations,
}: {
  donations: Donation[];
}) {
  if (donations.length === 0) {
    return <p className="text-sm text-gray-500">No supporters yet.</p>;
  }

  return (
    <div className="space-y-4">
      {donations.slice(0, 5).map((donation) => (
        <div
          key={donation.id}
          className="flex gap-2">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              {/* {donation.recipentProfile ? (
                <img
                  src={donation.recipentProfile.avatarImage}
                  alt={donation.donorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : ( */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  {donation.donorName.charAt(0)}
                </div>
              {/* )} */}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">
                {donation.donorName} bought ${donation.amount} coffee
              </span>
              <div className="text-sm italic text-gray-700">
                {donation.specialMessage}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
