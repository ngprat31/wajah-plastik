export function getCloudinaryUrl(publicId: string | null) {
  if (!publicId) return "";

  // 1. BUANG KARAKTER ENTER & SPASI DI UJUNG
  // Kita buang \n (newline), \r (carriage return), dan \t (tab)
  let cleanId = publicId.replace(/[\n\r\t]/g, "").trim();

  // 2. CEK JIKA SUDAH URL LENGKAP
  if (cleanId.startsWith("http")) return cleanId;

  // 3. CEK DOUBLE EXTENSION
  // Jika di DB sudah ada ".webp", kita hapus dulu supaya tidak jadi ".webp.webp"
  cleanId = cleanId.replace(/\.webp$/i, "");

  // 4. HANDLE SPASI (Sangat Penting!)
  // Sesuai inspect Anda "Workshop Wajah Plastik...", spasi harus di-encode
  const encodedId = encodeURIComponent(cleanId);

  // 5. BASE URL (Tanpa folder sesuai contoh yang berhasil)
  return `https://res.cloudinary.com/dskzbz06t/image/upload/q_auto,f_auto/${encodedId}.webp`;
}
