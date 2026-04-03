// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Cta from "@/components/Cta";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Update Metadata untuk Brand Wajah Plastik
export const metadata: Metadata = {
  metadataBase: new URL("https://wajahplastik.com"),
  title: {
    default: "Wajah Plastik | Art & Exclusive",
    template: "%s | Wajah Plastik", // Contoh: About | Wajah Plastik
  },
  description:
    "Wajah Plastik adalah gerakan seni lingkungan oleh Made Agus Janardana yang mengubah sampah plastik menjadi karya seni eksklusif dan bernilai tinggi.",
  keywords: [
    "wajah plastik",
    "made agus janardana",
    "seni sampah plastik",
    "eco-friendly art Bali",
    "lukisan plastik",
  ],
  authors: [{ name: "Made Agus Janardana" }],
  creator: "Aethelia Systems",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://wajahplastik.com",
    siteName: "Wajah Plastik",
    images: [
      {
        url: "/logo-wp.png", // Pastikan file ini ada di folder public
        width: 1200,
        height: 630,
        alt: "Wajah Plastik Art & Exclusive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wajahplastik",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${poppins.variable} h-full antialiased`}
      style={
        {
          "--brand-gold": "#D4AF37", // Gold Elegan
          "--brand-blue": "#0020C2", // Biru Logo
          "--brand-red": "#FF0000", // Merah Logo
          "--brand-black": "#1A1A1A", // Hitam Soft (bukan pure black)
        } as React.CSSProperties
      }
    >
      <body
        className={`
          min-h-full 
          flex flex-col 
          
          text-[#EAEAEA] // Teks Putih Keabuan agar NYAMAN dibaca
          font-sans 
        `}
      >
        <Navbar />
        <PageTransition>
          <div className="mt-5 min-h-screen">{children}</div>
        </PageTransition>
        <Cta />
        <Footer />
      </body>
    </html>
  );
}
