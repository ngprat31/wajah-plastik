"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(true);

  // Setiap kali pathname berubah, paksa status pending jadi true
  useEffect(() => {
    setIsPending(true);

    // Tahan loading selama 1 detik (sesuaikan dengan durasi animasi)
    const timer = setTimeout(() => {
      setIsPending(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1, scaleY: 1 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{
              scaleY: 0,
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 w-full h-screen bg-white origin-top z-[9999] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-32 h-32 mb-4"
            >
              <Image
                src="/logo-wp.png"
                alt="Wajah Plastik Loading"
                fill
                className="object-contain"
                sizes="128px"
                priority
              />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-400">
              Art & Exclusive
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten Halaman: Hanya muncul perlahan setelah isPending false */}
      <motion.div
        key={pathname + "-content"}
        initial={{ opacity: 0 }}
        animate={{ opacity: isPending ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
