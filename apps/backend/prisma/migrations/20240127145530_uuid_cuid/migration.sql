/*
  Warnings:

  - Added the required column `short_description` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "short_description" TEXT NOT NULL;
