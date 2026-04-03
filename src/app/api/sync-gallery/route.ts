import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const galleries = await prisma.gallery.findMany();
  const results = [];

  for (const item of galleries) {
    if (!item.gallery_image) continue;

    // Bersihkan nama file: hapus .webp, ganti spasi dengan underscore
    const cleanName = item.gallery_image
      .replace(/\.webp$/i, "")
      .replace(/\s+/g, "_");

    try {
      // Cari file di Cloudinary (Folder: wajah-plastik)
      const search = await cloudinary.search
        .expression(`folder:wajah-plastik AND filename:${cleanName}*`)
        .execute();

      if (search.resources.length > 0) {
        const bestMatch = search.resources[0].public_id;

        // Update database dengan public_id yang benar
        await prisma.gallery.update({
          where: { gallery_id: item.gallery_id },
          data: { gallery_image: bestMatch },
        });

        results.push({
          id: item.gallery_id,
          old: item.gallery_image,
          new: bestMatch,
        });
      }
    } catch (error) {
      console.error(`Gagal sync untuk: ${item.gallery_judul}`, error);
    }
  }

  return NextResponse.json({ status: "Success", synced: results });
}
