import prisma from "@/lib/prisma";
import EventGallery from "./EventClient";
import { Metadata } from "next";

export default async function EventPage() {
  // Ambil data event dari Prisma
  const events = await prisma.event.findMany({
    orderBy: {
      event_id: "desc", // Atau sesuaikan dengan field tanggal jika ada
    },
  });

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-bold">
            Moments & Journey
          </span>
          <h1 className="text-4xl font-light tracking-widest text-[#1A1A1A] uppercase mt-2">
            Events
          </h1>
          <div className="h-px w-20 bg-[#D4AF37] mt-6" />
        </header>

        {events.length > 0 ? (
          <EventGallery items={events} />
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-200">
            <p className="text-gray-400 italic text-sm">
              Belum ada dokumentasi event saat ini.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Events",
  description:
    "Jelajahi momen dan perjalanan Wajah Plastik melalui berbagai event yang telah kita selenggarakan.",
};
