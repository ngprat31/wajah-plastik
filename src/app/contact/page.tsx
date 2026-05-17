import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail,  } from "lucide-react";

export const metadata = {
  title: "Hubungi Kami",
  description: "Hubungi tim Wajah Plastik untuk pemesanan karya seni khusus, kolaborasi, atau informasi workshop lingkungan.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] py-24 px-6 text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-tight">
            Mari Berdiskusi Tentang <br />
            <span className="font-black italic text-[#D4AF37]">Seni & Lingkungan</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Bagian Kiri: Info Kontak */}
          <div className="space-y-12">
            <div className="prose prose-neutral">
              <p className="text-gray-500 leading-relaxed text-lg">
                Punya pertanyaan mengenai karya spesifik atau ingin mengundang Made Agus Janardana untuk workshop? Kami siap membantu Anda.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-sm text-[#D4AF37]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Workshop & Gallery</h4>
                  <p className="text-sm">Tejakula, Buleleng, Bali, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-sm text-[#D4AF37]">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">WhatsApp</h4>
                  <p className="text-sm">+62 857-9230-9880</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-sm text-[#D4AF37]">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email</h4>
                  <p className="text-sm">hello@wajahplastik.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Contact Form */}
          <div className="bg-white p-8 md:p-12 shadow-2xl shadow-black/5 border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}