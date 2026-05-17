"use server";

import prisma from "@/lib/prisma";
import type { Gallery } from "@/types/gallery";


export async function getGalleryItems(search?: string, category?: string) {
  return await prisma.gallery.findMany({
    where: {
      AND: [
        {
          gallery_judul: {
            contains: search || "", 
            mode: "insensitive", 
          },
        },
        // Jika category ada dan bukan "all", tambahkan filter kategori
        ...(category && category !== "all" 
          ? [
              {
                gallery_kategori: {
                  equals: category,
                  mode: "insensitive" as const, // Pastikan mencocokkan "Potrait" atau "Tematik"
                },
              },
            ] 
          : []),
      ],
    },
    orderBy: {
      created_date: "desc",
    },
  });
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  try {
    const item = await prisma.gallery.findUnique({
      where: { gallery_slug: slug },
    });
    return item as Gallery | null;
  } catch (error) {
    console.error("[Server Action] Error fetching gallery item:", error);
    throw new Error("Failed to fetch gallery item");
  }
}
