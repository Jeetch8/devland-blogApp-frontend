-- AlterTable
ALTER TABLE "User_token" ALTER COLUMN "change_password_token" DROP NOT NULL,
ALTER COLUMN "change_password_token_expiry" DROP NOT NULL,
ALTER COLUMN "change_password_status" DROP NOT NULL;
