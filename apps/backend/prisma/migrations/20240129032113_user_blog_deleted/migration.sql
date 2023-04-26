/*
  Warnings:

  - You are about to drop the `user_blog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_blog" DROP CONSTRAINT "user_blog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "user_blog" DROP CONSTRAINT "user_blog_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_blog";

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
