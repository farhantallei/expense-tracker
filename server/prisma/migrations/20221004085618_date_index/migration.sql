/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `month` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "month" SMALLINT NOT NULL,
ADD COLUMN     "year" SMALLINT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" SMALLINT NOT NULL,
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("userId", "year", "month", "date");

-- CreateIndex
CREATE INDEX "InAndOut_userId_year_month_date_idx" ON "InAndOut"("userId", "year", "month", "date");
