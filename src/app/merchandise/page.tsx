import MerchandiseClient from "./MerchandiseClient";
// import { prisma } from "@/lib/prisma"; // Jika sudah ada database

export default async function MerchandisePage() {
  // Contoh data dummy, nanti bisa diganti dengan: await prisma.merchandise.findMany()
  const merchandiseList = [
    {
      id: "1",
      name: "Tote Bag Artcycle",
      slug: "tote-bag-artcycle",
      price: 150000,
      image: "https://res.cloudinary.com/dskzbz06t/image/upload/v1/sample-merch.jpg",
      category: "Accessories"
    },
    // ... item lainnya
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
            Limited Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tighter">
            Wajah Plastik <span className="font-black italic">Merchandise</span>
          </h1>
        </header>

        <MerchandiseClient items={merchandiseList} />
      </div>
    </main>
  );
}