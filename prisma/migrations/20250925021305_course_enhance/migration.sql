/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ShowStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "public"."course" DROP COLUMN "thumbnail",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "smallDescription" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."ShowStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_slug_key" ON "public"."course"("slug");
