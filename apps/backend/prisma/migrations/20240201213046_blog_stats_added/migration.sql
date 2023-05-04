-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "number_of_views" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "blog_stats" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "number_of_views" INTEGER NOT NULL DEFAULT 0,
    "number_of_likes" INTEGER NOT NULL DEFAULT 0,
    "number_of_comments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog_stats" ADD CONSTRAINT "blog_stats_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
