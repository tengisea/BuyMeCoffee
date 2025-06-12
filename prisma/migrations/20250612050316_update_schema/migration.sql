/*
  Warnings:

  - Added the required column `donorName` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "donorName" TEXT NOT NULL,
ALTER COLUMN "donorId" DROP NOT NULL;
