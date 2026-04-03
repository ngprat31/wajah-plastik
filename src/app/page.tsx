import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ThematicGallery from "@/components/sections/ThematicGallery";
import Values from "@/components/sections/Values";
import prisma from "@/lib/prisma";
import Youtube from "@/components/sections/Youtube";
import Achievements from "@/components/sections/Achievements";
import Team from "@/components/sections/Team";
import { Metadata } from "next";
import Image from "next/image";

export default async function Home() {
  const thematicWorks = await prisma.gallery.findMany({
    where: {
      gallery_kategori: "Tematik", // Memastikan hanya kategori tematik yang muncul
    },
    orderBy: {
      gallery_id: "asc",
    },
  });
  const latestVideos = await prisma.youtube.findMany({
    orderBy: {
      youtube_id: "desc",
    },
    take: 6,
  });

  const latestAchievements = await prisma.achievement.findMany({
    orderBy: [
      { year: "asc" }, // Urutkan berdasarkan tahun
      { id: "asc" }, // Urutkan berdasarkan ID jika tahunnya sama (seperti di tahun 2019)
    ],
    take: 6,
  });

  // Transform year from Date to string
  const formattedAchievements = latestAchievements.map((item) => ({
    ...item,
    year: item.year ? new Date(item.year).getFullYear().toString() : "2019",
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
      <Hero />
      <Intro />
      <Values />
      <ThematicGallery items={thematicWorks} />
      <Youtube items={latestVideos} />
      <Achievements items={formattedAchievements} />
      <Team />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Wajah Plastik - Transformasi Sampah Menjadi Karya Seni",
  description:
    "Selamat datang di Wajah Plastik. Temukan koleksi karya seni eksklusif yang lahir dari kepedulian lingkungan dan kreativitas tanpa batas di Bali.",
};
