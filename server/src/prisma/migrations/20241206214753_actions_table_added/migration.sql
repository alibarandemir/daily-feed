/*
  Warnings:

  - Added the required column `type` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('UPVOTE', 'DOWNVOTE', 'SAVE');

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_newsId_fkey";

-- AlterTable
ALTER TABLE "Votes" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "newsId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "theme" TEXT,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNewsActions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "newsId" INTEGER NOT NULL,
    "actionType" "ActionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNewsActions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("link") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNewsActions" ADD CONSTRAINT "UserNewsActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNewsActions" ADD CONSTRAINT "UserNewsActions_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
