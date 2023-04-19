/*
  Warnings:

  - You are about to drop the `Blog_Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Bookmark_Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Blog_Topic" DROP CONSTRAINT "Blog_Topic_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Blog_Topic" DROP CONSTRAINT "Blog_Topic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "User_Bookmark_Category" DROP CONSTRAINT "User_Bookmark_Category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User_Bookmark_Category" DROP CONSTRAINT "User_Bookmark_Category_userId_fkey";

-- DropTable
DROP TABLE "Blog_Topic";

-- DropTable
DROP TABLE "User_Bookmark_Category";

-- CreateTable
CREATE TABLE "blog_topic" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bookmark_category" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_bookmark_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_token_userId_key" ON "User_token"("userId");

-- AddForeignKey
ALTER TABLE "blog_topic" ADD CONSTRAINT "blog_topic_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_topic" ADD CONSTRAINT "blog_topic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmark_category" ADD CONSTRAINT "user_bookmark_category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmark_category" ADD CONSTRAINT "user_bookmark_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Bookmark_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
