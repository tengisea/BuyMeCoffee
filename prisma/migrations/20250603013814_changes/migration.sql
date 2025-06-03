/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BankCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipentId` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankCard" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "recipentId" TEXT NOT NULL,
ALTER COLUMN "donorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_id_fkey" FOREIGN KEY ("id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
