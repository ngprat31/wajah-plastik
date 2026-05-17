import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 1. Ambil nama asli file tanpa ekstensi untuk event_judul
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

      return new Promise<{ event_judul: string; event_image: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'wajah-plastik',
            public_id: fileNameWithoutExt, // Menyesuaikan public_id Cloudinary dengan nama file asli
            format: 'webp',                // OTOMATIS CONVERT KE WEBP
            transformation: [
              { quality: 'auto' }          // Optimasi kualitas gambar secara otomatis
            ]
          },
          (error, result) => {
            if (error) return reject(error);
            
            // Cloudinary akan mengembalikan URL yang sudah berakhiran .webp
            resolve({
              event_judul: fileNameWithoutExt,
              event_image: result?.secure_url || '',
            });
          }
        );
        uploadStream.end(buffer);
      });
    });

    // Eksekusi paralel upload ke Cloudinary
    const uploadedImages = await Promise.all(uploadPromises);

    // Simpan data kolektif ke Neon DB menggunakan Prisma
    const savedEvents = await prisma.event.createMany({
      data: uploadedImages,
    });

    return NextResponse.json({
      message: 'Bulk upload dan konversi WebP berhasil!',
      count: savedEvents.count,
    }, { status: 200 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses upload.' }, { status: 500 });
  }
}