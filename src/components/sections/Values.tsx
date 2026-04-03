"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Briefcase,
  GraduationCap,
  Cpu,
  Users,
  Lightbulb,
  PenTool,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    title: "Art Value",
    desc: "Estetika visual yang indah dengan pesan mendalam pada setiap karya.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    title: "Entrepreneur Value",
    desc: "Membangun generasi kreatif yang kompetitif di era ekonomi global.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Education Value",
    desc: "Edukasi berkelanjutan tentang tata kelola dan penyelamatan sampah plastik.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: "Technology Value",
    desc: "Kolaborasi desain digital, integrasi QR Code, dan pengembangan aset NFT.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Social Value",
    desc: "Menggerakkan masyarakat untuk berperan aktif dalam tanggung jawab lingkungan.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Innovation Value",
    desc: "Inovasi dari generasi ke generasi melalui transformasi digital dan aset kreatif.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Creativity Value",
    desc: "Perpaduan genius desain digital dengan seni kubikus tradisional.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    title: "Environment Based",
    desc: "Mengubah sampah plastik menjadi karya seni bernilai tinggi demi kelestarian.",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    title: "Self Responsibility",
    desc: "Membangun kesadaran personal dalam mengelola sampah yang dihasilkan.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

export default function OurValues() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header dengan Animasi Fade In Down */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extralight uppercase tracking-tighter mb-4 text-[#1A1A1A]">
            Our <span className="font-bold text-[#D4AF37]">Values</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-[#D4AF37] mx-auto"
          />
        </motion.div>

        {/* Grid dengan Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group p-10 border border-gray-100 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl bg-[#FAFAFA] relative"
            >
              {/* Icon & Background Hover Effect */}
              <div className="mb-6 relative inline-block">
                <div className="absolute inset-0 bg-[#D4AF37]/10 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-out" />
                <div className="relative text-[#D4AF37] group-hover:text-[#1A1A1A] transition-colors duration-500">
                  {val.icon}
                </div>
              </div>

              {/* Teks Konten */}
              <h3 className="text-lg font-bold mb-3 uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-300">
                {val.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                {val.desc}
              </p>

              {/* Nomor Urut Tipis di Pojok */}
              <span className="absolute top-6 right-8 text-4xl font-black text-gray-200/40 group-hover:text-[#D4AF37]/10 transition-colors duration-500">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
