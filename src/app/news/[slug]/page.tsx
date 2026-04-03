import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { Metadata } from "next";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const news = await prisma.news.findUnique({
    where: { news_slug: slug },
  });

  if (!news) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.news_title,
    image: [getCloudinaryUrl(news.news_image)],
    datePublished: news.news_date?.toISOString(),
    dateModified:
      news.updated_date?.toISOString() || news.news_date?.toISOString(),
    author: [
      {
        "@type": "Person",
        name: news.news_writer || "Admin Wajah Plastik",
        url: "https://wajahplastik.com",
      },
    ],
  };

  const displayDate = news.news_date
    ? new Date(news.news_date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal tidak tersedia";

  return (
    <article className="min-h-screen bg-white pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container Utama (Lebar Medium biasanya sekitar 700px - 800px untuk teks) */}
      <div className="max-w-[720px] mx-auto px-6">
        {/* Header: Judul & Subtitle */}
        <header className="mb-10">
          <h1 className="text-[32px] md:text-[42px] font-bold text-[#242424] leading-[1.2] tracking-tight mb-6">
            {news.news_title}
          </h1>

          {/* Info Penulis Ala Medium */}
          <div className="flex items-center justify-between py-6 border-y border-gray-100 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold overflow-hidden">
                {/* Avatar Placeholder */}
                {news.news_writer?.charAt(0) || "W"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#242424] hover:underline cursor-pointer">
                  {news.news_writer || "Editorial Team"}
                </span>
                <span className="text-sm text-gray-500 font-light">
                  {displayDate} · 5 min read
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-gray-500">
              <Share2
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
              <Bookmark
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
              <MoreHorizontal
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Featured Image (Full Width ala Medium) */}
        {news.news_image && (
          <figure className="mb-12 -mx-6 md:-mx-20">
            <div className="relative aspect-[16/9] w-full bg-gray-50">
              <Image
                src={getCloudinaryUrl(news.news_image)}
                alt={news.news_title || "Featured Image"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            {news.news_source && (
              <figcaption className="text-center text-sm text-gray-400 mt-4 font-light">
                Source: <span className="italic">{news.news_source}</span>
              </figcaption>
            )}
          </figure>
        )}

        {/* Konten Berita */}
        <main>
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.news_content || "" }}
          />

          {/* Tags (Bottom) */}
          {news.news_tags && (
            <div className="mt-16 flex flex-wrap gap-2">
              {news.news_tags.split(",").map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </main>

        {/* Footer Area */}
        <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
          <Link
            href="/news"
            className="text-[#D4AF37] font-medium hover:underline"
          >
            Lihat semua cerita dari Wajah Plastik
          </Link>
        </footer>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const news = await prisma.news.findUnique({
    where: { news_slug: slug },
    select: {
      news_title: true,
      news_description: true,
      news_image: true,
      news_tags: true,
    },
  });

  if (!news) return { title: "News Not Found | Wajah Plastik" };

  // Bersihkan deskripsi untuk meta tag (maks 160 karakter)
  const plainDesc = news.news_description
    ? news.news_description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160)
    : "Berita terbaru dari Wajah Plastik - Art & Exclusive.";

  const imageUrl = news.news_image
    ? getCloudinaryUrl(news.news_image)
    : "/og-default.jpg";

  return {
    title: `${news.news_title} | Wajah Plastik`,
    description: plainDesc,
    keywords: news.news_tags || "wajah plastik, seni plastik, bali art",
    openGraph: {
      title: news.news_title || "",
      description: plainDesc,
      url: `https://wajahplastik.com/news/${slug}`,
      siteName: "Wajah Plastik",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.news_title || "Wajah Plastik News",
        },
      ],
      locale: "id_ID",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.news_title || "",
      description: plainDesc,
      images: [imageUrl],
    },
  };
}
