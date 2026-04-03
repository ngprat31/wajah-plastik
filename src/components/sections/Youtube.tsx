"use client";

import { motion } from "framer-motion";
import { Video, ExternalLink } from "lucide-react";

interface YoutubeItem {
  youtube_id: number;
  youtube_link: string; // Kolom yang berisi Video ID (misal: "yz8Y5SXuf9g")
}

export default function YoutubeSection({ items }: { items: YoutubeItem[] }) {
  // Ambil hanya 6 video terbaru jika data yang dikirim banyak
  const displayItems = items?.slice(0, 12) || [];

  return (
    <section className="py-20 px-4 md:px-12 bg-white min-h-screen w-full">
      <div className=" mx-auto px-06 md:px-12 max-w-7xl ">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="border-l-4 border-[#D4AF37] pl-6">
            <h2 className="text-4xl font-light uppercase tracking-tighter text-[#1A1A1A]">
              YouTube{" "}
              <span className="font-bold text-[#D4AF37]">Made Oplas</span>
            </h2>
            <p className="text-gray-500 mt-2 uppercase tracking-widest text-[10px]">
              Dokumentasi Edukasi & Kreativitas
            </p>
          </div>

          <a
            href="/youtube"
            className="hidden md:flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:tracking-[0.3em] transition-all duration-300"
          >
            Explore Channel <Video className="w-4 h-4" />
          </a>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.length > 0 ? (
            displayItems.map((video, idx) => {
              // Karena youtube_link adalah ID, kita rakit URL-nya di sini
              const videoId = video.youtube_link;
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;
              const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

              return (
                <motion.div
                  key={video.youtube_id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-video bg-black overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Iframe Video */}
                  {videoId ? (
                    <iframe
                      className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      src={embedUrl}
                      title={`Video Wajah Plastik ${idx}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-900 italic text-xs">
                      Video ID missing
                    </div>
                  )}

                  {/* Tombol External Link ke YouTube Asli */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#D4AF37] text-black rounded-full shadow-xl hover:bg-white transition-colors"
                      title="Nonton di YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Border halus saat hover */}
                  <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-500" />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              Belum ada video yang tersedia.
            </div>
          )}
        </div>

        {/* Mobile View Explore Link */}
        <div className="mt-10 text-center md:hidden">
          <a
            href="/youtube"
            className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest border border-[#D4AF37] px-6 py-3 rounded-full"
          >
            Explore Channel <Video className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
