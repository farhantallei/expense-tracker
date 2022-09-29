/*
  Warnings:

  - Made the column `name` on table `InAndOut` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InAndOut" ALTER COLUMN "name" SET NOT NULL;
