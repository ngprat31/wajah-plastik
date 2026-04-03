"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface News {
  news_id: number;
  news_title: string | null;
  news_description: string | null;
  news_slug: string | null;
  news_date: Date | null;
  news_writer: string | null;
  news_image: string | null;
  news_category: string | null;
}

export default function NewsList({ news }: { news: News[] }) {
  const cleanText = (text: string | null) => {
    if (!text) return "";

    return (
      text
        // 1. Ganti &nbsp; dengan spasi biasa
        .replace(/&nbsp;/g, " ")
        // 2. Hapus semua tag HTML (misal: <p>, <span>, <br/>)
        .replace(/<\/?[^>]+(>|$)/g, "")
        // 3. Rapikan spasi berlebih
        .replace(/\s+/g, " ")
        .trim()
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((item, idx) => {
            const formattedDate = item.news_date
              ? new Date(item.news_date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Tanggal tidak tersedia";

            return (
              <motion.article
                key={item.news_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full border-b border-gray-100 pb-8 lg:border-none lg:pb-0"
              >
                {/* Image Container */}
                <Link
                  href={`/news/${item.news_slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6 block"
                >
                  {item.news_image ? (
                    <Image
                      // PANGGIL HELPER DI SINI
                      src={getCloudinaryUrl(item.news_image)}
                      alt={item.news_title || "News Image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={idx < 3} // Optimasi: Load 3 berita pertama lebih cepat
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        No Image
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                    {item.news_category || "Update"}
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  {/* Meta Data */}
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#D4AF37]" />{" "}
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-[#D4AF37]" />{" "}
                      {item.news_writer || "Admin"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A1A] leading-tight mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    <Link href={`/news/${item.news_slug}`}>
                      {item.news_title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {cleanText(item.news_description)}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto">
                    <Link
                      href={`/news/${item.news_slug}`}
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#D4AF37] transition-all group/link"
                    >
                      Baca Selengkapnya
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
