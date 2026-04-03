import prisma from "@/lib/prisma";

import Achievements from "@/components/sections/Achievements";
import { Metadata } from "next";

export default async function AchievementPage() {
  const latestAchievements = await prisma.achievement.findMany({
    orderBy: [
      { year: "asc" }, // Urutkan berdasarkan tahun
      { id: "asc" }, // Urutkan berdasarkan ID jika tahunnya sama (seperti di tahun 2019)
    ],
  });

  // Transform year from Date to string
  const formattedAchievements = latestAchievements.map((item) => ({
    ...item,
    year: item.year ? new Date(item.year).getFullYear().toString() : "2019",
  }));

  return (
    <div className="flex flex-col items-center justify-center mt-20 min-h-screen  py-2">
      <Achievements items={formattedAchievements} />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Achievements & Recognition",
  description:
    "Lihat pencapaian dan penghargaan yang telah diraih oleh Wajah Plastik dalam berbagai kegiatan seni dan lingkungan.",
};
