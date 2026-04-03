// src/app/gallery/SearchInput.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/gallery?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Cari karya..."
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-white border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
      />
      {isPending && (
        <div className="absolute right-3 top-2.5 animate-spin h-4 w-4 border-2 border-[#D4AF37] border-t-transparent rounded-full" />
      )}
    </div>
  );
}
