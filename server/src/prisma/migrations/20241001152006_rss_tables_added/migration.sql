/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `sourceLink` on the `Source` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_categoryId_fkey";

-- DropIndex
DROP INDEX "Source_sourceLink_key";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "categoryId",
DROP COLUMN "sourceLink";

-- CreateTable
CREATE TABLE "RssFeed" (
    "id" SERIAL NOT NULL,
    "rssUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "sourceId" INTEGER NOT NULL,

    CONSTRAINT "RssFeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RssFeed_rssUrl_key" ON "RssFeed"("rssUrl");

-- AddForeignKey
ALTER TABLE "RssFeed" ADD CONSTRAINT "RssFeed_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
