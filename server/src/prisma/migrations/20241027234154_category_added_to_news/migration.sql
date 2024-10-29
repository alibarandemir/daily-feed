/*
  Warnings:

  - You are about to drop the `_CategoryToNews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToNews" DROP CONSTRAINT "_CategoryToNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToNews" DROP CONSTRAINT "_CategoryToNews_B_fkey";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToNews";

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
