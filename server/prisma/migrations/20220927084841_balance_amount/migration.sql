/*
  Warnings:

  - You are about to drop the column `balance` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "balance",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
