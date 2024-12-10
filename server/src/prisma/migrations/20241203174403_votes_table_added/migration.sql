-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN,
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "newsId" INTEGER NOT NULL,
    "vote" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
