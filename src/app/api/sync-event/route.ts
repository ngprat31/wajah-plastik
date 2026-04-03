import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const events = await prisma.event.findMany();
  const results = [];

  for (const item of events) {
    if (!item.event_image) continue;

    // 1. PEMBERSIHAN KRUSIAL: Hapus \r\n, spasi di ujung, dan ekstensi
    const rawImage = item.event_image.replace(/[\r\n\t]/g, "").trim();
    const cleanName = rawImage.replace(/\.(webp|jpg|jpeg|png)$/i, "");

    // Jika nama file kosong setelah dibersihkan, lewati
    if (!cleanName) continue;

    try {
      // 2. SEARCH: Gunakan nama yang sudah bersih
      // Tips: Jika file di Cloudinary pakai spasi, biarkan spasi di sini (SDK akan mengurusnya)
      const search = await cloudinary.search
        .expression(`filename:"${cleanName}*"`) // Gunakan tanda kutip untuk handle spasi
        .execute();

      if (search.resources.length > 0) {
        const bestMatch = search.resources[0].public_id;

        // 3. UPDATE: Masukkan public_id yang bersih ke DB
        // Kita juga sekaligus bersihkan judul event jika ada \r\n di sana
        await prisma.event.update({
          where: { event_id: item.event_id },
          data: {
            event_image: bestMatch,
            event_judul: item.event_judul?.replace(/[\r\n\t]/g, "").trim(),
          },
        });

        results.push({
          id: item.event_id,
          old: item.event_image,
          new: bestMatch,
        });
      }
    } catch (error) {
      console.error(`Gagal sync event ID ${item.event_id}:`, error);
    }
  }

  return NextResponse.json({
    status: "Success",
    message: `Berhasil sinkronisasi ${results.length} data event`,
    synced: results,
  });
}
