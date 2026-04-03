"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Impor plugin tambahan jika Anda ingin fitur lebih lengkap (opsional)
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import { getCloudinaryUrl } from "@/lib/cloudinary";

interface EventItem {
  event_id: number;
  event_judul: string | null;
  event_image: string | null;
}

export default function EventGallery({ items }: { items: EventItem[] }) {
  const [index, setIndex] = useState(-1);

  // 1. Filter hanya item yang memiliki gambar
  const validItems = items.filter((item) => item.event_image !== null);
  // Debug: Pastikan data yang diterima benar
  // 2. Format slides untuk Lightbox
  const slides = validItems.map((item) => ({
    src: getCloudinaryUrl(item.event_image),
    title: item.event_judul || "Event Wajah Plastik",
    description: "Dokumentasi Kegiatan Wajah Plastik",
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {validItems.map((item, i) => (
          <div
            key={item.event_id}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#D4AF37]/30"
          >
            {/* Image Component */}
            <Image
              src={getCloudinaryUrl(item.event_image)}
              alt={item.event_judul || "Event Wajah Plastik"}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              unoptimized={true} // Sangat penting untuk menghindari error 400 dari cache Next.js
              priority={i < 4} // Optimasi LCP untuk 4 gambar pertama
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Premium Overlay: Muncul saat Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                View Moment
              </span>
              <h3 className="text-white text-xs font-light uppercase tracking-widest leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.event_judul}
              </h3>

              {/* Garis Dekoratif Emas */}
              <div className="h-[1px] w-0 group-hover:w-12 bg-[#D4AF37] mt-4 transition-all duration-700 delay-150" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions]}
        captions={{
          descriptionTextAlign: "center",
          descriptionMaxLines: 3,
        }}
        // Kustomisasi style lightbox agar senada dengan web (gelap & mewah)
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </>
  );
}
