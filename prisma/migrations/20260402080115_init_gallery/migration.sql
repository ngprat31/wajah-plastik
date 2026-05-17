-- CreateTable
CREATE TABLE "gallery" (
    "gallery_id" SERIAL NOT NULL,
    "gallery_judul" VARCHAR(100) NOT NULL,
    "gallery_deskripsimes" TEXT NOT NULL,
    "gallery_kategori" VARCHAR(255) NOT NULL,
    "gallery_image" VARCHAR(255),
    "gallery_slug" VARCHAR(255),
    "gallery_sertilengkap" VARCHAR(50),
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("gallery_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_gallery_slug_key" ON "gallery"("gallery_slug");

-- CreateIndex
CREATE INDEX "gallery_gallery_kategori_idx" ON "gallery"("gallery_kategori");
