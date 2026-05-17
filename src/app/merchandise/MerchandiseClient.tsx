"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MerchandiseClient({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/merchandise/${item.slug}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
            
            <div className="mt-6 space-y-2 text-center md:text-left">
              <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">
                {item.category}
              </p>
              <h3 className="text-lg font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
                {item.name}
              </h3>
              <p className="text-sm font-light text-gray-500">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}