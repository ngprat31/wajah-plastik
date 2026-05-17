"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react"; // Pastikan sudah install lucide-react

export default function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#1A1A1A]">
      {/* 1. Video Background Container */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://res.cloudinary.com/dskzbz06t/video/upload/q_auto/f_auto/v1776126930/Sekilas_Wajah_Plastik_gsmoq8.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1A1A1A]" />
      </div>

      {/* 2. Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#D4AF37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] mb-6"
        >
          Artistic Sustainability
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl font-light text-white leading-[1.1] uppercase tracking-tighter max-w-4xl"
        >
          Mendefinisikan Ulang <br />
          <span className="font-black italic">Keindahan Limbah</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <button className="px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500">
            Jelajahi Karya
          </button>
        </motion.div>
      </div>

      {/* 3. Audio Control Button (Floating) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleMute}
        className="absolute bottom-10 right-10 z-20 flex items-center gap-3 p-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 group"
      >
        <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium overflow-hidden w-0 group-hover:w-20 transition-all duration-500 whitespace-nowrap">
          {isMuted ? "Unmute" : "Mute"}
        </span >
        {isMuted ? (
          <VolumeX size={18} className="text-white/70" />
        ) : (
          <Volume2 size={18} className="text-[#D4AF37]" />
        )}
      </motion.button>

      {/* 4. Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"
        />
      </div>
    </section>
  );
}