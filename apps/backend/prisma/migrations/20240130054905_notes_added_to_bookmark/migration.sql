/*
  Warnings:

  - You are about to drop the `Category_Blog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category_Blog" DROP CONSTRAINT "Category_Blog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Category_Blog" DROP CONSTRAINT "Category_Blog_categoryId_fkey";

-- DropTable
DROP TABLE "Category_Blog";

-- CreateTable
CREATE TABLE "Bookmark_Category_Blog" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_Category_Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookmark_Category_Blog" ADD CONSTRAINT "Bookmark_Category_Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Bookmark_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark_Category_Blog" ADD CONSTRAINT "Bookmark_Category_Blog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
