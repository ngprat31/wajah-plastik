"use client";

import { motion } from "framer-motion";
import { Quote, Globe } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  alias?: string;
  role: string;
  quote: string;
  image?: string;
}

const team: TeamMember[] = [
  {
    name: "Made Agus Djanardana",
    alias: "Made Oplas",
    role: "Founder & CreArtor Wajah Plastik",
    quote: "Within Great Power Comes Great Responsibility",
    image:
      "https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775221361/Djanar_wwtctc.webp",
  },
 
  {
    name: "Kadek Okik Sanjaya",
    role: "Designer Grafis",
    quote: "Nikmati hari ini, karena esok adalah misteri.",
    image:
      "https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775221382/Okky_vzyqid.webp",
  },
  {
    name: "Bhakti Pratama",
    role: "Webmaster",
    quote:
      "Tidak ada yang namanya kesuksesan tanpa kegagalan, Bangkit berdiri Teruslah Berusaha dan Berkarya",
    image:
      "https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775221413/Bhakti_cpihrd.webp",
  },
  {
    name: "Made Wirahadi Permana",
    role: "Production",
    quote: "Cintailah pekerjaanmu walau sekecil apapun",
    image:
      "https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775221427/Wira_vvpsci.webp",
  },
  {
    name: "Kadek Rizky Setiawan",
    role: "Production",
    quote: "Memulai Hal Yang Sederhana Untuk Menjadi Hal Yang Luar Biasa",
    image:
      "https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1775221432/Rizky_abumtv.webp",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl font-light uppercase tracking-tighter text-[#1A1A1A] mb-6">
            Our <span className="font-bold text-[#D4AF37]">Team</span>
          </h2>
          <div className="relative">
            <Quote className="absolute -top-4 -left-8 w-12 h-12 text-[#D4AF37]/10" />
            <p className="text-xl italic text-gray-500 font-light leading-relaxed">
              “Datang bersama adalah awal, tetap bersama adalah kemajuan, dan
              bekerja bersama adalah kesuksesan.”
              <span className="block mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#1A1A1A]">
                — Henry Ford
              </span>
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              {/* Image Section */}
              {member.image && (
                <div className="relative aspect-square overflow-hidden mb-6 border border-gray-100 group-hover:border-[#D4AF37] transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Profile Info */}
              <div className="border-l-2 border-gray-100 pl-6 group-hover:border-[#D4AF37] transition-colors duration-500">
                <div className="mb-4">
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A] leading-tight">
                    {member.name}
                    {member.alias && (
                      <span className="text-[#D4AF37] ml-2 font-light">
                        ({member.alias})
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Quote Card */}
                <div className="relative p-6 bg-[#FAFAFA] border border-gray-50 group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
                  <p className="text-sm text-gray-600 leading-relaxed italic font-light relative z-10">
                    "{member.quote}"
                  </p>
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full mb-1" />
                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                  </div>
                </div>

                {/* Social Placeholder (Optional) */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
