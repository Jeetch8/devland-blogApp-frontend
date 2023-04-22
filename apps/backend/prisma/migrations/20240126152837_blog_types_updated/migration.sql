/*
  Warnings:

  - The values [PUBLIC,DRAFT] on the enum `BlogType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlogType_new" AS ENUM ('publish', 'draft');
ALTER TABLE "Blog" ALTER COLUMN "type" TYPE "BlogType_new" USING ("type"::text::"BlogType_new");
ALTER TYPE "BlogType" RENAME TO "BlogType_old";
ALTER TYPE "BlogType_new" RENAME TO "BlogType";
DROP TYPE "BlogType_old";
COMMIT;
