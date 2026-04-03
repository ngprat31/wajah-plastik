"use client";

import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const creatorPhotoId = "v1775216690/about1_xqi1rb.webp";

export default function AboutWajahPlastik() {
  return (
    <section className="py-24 bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 border-l-[6px] border-[#D4AF37] pl-8">
          <h2 className="text-5xl md:text-6xl font-extralight uppercase tracking-tighter leading-none">
            Mengenal{" "}
            <span className="font-bold text-[#D4AF37]">Wajah Plastik™</span>
          </h2>
          <p className="text-gray-500 mt-3 tracking-[0.3em] uppercase text-sm font-medium italic">
            Seni Upcycle • Edukasi • Keberlanjutan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Profil Kreator (Dibatasi Lebarnya) */}
          <div className="w-full max-w-[600px] mx-auto lg:mx-0 bg-white p-4 border border-gray-100 shadow-xl group">
            {/* Container Foto dengan Ukuran yang Terkontrol */}
            <div className="relative w-full aspect-[4/5] overflow-hidden mb-8 border border-gray-100 shadow-inner group-hover:border-[#D4AF37]/30 transition-all duration-500">
              <Image
                src={getCloudinaryUrl(creatorPhotoId)}
                alt="Made Agus Janardana, S.Pd., Gr., M.Kom"
                // Menggunakan fill dengan object-cover agar gambar tetap proporsional di dalam aspect ratio
                fill
                className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                sizes="(max-width: 400px) 100vw, 400px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Nama dan Gelar */}
            <div className="space-y-1">
              <h3 className="text-xl font-black leading-tight text-[#1A1A1A] tracking-tight">
                Made Agus Janardana
              </h3>
              <p className="text-sm text-gray-500 font-medium italic">
                S.Pd., Gr., M.Kom
              </p>
            </div>

            {/* Alias dan Jabatan */}
            <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
              <span className="text-[10px] font-bold text-white bg-[#D4AF37] px-2 py-1 uppercase tracking-widest">
                Made Oplas
              </span>
              <p className="text-[#D4AF37] font-bold text-[10px] tracking-widest uppercase">
                CreArtor
              </p>
            </div>

            {/* Kutipan */}
            <div className="border-t border-gray-50 pt-6">
              <p className="text-sm italic leading-relaxed text-gray-600 border-l-2 border-[#D4AF37] pl-4">
                "Sampah Plastik bukan musuh kita. Penggunaan plastik akan terus
                berlanjut, sehingga kita harus memilah, mengolah, dan
                mengelolanya dengan baik."
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Filosofi Gerakan & 6R */}
          <div className="flex flex-col justify-center h-full space-y-10">
            {/* Kotak Visi */}
            <div className="bg-[#1A1A1A] text-white p-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-t border-r border-[#D4AF37]/10 transform rotate-12 transition-transform duration-700 group-hover:scale-125" />

              <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-[#D4AF37]"></span> Filosofi & Visi
              </h4>
              <p className="text-2xl md:text-3xl leading-snug font-light tracking-tight text-white/90">
                Wajah Plastik™ adalah sinergi{" "}
                <strong className="font-bold text-[#D4AF37]">
                  teknologi desain
                </strong>{" "}
                dan teknik{" "}
                <strong className="font-bold text-[#D4AF37]">upcycle</strong>,
                menciptakan karya seni yang bicara tentang masa depan bumi.
              </p>
            </div>

            {/* Bagian Sejarah & 6R */}
            <div className="text-gray-600 leading-relaxed px-2">
              <p className="text-lg">
                Gerakan ini telah dilindungi{" "}
                <strong className="text-[#1A1A1A]">Hak Cipta & Hak Merk</strong>{" "}
                sejak 2018. Fokus utama kami adalah mentransformasi perilaku
                melalui budaya{" "}
                <span className="text-[#D4AF37] font-bold">6R</span>:
              </p>

              {/* Grid 6R yang Lebih Rapi */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { r: "Reduce", d: "Kurangi" },
                  { r: "Reuse", d: "Gunakan" },
                  { r: "Recycle", d: "Daur Ulang" },
                  { r: "Rethink", d: "Pikirkan" },
                  { r: "Refuse", d: "Tolak" },
                  { r: "Repair", d: "Perbaiki" },
                ].map((item) => (
                  <div
                    key={item.r}
                    className="group bg-white border border-gray-100 p-5 hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
                  >
                    <span className="block text-[#D4AF37] text-lg font-black uppercase tracking-tighter group-hover:tracking-widest transition-all duration-500">
                      {item.r}
                    </span>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold mt-1 tracking-tighter">
                      {item.d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
