/*
  Warnings:

  - You are about to drop the `blog_topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `banner_img` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blog_topic" DROP CONSTRAINT "blog_topic_blogId_fkey";

-- DropForeignKey
ALTER TABLE "blog_topic" DROP CONSTRAINT "blog_topic_topicId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "banner_img" TEXT NOT NULL,
ADD COLUMN     "topicId" TEXT NOT NULL;

-- DropTable
DROP TABLE "blog_topic";

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
