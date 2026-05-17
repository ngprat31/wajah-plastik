import dotenv from 'dotenv';
dotenv.config(); // Harus di atas agar process.env terisi

import { v2 as cloudinary } from 'cloudinary';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/client';
import ws from 'ws';

// Setup WebSocket untuk lingkungan Node.js
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Inisialisasi Manual untuk Script ini agar tidak bentrok dengan lib/prisma
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);
const prisma = new PrismaClient({ adapter });

// 1. Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dskzbz06t',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function syncGallery() {
  try {
    console.log("--- Memulai Sinkronisasi Cloudinary ke Neon ---");
    
    // 2. Ambil resources dari Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'wajah-plastik/', 
      max_results: 500, 
    });

    const resources = result.resources;
    const allGallery = await prisma.gallery.findMany();
    
    console.log(`Ditemukan ${resources.length} file di Cloudinary.`);
    console.log(`Memproses ${allGallery.length} data di database...`);

    let updatedCount = 0;

    for (const item of allGallery) {
      // Pastikan menggunakan nama kolom yang benar (tadi kamu pakai gallery_judul, sekarang judul)
      // Saya sesuaikan dengan nama kolom yang kamu tulis di script terakhir
      const judul = item.judul || item.judul; 
      const id = item.id || item.id;

      const searchPattern = judul
        .toLowerCase()
        .replace(/\s+/g, '_')
        .trim();

      // 3. Cari Public ID yang mengandung pola judul
      const match = resources.find((res: any) => 
        res.public_id.toLowerCase().includes(searchPattern)
      );

      if (match) {
        await prisma.gallery.update({
          where: { id: id }, // Sesuaikan dengan PK di schema.prisma
          data: {
            image: match.public_id, 
          },
        });
        console.log(`✅ MATCH: "${judul}" -> ${match.public_id}`);
        updatedCount++;
      } else {
        console.warn(`⚠️ NO MATCH: "${judul}" (Pola: ${searchPattern})`);
      }
    }

    console.log(`--- Selesai! ${updatedCount} data diperbarui ---`);
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error);
  } finally {
    await prisma.$disconnect();
  }
}

syncGallery();