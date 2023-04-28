/*
  Warnings:

  - You are about to drop the `user_bookmark_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Bookmark_Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_bookmark_category" DROP CONSTRAINT "user_bookmark_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "user_bookmark_category" DROP CONSTRAINT "user_bookmark_category_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark_Category" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_bookmark_category";

-- AddForeignKey
ALTER TABLE "Bookmark_Category" ADD CONSTRAINT "Bookmark_Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
