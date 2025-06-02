import prisma from "@/lib/prisma"; // server-д байгаа, client-д ашиглахгүй
import Form from "next/form";

export const AddBankCard = () => {
  async function addBankCard(formData: FormData) {
    "use server";
    const cardNumber = formData.get("cardNumber") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const country = formData.get("country") as string;
    const expiryDate = formData.get("expiryDate") as string;

    await prisma.bankCard.create({
      data: {
        cardNumber,
        firstName,
        lastName,
        country,
        expiryDate,
      },
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add new card</h1>
      <Form action={addBankCard} className="space-y-6">
        <div>
          <label htmlFor="cardNumber" className="block text-lg mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter card number"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label htmlFor="firstName" className="block text-lg mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label htmlFor="lastName" className="block text-lg mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label htmlFor="country" className="block text-lg mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label htmlFor="expiryDate" className="block text-lg mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          Add card
        </button>
      </Form>
    </div>
  );
};
