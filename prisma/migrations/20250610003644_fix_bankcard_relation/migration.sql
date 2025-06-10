/*
  Warnings:

  - You are about to drop the column `profileId` on the `BankCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `BankCard` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `recipentId` on the `Donation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BankCard" DROP CONSTRAINT "BankCard_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_id_fkey";

-- DropIndex
DROP INDEX "BankCard_profileId_key";

-- AlterTable
ALTER TABLE "BankCard" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "recipentId",
ADD COLUMN     "recipentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankCard_userId_key" ON "BankCard"("userId");

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_recipentId_fkey" FOREIGN KEY ("recipentId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
