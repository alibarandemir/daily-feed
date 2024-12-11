/*
  Warnings:

  - You are about to drop the column `vote` on the `Votes` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Preferences` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `newsId` on the `Votes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_newsId_fkey";

-- AlterTable
ALTER TABLE "Preferences" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "showVotePopup" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showWelcomeMessagePopup" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Votes" DROP COLUMN "vote",
DROP COLUMN "newsId",
ADD COLUMN     "newsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
