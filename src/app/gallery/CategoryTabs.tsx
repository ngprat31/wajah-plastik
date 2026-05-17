"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryTabs({ activeCategory }: { activeCategory: string }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const categories = [
    { name: "All Works", slug: "all" },
    { name: "Potrait", slug: "custom" },
    { name: "Tematik", slug: "tematik" },
  ];

  return (
    <div className="flex border-b border-gray-100 mb-10 gap-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        
        // Buat URL yang tetap menjaga query pencarian (q) jika ada
        const href = {
          pathname: "/gallery",
          query: {
            ...(q ? { q } : {}),
            ...(cat.slug !== "all" ? { category: cat.slug } : {}),
          },
        };

        return (
          <Link
            key={cat.slug}
            href={href}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative ${
              isActive ? "text-[#D4AF37]" : "text-gray-400 hover:text-[#1A1A1A]"
            }`}
          >
            {cat.name}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}