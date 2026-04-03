import React from "react";

export default function GalleryLoading() {
  // Kita buat array dummy untuk 6 kartu skeleton
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <header className="mb-12">
          <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-sm" />
          <div className="h-1 w-20 bg-[#D4AF37]/20 mt-4" />
        </header>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletons.map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white border border-gray-100 overflow-hidden"
            >
              {/* Image Placeholder dengan aspek rasio yang sama dengan galeri asli */}
              <div className="relative aspect-[4/5] bg-gray-200 animate-pulse" />

              {/* Content Placeholder */}
              <div className="p-6">
                <div className="h-3 w-24 bg-gray-100 animate-pulse mb-3" />
                <div className="space-y-2">
                  <div className="h-5 w-full bg-gray-200 animate-pulse" />
                  <div className="h-5 w-2/3 bg-gray-200 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
