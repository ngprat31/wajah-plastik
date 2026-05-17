"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBarProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Konfigurasi NProgress
    NProgress.configure({ 
      showSpinner: false, 
      trickleSpeed: 200,
      minimum: 0.3
    });
  }, []);

  useEffect(() => {
    // Selesaikan progress bar setiap kali path atau search params berubah
    NProgress.done();

    // Cleanup untuk memastikan progress bar berhenti jika komponen unmount
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return (
    <style jsx global>{`
      /* Bar Utama - Merah Medis */
      #nprogress .bar {
        background: #e11d48 !important; /* Red-600 */
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px; /* Sedikit lebih tebal agar terlihat tegas */
        box-shadow: 0 0 10px rgba(225, 29, 72, 0.5);
      }

      /* Efek Peg (Ujung Bar) */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #e11d48, 0 0 5px #e11d48;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }

      /* Pastikan font Poppins diterapkan secara global jika belum */
      body {
        font-family: 'Poppins', sans-serif;
        background-color: #ffffff; /* Putih Steril */
        color: #0f172a; /* Hitam/Slate Gelap */
      }
    `}</style>
  );
}