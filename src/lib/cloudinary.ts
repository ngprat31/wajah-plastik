export function getCloudinaryUrl(publicId: string | null) {
  if (!publicId) return "";

  // 1. BUANG KARAKTER ENTER & SPASI DI UJUNG
  let cleanId = publicId.replace(/[\n\r\t]/g, "").trim();

  // 2. CEK JIKA SUDAH URL LENGKAP
  if (cleanId.startsWith("http")) return cleanId;

  // 3. CEK DOUBLE EXTENSION
  cleanId = cleanId.replace(/\.webp$/i, "");

  // 4. FIX HANDLE SPASI (Tanpa merusak tanda / folder)
  // Alih-alih encodeURIComponent secara total, kita gunakan .replace untuk mengubah spasi menjadi %20 saja
  const encodedId = cleanId.replace(/ /g, "%20");

  // 5. BASE URL Cloudinary Anda
  return `https://res.cloudinary.com/dskzbz06t/image/upload/q_auto,f_auto/${encodedId}.webp`;
}