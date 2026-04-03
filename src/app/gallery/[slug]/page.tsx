import { notFound } from "next/navigation";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { getGalleryBySlug } from "../actions";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * 1. DYNAMIC METADATA
 * Menyesuaikan Title, Description, dan Image untuk SEO & Sosmed
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);

  if (!item) return { title: "Gallery Not Found | Wajah Plastik" };

  const plainDesc = item.gallery_deskripsi
    ? item.gallery_deskripsi.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160)
    : "Karya seni eksklusif dari material plastik daur ulang oleh Wajah Plastik.";

  const imageUrl = getCloudinaryUrl(item.gallery_image);

  return {
    title: `${item.gallery_judul} | Gallery`,
    description: plainDesc,
    openGraph: {
      title: `${item.gallery_judul} - Wajah Plastik`,
      description: plainDesc,
      url: `https://wajahplastik.com/gallery/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.gallery_judul || "Wajah Plastik Artwork",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: item.gallery_judul || "",
      description: plainDesc,
      images: [imageUrl],
    },
  };
}

export default async function GalleryDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);

  if (!item) notFound();

  /**
   * 2. STRUCTURED DATA (JSON-LD)
   * Membantu Google mengenali ini sebagai produk seni/visual
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: item.gallery_judul,
    image: getCloudinaryUrl(item.gallery_image),
    description: item.gallery_deskripsi?.replace(/<\/?[^>]+(>|$)/g, ""),
    artist: {
      "@type": "Person",
      name: "Made Agus Janardana",
    },
    material: "Recycled Plastic",
    genre: "Environmental Art",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FDFDFD] py-20 px-6 text-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">
          {/* Tombol Back yang Elegan */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[#D4AF37] mb-12 transition-colors"
          >
            ← Back to Collection
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Container Gambar */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-[#D4AF37]/10 rounded-sm blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-2xl border border-gray-100">
                <Image
                  src={getCloudinaryUrl(item.gallery_image)}
                  alt={item.gallery_judul || "Detail Gallery"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Konten Detail */}
            <div className="flex flex-col pt-4">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 border border-[#D4AF37] text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] mb-6 font-medium">
                  {item.gallery_kategori || "Exclusive Art"}
                </span>
                <h1 className="text-4xl font-light text-[#1A1A1A] mb-2 leading-tight tracking-tight uppercase">
                  {item.gallery_judul}
                </h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Original Artwork by Wajah Plastik
                </p>
              </div>

              <div className="h-px w-24 bg-[#D4AF37] mb-8" />

              <div
                className="text-gray-600 leading-relaxed prose prose-neutral max-w-none mb-10"
                dangerouslySetInnerHTML={{
                  __html:
                    item.gallery_deskripsi ||
                    "<p>Karya seni plastik kontemporer yang mendefinisikan ulang keindahan material daur ulang.</p>",
                }}
              />

              <div className="flex flex-col gap-6">
                {item.gallery_sertilengkap && (
                  <div className="flex items-center gap-3 p-4 bg-[#F9F9F9] border-l-2 border-[#D4AF37]">
                    <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                      Authentic Certificate Included
                    </span>
                  </div>
                )}

                <button className="mt-4 w-full md:w-max px-12 py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-colors duration-500 shadow-lg shadow-black/10">
                  Pesan Sekarang
                </button>

                <p className="text-[10px] text-gray-400 italic">
                  * Estimasi pengerjaan 7-14 hari kerja tergantung kerumitan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
