import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  // 1. Ambil data berita (Bisa difilter yang news_image-nya belum mengandung '/')
  const newsItems = await prisma.news.findMany();
  const results = [];

  for (const item of newsItems) {
    if (!item.news_image) continue;

    // Skip jika sudah disync sebelumnya (sudah ada folder/id di dalamnya)
    if (item.news_image.includes("wajah-plastik/")) {
      results.push({ id: item.news_id, status: "Skipped (Already Synced)" });
      continue;
    }

    /**
     * LOGIKA PEMBERSIHAN NAMA FILE:
     * - Hapus ekstensi (.webp, .jpg, .png, dll)
     * - Ganti spasi dengan underscore agar sesuai standar Cloudinary
     */
    const cleanName = item.news_image
      .replace(/\.(webp|jpg|jpeg|png|gif)$/i, "")
      .replace(/\s+/g, "_");

    try {
      /**
       * PENCARIAN DI CLOUDINARY:
       * Menggunakan folder:wajah-plastik (sesuaikan dengan folder berita Anda)
       * AND filename:cleanName* (untuk menangani variasi suffix Cloudinary)
       */
      const search = await cloudinary.search
        .expression(`folder:wajah-plastik AND filename:${cleanName}*`)
        .sort_by("public_id", "desc")
        .max_results(1)
        .execute();

      if (search.resources.length > 0) {
        // Ambil public_id murni (Contoh: "wajah-plastik/news_image_01")
        const bestMatch = search.resources[0].public_id;

        // 2. Update database dengan public_id hasil sinkronisasi
        await prisma.news.update({
          where: { news_id: item.news_id },
          data: { news_image: bestMatch },
        });

        results.push({
          id: item.news_id,
          title: item.news_title,
          old_filename: item.news_image,
          synced_public_id: bestMatch,
        });
      } else {
        results.push({
          id: item.news_id,
          status: "Not Found in Cloudinary",
          file: cleanName,
        });
      }
    } catch (error) {
      console.error(
        `Gagal sync news untuk ID ${item.news_id}: ${item.news_title}`,
        error
      );
    }
  }

  return NextResponse.json({
    status: "Sync Process Completed",
    total_processed: newsItems.length,
    synced_details: results,
  });
}
