"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "Pemesanan Karya (Commission)",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nomor WA yang sudah Anda berikan sebelumnya
    const phoneNumber = "6285792309880"; 
    
    // Menyusun template pesan agar rapi saat diterima di WA
    const message = `*Pesan Baru dari Website Wajah Plastik*%0A%0A` +
                    `*Nama:* ${formData.nama}%0A` +
                    `*Email:* ${formData.email}%0A` +
                    `*Subjek:* ${formData.subjek}%0A%0A` +
                    `*Pesan:*%0A${formData.pesan}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Membuka tab baru untuk WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-[#1A1A1A]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Nama Lengkap</label>
          <input 
            type="text" 
            name="nama"
            required
            value={formData.nama}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
            placeholder="Contoh: I Gede Bhakti"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
            placeholder="bhakti@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Subjek</label>
        <select 
          name="subjek"
          value={formData.subjek}
          onChange={handleChange}
          className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
        >
          <option>Pemesanan Karya (Commission)</option>
          <option>Kolaborasi Workshop</option>
          <option>Liputan Media</option>
          <option>Lainnya</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Pesan</label>
        <textarea 
          name="pesan"
          rows={5}
          required
          value={formData.pesan}
          onChange={handleChange}
          className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all resize-none"
          placeholder="Tuliskan detail pesanan atau pertanyaan Anda..."
        ></textarea>
      </div>

      <button 
        type="submit"
        className="w-full py-4 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500 shadow-lg"
      >
        Kirim via WhatsApp
      </button>
    </form>
  );
}