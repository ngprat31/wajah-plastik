import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-[#1A1A1A] overflow-hidden">
      {/* Aksen Dekoratif Siluet Logo atau Pola */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -ml-20 -mb-20" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-block text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-6">
          Miliki Mahakarya Eksklusif
        </span>

        <h2 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight tracking-tight uppercase">
          Ubah Jejak Karbon Menjadi <br />
          <span className="font-black italic text-[#D4AF37]">Warisan Seni</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          Setiap karya Wajah Plastik dibuat terbatas dan disertai sertifikat
          keaslian. Hubungi kami untuk pesanan khusus atau kolaborasi workshop
          lingkungan.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Tombol WhatsApp */}
          <Link
            href="https://wa.me/628123456789"
            target="_blank"
            className="group flex items-center gap-3 bg-[#D4AF37] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 shadow-xl"
          >
            <MessageCircle size={18} />
            Konsultasi via WhatsApp
          </Link>

          {/* Link ke Portfolio/Katalog */}
          <Link
            href="/gallery"
            className="group flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] border-b border-white/20 pb-2 hover:border-[#D4AF37] transition-all"
          >
            Lihat Katalog Lengkap
            <ArrowRight
              size={14}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
