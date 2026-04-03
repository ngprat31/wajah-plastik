"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Medal, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Achievement {
  id: number;
  year: string | Date | null;
  title: string | null;
  description: string | null;
  category: string | null;
  image?: string | null;
}

export default function AchievementGrid({ items }: { items: Achievement[] }) {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Ringkas */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="border-l-4 border-[#D4AF37] pl-6">
            <h2 className="text-4xl font-light uppercase tracking-tighter text-[#1A1A1A]">
              Our <span className="font-bold text-[#D4AF37]">Achievements</span>
            </h2>
            <p className="text-gray-500 mt-2 uppercase tracking-[0.2em] text-[10px] font-bold">
              Recognition & Excellence
            </p>
          </div>
        </div>

        {/* Grid 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            // Ambil Tahun
            const displayYear = item.year
              ? item.year instanceof Date
                ? item.year.getFullYear()
                : item.year.toString().substring(0, 4)
              : "2019";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section (Jika ada) */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title || "Achievement"}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ width: "auto", height: "auto" }}
                      width={300}
                      height={200}
                    />
                  ) : (
                    <div className="text-gray-200">
                      <Trophy size={64} strokeWidth={1} />
                    </div>
                  )}

                  {/* Badge Tahun tetap di posisi yang sama */}
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 tracking-widest shadow-sm">
                    {displayYear}
                  </div>
                </div>
                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {item.category || "Penghargaan"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-tight mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Decorative Footer */}
                  <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div className="text-[#D4AF37]">
                      {idx % 2 === 0 ? (
                        <Award size={18} />
                      ) : (
                        <Medal size={18} />
                      )}
                    </div>
                    {item.image && (
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-300 group-hover:text-[#D4AF37] transition-colors cursor-default">
                        View Certificate
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
