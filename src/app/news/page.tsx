import prisma from "@/lib/prisma";
import NewsList from "./NewsList";
import { Metadata } from "next";

export default async function NewsPage() {
  const allNews = await prisma.news.findMany({
    where: {
      news_status: "publish",
      news_category: "Berita", // Sesuaikan dengan status di DB Anda
    },
    orderBy: {
      news_date: "desc", // Berita terbaru di atas
    },
    select: {
      news_id: true,
      news_title: true,
      news_description: true,
      news_slug: true,
      news_date: true,
      news_writer: true,
      news_image: true,
      news_category: true,
    },
  });

  return (
    <main className="mt-20">
      {/* Header Berita */}
      <div className="bg-[#1A1A1A] py-20 text-center">
        <h1 className="text-white text-4xl font-light uppercase tracking-[0.3em]">
          Latest <span className="font-bold text-[#D4AF37]">News</span>
        </h1>
      </div>

      <NewsList news={allNews} />
    </main>
  );
}
export const metadata: Metadata = {
  title: "Koleksi Galeri",
  description:
    "Eksplorasi galeri karya seni Wajah Plastik. Setiap guratan adalah potongan sampah plastik yang dirangkai menjadi mahakarya eksklusif.",
  openGraph: {
    images: ["/og-news.jpg"], // Gambar khusus yang memperlihatkan banyak karya
  },
};
