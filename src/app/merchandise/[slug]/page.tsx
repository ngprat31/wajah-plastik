import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function MerchandiseDetailPage({ params }: { params: { slug: string } }) {
  // Nanti ganti dengan fetch data berdasarkan slug: 
  // const product = await prisma.merchandise.findUnique({ where: { slug: params.slug } })
  
  const product = {
    name: "Tote Bag Artcycle",
    price: 150000,
    description: "Tote bag eksklusif yang dibuat dengan sentuhan seni 'Artcycle' khas Wajah Plastik. Terbuat dari bahan kanvas premium dengan aksen limbah plastik kemasan yang telah disterilkan dan disusun menjadi motif estetik.",
    image: "https://res.cloudinary.com/dskzbz06t/image/upload/v1/sample-merch.jpg",
    category: "Accessories"
  };

  const waNumber = "6285792309880";
  const waMessage = `Halo Wajah Plastik, saya tertarik membeli *${product.name}* seharga Rp ${product.price.toLocaleString("id-ID")}.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-white py-24 px-6 text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <Link href="/merchandise" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] mb-12 transition-colors">
          <ChevronLeft size={14} className="mr-2" /> Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 border border-gray-100 overflow-hidden shadow-2xl shadow-black/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8 pt-4">
            <div>
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl font-light uppercase tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-gray-800">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="prose prose-neutral text-gray-500 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center py-5 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500 shadow-xl"
              >
                Pesan Melalui WhatsApp
              </a>
              <p className="text-[9px] text-gray-400 mt-4 text-center uppercase tracking-widest">
                Pengiriman tersedia ke seluruh Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}