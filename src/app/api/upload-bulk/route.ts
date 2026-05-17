import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const folderName = 'wajah-plastik';

    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const cleanFileName = baseName.replace(/\s+/g, "_");

      return new Promise<{ event_judul: string; event_image: string }>((resolve, reject) => {
        // PERBAIKAN: Masukkan kredensial langsung ke dalam method upload_stream 
        // untuk memastikan process.env terbaca saat request masuk
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            folder: folderName,
            public_id: cleanFileName,
            format: 'webp',
            transformation: [{ quality: 'auto' }]
          },
          
          (error, result) => {
            if (error) return reject(error);
            
            resolve({
              event_judul: baseName,
              event_image: result?.public_id || `${folderName}/${cleanFileName}`,
            });
          }
        );
        uploadStream.end(buffer);
      });
    });
console.log("=== DEBUG ENV ===");
  console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("=================");
    const uploadedImages = await Promise.all(uploadPromises);

    const savedEvents = await prisma.event.createMany({
      data: uploadedImages,
    });

    return NextResponse.json({
      message: 'Bulk upload berhasil!',
      count: savedEvents.count,
    }, { status: 200 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses upload.' }, { status: 500 });
  }
}