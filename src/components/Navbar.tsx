"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Merchandise", href: "/merchandise" },
  { name: "News", href: "/news" },
  { name: "Event", href: "/event" },
  { name: "Book", href: "/book" },
  { name: "Achievement", href: "/achievement" },
  { name: "Youtube", href: "/youtube" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk Mobile Menu

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu otomatis saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${
          isScrolled || isOpen
            ? "bg-white/95 backdrop-blur-md py-4 shadow-sm"
            : "bg-white py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            {/* Logo Container dengan animasi putar */}
            <div className="relative w-10 h-10 group cursor-pointer">
              <div className=" relative w-full h-full hover:animate-[spin_1s_linear] group-hover:animate-none transition-transform duration-500">
                <Image
                  src="/favicon-32x32.png"
                  alt="Logo Wajah Plastik"
                  sizes="(max-width: 768px) 128px, 128px" // Memberitahu browser estimasi ukuran gambar
                  className="object-contain" // Agar logo tidak terdistorsi (tetap proporsional)
                  priority
                  fill // Penting untuk Logo agar dimuat paling awal
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter leading-none text-[#1A1A1A]">
                <span className="text-[#FF0000]">Wajah</span> Plastik
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">
                Different, Unique, Classy 
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? "text-[#D4AF37] font-semibold"
                        : "text-gray-600 group-hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.name}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Burger Button (Mobile Only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-[110] p-2 flex flex-col gap-1.5 items-end group"
            aria-label="Toggle Menu"
          >
            <div
              className={`h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-[8px]" : "w-8"}`}
            />
            <div
              className={`h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isOpen ? "opacity-0" : "w-6"}`}
            />
            <div
              className={`h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-[8px]" : "w-4 group-hover:w-8"}`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-white transition-all duration-700 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-10 text-center">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-all duration-500 delay-[${i * 50}ms] ${
                pathname === link.href
                  ? "text-[#D4AF37] scale-110"
                  : "text-[#1A1A1A]"
              } ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px w-12 bg-[#D4AF37] my-4" />

          <button className="px-10 py-4 border border-[#1A1A1A] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all">
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
}
