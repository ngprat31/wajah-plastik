"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Kita hilangkan efek opacity: 0 saat scroll agar teks tetap ada
  // Parallax tetap kita pertahankan sedikit untuk kedalaman visual
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FDFDFD] pt-20 lg:pt-0"
    >
      {/* Background Decor */}
      <div className="absolute top-20 right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 py-12 lg:py-0">
        {/* Left Content */}
        <motion.div
          style={{ y: textY }} // Hanya pergerakan Y, tanpa scroll-out opacity
          className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1"
        >
          {/* Fade In: Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[9px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#D4AF37] font-bold mb-4 md:mb-6"
          >
            Indonesian Contemporary Art
          </motion.span>

          {/* Fade In: Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.2] lg:leading-[1.1] text-[#1A1A1A] uppercase tracking-tighter mb-6 md:mb-8 w-full"
          >
            Turning <span className="font-bold text-[#FF0000]">Waste</span>{" "}
            <br className="hidden sm:block" />
            Into{" "}
            <span className="italic font-serif text-[#0020C2]">Legacy.</span>
          </motion.h1>

          {/* Fade In: Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-light"
          >
            Mendefinisikan ulang limbah plastik menjadi karya seni eksklusif
            yang memikat dunia.
          </motion.p>

          {/* Fade In: Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/gallery"
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-[#1A1A1A] text-white text-[10px] md:text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 inline-block"
            >
              <span className="relative z-10">Explore Gallery</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content: Gambar tetap Fade In dari skala kecil */}
        <div className="lg:col-span-5 relative h-[350px] sm:h-[450px] lg:h-[500px] w-full order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full h-full z-20 shadow-xl border-[8px] md:border-[12px] border-white"
          >
            <Image
              src="https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775115786/Potret_Bali_srumuy.webp"
              alt="Potret Bali"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority // Tambahkan ini jika gambar berada di bagian paling atas (above the fold)
            />
          </motion.div>

          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 1 }}
              className="absolute -top-10 -right-10 w-32 h-40 bg-[#0020C2] z-10"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator tetap Fade In */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400">
          Scroll
        </span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </motion.div>
    </section>
  );
}
