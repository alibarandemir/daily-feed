-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserNewsActions" DROP CONSTRAINT "UserNewsActions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_userId_fkey";

-- DropForeignKey
ALTER TABLE "savedNews" DROP CONSTRAINT "savedNews_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserCategory" ADD CONSTRAINT "UserCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedNews" ADD CONSTRAINT "savedNews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNewsActions" ADD CONSTRAINT "UserNewsActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
