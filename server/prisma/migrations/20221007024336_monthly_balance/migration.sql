-- CreateTable
CREATE TABLE "MonthlyBalance" (
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "year" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,

    CONSTRAINT "MonthlyBalance_pkey" PRIMARY KEY ("userId","year","month")
);

-- AddForeignKey
ALTER TABLE "MonthlyBalance" ADD CONSTRAINT "MonthlyBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
