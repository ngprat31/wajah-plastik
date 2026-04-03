"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Definisikan tipe data sesuai skema database Gallery Anda
interface GalleryItem {
  gallery_id: number;
  gallery_judul: string | null;
  gallery_image: string | null;
  gallery_kategori: string | null;
  gallery_slug: string | null;
}

export default function ThematicGallery({ items }: { items: GalleryItem[] }) {
  return (
    <section className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-extralight uppercase tracking-tighter"
          >
            Karya Tematik{" "}
            <span className="text-[#D4AF37] font-bold">Wajah Plastik™</span>
          </motion.h2>
          <p className="max-w-2xl text-gray-400 font-light leading-relaxed">
            Koleksi karya seni upcycle yang membawa pesan mendalam, narasi
            sejarah, dan kritik sosial melalui medium sampah plastik.
          </p>
          <div className="h-1 w-20 bg-[#D4AF37]" />
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {items.map((work) => (
            <div key={work.gallery_id} className="break-inside-avoid group">
              <div className="relative overflow-hidden border border-gray-800 hover:border-[#D4AF37] transition-all duration-500">
                <Image
                  src={getCloudinaryUrl(work.gallery_image)}
                  alt={work.gallery_judul ?? "Gallery Item"}
                  // Menggunakan width & height placeholder untuk menjaga rasio
                  width={500}
                  height={700}
                  // w-full h-auto akan membuat gambar mengikuti lebar kolom masonry
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  style={{ width: "auto", height: "auto" }}
                  unoptimized={true}
                />
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={`/gallery/${work.gallery_slug ?? ""}`}
                    className="bg-[#D4AF37] text-black px-4 py-2 text-xs font-bold uppercase"
                  >
                    Lihat Details
                  </Link>
                </div>
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">
                {work.gallery_judul ?? "Untitled"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
