/*
  Warnings:

  - Added the required column `month` to the `InAndOut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `InAndOut` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `InAndOut` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "InAndOut" ADD COLUMN     "createdAt" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "month" SMALLINT NOT NULL,
ADD COLUMN     "year" SMALLINT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" SMALLINT NOT NULL;
