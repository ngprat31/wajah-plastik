import Intro from "@/components/sections/Intro";
import Team from "@/components/sections/Team";

import Values from "@/components/sections/Values";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export default async function About() {
  return (
    <div className="flex flex-col mt-20 items-center justify-center min-h-screen  py-2">
      <Intro />
      <Values />

      <Team />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Tentang Kami & Sang Kreator",
  description:
    "Mengenal lebih dekat Made Agus Janardana (Agus Janar), sosok di balik Wajah Plastik yang mendedikasikan hidupnya untuk seni dan lingkungan.",
};
