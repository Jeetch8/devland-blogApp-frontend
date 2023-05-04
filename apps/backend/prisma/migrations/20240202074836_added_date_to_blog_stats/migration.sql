/*
  Warnings:

  - Added the required column `date` to the `blog_stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_stats" ADD COLUMN     "date" TEXT NOT NULL;
