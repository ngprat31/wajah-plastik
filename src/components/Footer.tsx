import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-12 h-12 mb-4">
              <Image
                src="/logo-wp.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
              Wajah Plastik ™
            </p>
          </div>

          {/* Social Links Sederhana */}
          <div className="flex gap-8">
            {["Instagram", "Youtube", "Facebook"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gray-50 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            © {year} Wajah Plastik — All Rights Reserved
          </p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            From Indonesia with <span className="text-[#FF0000]">♥</span> —
            Bhakti Pratama
          </p>
        </div>
      </div>
    </footer>
  );
}
