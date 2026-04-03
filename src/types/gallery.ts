// Client-safe type definitions (no Prisma imports)
export interface Gallery {
  gallery_id: number;
  gallery_judul: string;
  gallery_deskripsi: string;
  gallery_kategori: string;
  gallery_image: string | null;
  created_date: Date | null;
  updated_date: Date | null;
  gallery_sertilengkap: string | null;
  gallery_slug: string | null;
}
