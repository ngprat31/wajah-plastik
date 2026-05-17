/*
  Warnings:

  - You are about to drop the column `gallery_deskripsimes` on the `gallery` table. All the data in the column will be lost.
  - Added the required column `gallery_deskripsi` to the `gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gallery" DROP COLUMN "gallery_deskripsimes",
ADD COLUMN     "gallery_deskripsi" TEXT NOT NULL;
