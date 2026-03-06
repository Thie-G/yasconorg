-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('draft', 'published', 'archived');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CmsCategory" ADD VALUE 'announcement';
ALTER TYPE "CmsCategory" ADD VALUE 'video';
ALTER TYPE "CmsCategory" ADD VALUE 'blog';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CmsContentType" ADD VALUE 'announcement';
ALTER TYPE "CmsContentType" ADD VALUE 'press_briefing';
ALTER TYPE "CmsContentType" ADD VALUE 'video';

-- CreateTable
CREATE TABLE "cms_announcements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "rich_content" TEXT NOT NULL,
    "cover_image" TEXT,
    "region" "CmsRegion" NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "rich_content" TEXT NOT NULL,
    "cover_image" TEXT,
    "region" "CmsRegion" NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_press_briefings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "rich_content" TEXT NOT NULL,
    "cover_image" TEXT,
    "region" "CmsRegion" NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_press_briefings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "rich_content" TEXT NOT NULL,
    "cover_image" TEXT,
    "video_url" TEXT NOT NULL,
    "video_duration" INTEGER,
    "region" "CmsRegion" NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "rich_content" TEXT NOT NULL,
    "cover_image" TEXT,
    "region" "CmsRegion" NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cms_announcements_slug_key" ON "cms_announcements"("slug");

-- CreateIndex
CREATE INDEX "cms_announcements_region_status_published_at_idx" ON "cms_announcements"("region", "status", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "cms_news_slug_key" ON "cms_news"("slug");

-- CreateIndex
CREATE INDEX "cms_news_region_status_published_at_idx" ON "cms_news"("region", "status", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "cms_press_briefings_slug_key" ON "cms_press_briefings"("slug");

-- CreateIndex
CREATE INDEX "cms_press_briefings_region_status_published_at_idx" ON "cms_press_briefings"("region", "status", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "cms_videos_slug_key" ON "cms_videos"("slug");

-- CreateIndex
CREATE INDEX "cms_videos_region_status_published_at_idx" ON "cms_videos"("region", "status", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "cms_blogs_slug_key" ON "cms_blogs"("slug");

-- CreateIndex
CREATE INDEX "cms_blogs_region_status_published_at_idx" ON "cms_blogs"("region", "status", "published_at");

-- AddForeignKey
ALTER TABLE "cms_announcements" ADD CONSTRAINT "cms_announcements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_announcements" ADD CONSTRAINT "cms_announcements_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_news" ADD CONSTRAINT "cms_news_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_news" ADD CONSTRAINT "cms_news_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_press_briefings" ADD CONSTRAINT "cms_press_briefings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_press_briefings" ADD CONSTRAINT "cms_press_briefings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_videos" ADD CONSTRAINT "cms_videos_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_videos" ADD CONSTRAINT "cms_videos_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_blogs" ADD CONSTRAINT "cms_blogs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_blogs" ADD CONSTRAINT "cms_blogs_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "cms_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
