/*
  Warnings:

  - Added the required column `type` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlogType" AS ENUM ('PUBLIC', 'DRAFT');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "type" "BlogType" NOT NULL;
