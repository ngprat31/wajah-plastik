// src/app/gallery/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { getGalleryItems } from "./actions";
import SearchInput from "./SearchInput"; // Impor komponen search baru
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function GalleryPage({ searchParams }: Props) {
  const query = (await searchParams).q;
  const items = await getGalleryItems(query);

  return (
    <main className="p-8 bg-[#FDFDFD] mt-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search Bar */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light tracking-widest text-[#1A1A1A] uppercase">
              Work Gallery
            </h1>
            <div className="h-1 w-20 bg-[#D4AF37] mt-4" />
          </div>

          <SearchInput />
        </header>

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link
                href={`/gallery/${item.gallery_slug}`}
                key={item.gallery_id}
                className="group block bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <Image
                    src={getCloudinaryUrl(item.gallery_image)}
                    alt={item.gallery_judul || "Gallery Artwork"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                    {item.gallery_kategori || "Uncategorized"}
                  </p>
                  <h2 className="text-lg font-medium text-[#1A1A1A] leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {item.gallery_judul}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 italic">
              Tidak ada karya ditemukan dengan judul "{query}"
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Koleksi Galeri",
  description:
    "Eksplorasi galeri karya seni Wajah Plastik. Setiap guratan adalah potongan sampah plastik yang dirangkai menjadi mahakarya eksklusif.",
};
