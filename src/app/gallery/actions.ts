"use server";

import prisma from "@/lib/prisma";
import type { Gallery } from "@/types/gallery";

export async function getGalleryItems(search?: string) {
  return await prisma.gallery.findMany({
    where: {
      gallery_judul: {
        contains: search || "", // Cari judul yang mengandung kata kunci
        mode: "insensitive", // Tidak peduli huruf besar/kecil
      },
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
