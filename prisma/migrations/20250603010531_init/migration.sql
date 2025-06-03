/*
  Warnings:

  - You are about to drop the column `userId` on the `BankCard` table. All the data in the column will be lost.
  - You are about to drop the column `recipentId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `BankCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipent` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BankCard" DROP CONSTRAINT "BankCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_recipentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_fkey";

-- DropIndex
DROP INDEX "BankCard_userId_key";

-- AlterTable
ALTER TABLE "BankCard" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER;

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "recipentId",
ADD COLUMN     "recipent" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "BankCard_profileId_key" ON "BankCard"("profileId");

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
