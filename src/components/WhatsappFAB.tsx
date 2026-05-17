"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppFAB() {
  const phoneNumber = "6285792309880";
  const message = "Halo Wajah Plastik, saya tertarik untuk bertanya lebih lanjut.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-6 z-[99]" // Disimpan di kiri bawah agar tidak tabrakan dengan tombol audio (kanan)
    >
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
      >
        {/* Efek Ping/Radar (Opsional untuk menarik perhatian) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:hidden"></span>
        
        <MessageCircle size={28} fill="currentColor" />

        {/* Tooltip Label */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
          Chat With Us
        </span>
      </Link>
    </motion.div>
  );
}