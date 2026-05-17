"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  MessageCircle, 
  Award, 
  Leaf, 
  Globe, 
  ChevronRight,
  Star
} from "lucide-react";

export default function BookPage() {
  const waNumber = "6285792309880";
  const bookTitle = "Wajah Plastik: A Pigment of Imagination";
  
  // Link WhatsApp dengan pesan otomatis yang rapi
  const waMessage = `Halo Wajah Plastik, saya tertarik untuk memesan buku "${bookTitle}" karya Made Agus Janardana. Mohon informasi ketersediaan dan cara pemesanannya.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-24 px-6 text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        
        {/* SECTION 1: HERO & CORE INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          
          {/* SISI KIRI: VISUAL BUKU */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Dekorasi Aura Emas */}
            <div className="absolute -inset-10 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
            
            <div className="relative aspect-[3/4] w-full max-w-[420px] mx-auto shadow-[40px_40px_90px_-15px_rgba(0,0,0,0.3)] transform -rotate-2 hover:rotate-0 transition-all duration-700 ease-out group">
              <Image
                src="https://res.cloudinary.com/dskzbz06t/image/upload/q_auto/f_auto/v1776307201/wajah-plastik_a_pigment_of_imagination_janardana_nilacakra-600x867_klp0lw.webp" // Gantilah dengan path cover asli Anda
                alt={bookTitle}
                fill
                className="object-cover rounded-sm border-l-[6px] border-black/10"
                priority
              />
              {/* Efek Kilap Kertas */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Badge Floating */}
            <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-4 shadow-xl border border-gray-100 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Official Release</p>
              <p className="text-xs font-medium">Google Books Indexed</p>
            </div>
          </motion.div>

          {/* SISI KANAN: JUDUL & CTA */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">
                <Award size={14} /> Global Literacy Art
              </div>
              <h1 className="text-5xl md:text-7xl font-light leading-[1.05] uppercase tracking-tighter">
                Wajah Plastik: <br />
                <span className="font-black italic">A Pigment of <br/> Imagination</span>
              </h1>
              <div className="h-1 w-20 bg-[#D4AF37]" />
              <p className="text-sm font-bold tracking-[0.3em] text-gray-400">BY MADE AGUS JANARDANA</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 text-gray-500 font-light leading-relaxed text-lg"
            >
              <p>
                <strong>Wajah Plastik</strong> merupakan manifestasi dari gerakan revolusioner yang mendefinisikan ulang batas antara limbah dan mahakarya. Buku ini merangkum esensi dari sebuah karya seni kreatif yang lahir dari proses <span className="italic text-[#D4AF37] font-medium text-base">upcycling</span> cerdas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a
                  href={waUrl}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500 shadow-2xl"
                >
                  <MessageCircle size={18} /> Pesan Melalui WhatsApp
                </a>
                
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: FULL SYNOPSIS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-24 border-t border-gray-100">
          <div className="md:col-span-2 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#1A1A1A] flex items-center gap-3">
               Sinopsis Mendalam <div className="h-[1px] w-12 bg-gray-200" />
            </h3>
            <div className="columns-1 md:columns-2 gap-10 text-gray-500 font-light leading-relaxed space-y-6">
              <p>
                Berangkat dari kegelisahan akan permasalahan lingkungan di Bali, <strong>Made Agus Janardana</strong> melalui buku ini menawarkan perspektif baru yang mendalam: bahwa sampah plastik sebenarnya bukanlah musuh kita. Masalah yang kita hadapi hari ini bukanlah pada materinya, melainkan pada bagaimana kita memperlakukannya.
              </p>
              <p>
                Penggunaan plastik harus diimbangi dengan pengolahan yang baik agar tidak mencemari lingkungan. Wajah Plastik hadir untuk memberikan solusi terhadap permasalahan sampah plastik di Bali, Indonesia, bahkan dunia.
              </p>
              <p>
                Dalam <em>"A Pigment of Imagination"</em>, pembaca diajak mengeksplorasi bagaimana setiap potongan sachet kemasan bertransformasi menjadi palet warna atau "pigmen" imajinasi. 
              </p>
              <p>
                Buku ini memotret perjalanan Wajah Plastik sebagai sebuah diplomasi seni dari Bali, membuktikan bahwa kreativitas adalah kunci utama dalam menjaga keberlanjutan bumi tanpa mengesampingkan keindahan estetika yang bernilai ekonomi tinggi.
              </p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-10 text-white space-y-8 self-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Highlights</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <Leaf size={18} className="text-[#D4AF37] shrink-0" />
                <p className="text-xs font-light leading-loose tracking-wide">Filosofi Zero-Waste Art & Sustainability</p>
              </li>
              <li className="flex gap-4 items-start">
                <BookOpen size={18} className="text-[#D4AF37] shrink-0" />
                <p className="text-xs font-light leading-loose tracking-wide">Teknik Step-by-Step Upcycle Plastik</p>
              </li>
              <li className="flex gap-4 items-start">
                <Globe size={18} className="text-[#D4AF37] shrink-0" />
                <p className="text-xs font-light leading-loose tracking-wide">Terindeks Global di Google Books</p>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER QUOTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center pt-24 border-t border-gray-100"
        >
          <Star size={24} className="mx-auto text-[#D4AF37]/30 mb-8" />
          <h2 className="text-2xl md:text-4xl font-light italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "Sampah plastik bukanlah musuh kita, ia adalah pigmen baru bagi imajinasi yang tak terbatas."
          </h2>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Made Agus Janardana</p>
        </motion.div>

      </div>
    </main>
  );
}