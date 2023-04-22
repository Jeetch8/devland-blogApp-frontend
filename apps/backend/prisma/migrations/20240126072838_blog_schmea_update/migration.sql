-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "number_of_comments" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "number_of_likes" INTEGER NOT NULL DEFAULT 0;
