export type Profile = {
  id: number;
  userId: string;
  email: string;
  name: string;
  about: string;
  avatarImage: string;
  receivedDonations: Donation[]; // Энэ нь тусдаа `Donation` төрөл шаардана
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  bankCard?: BankCard; // Nullable
  createdAt: string; // Prisma DateTime → string
  updatedAt: string;
};
export type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  sspecialURLOrBuyMeACoffeeURL: string;
  donorId: string;
  recipent: string;
  recipentId: string;
  createdAt: string;
  updatedAt: string;
  recipientProfile?: Profile; // Хэрэв relation буцааж ирдэг бол
};
export type BankCard = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  userId: string;
  profileId?: number;
  profile?: Profile;
  createdAt: string;
  updatedAt: string;
};
  