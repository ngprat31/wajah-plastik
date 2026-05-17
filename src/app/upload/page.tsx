'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function BulkUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/upload-bulk', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Berhasil mengunggah ${data.count} event!` });
        setSelectedFiles([]); // Reset file list jika sukses
      } else {
        setMessage({ type: 'error', text: data.error || 'Gagal mengunggah gambar.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan koneksi jaringan.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-xl p-8 border border-zinc-800 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2 tracking-wide text-zinc-100">Bulk Image Upload</h1>
        <p className="text-sm text-zinc-400 mb-6">Nama file otomatis akan digunakan sebagai <span className="text-amber-400">event_judul</span>.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropzone Area */}
          <div className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-lg p-8 text-center cursor-pointer transition relative bg-[#222]">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-zinc-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-zinc-300 font-medium">Klik atau seret beberapa gambar ke sini</p>
              <p className="text-xs text-zinc-500">PNG, JPG, WEBP sampai kapasitas maksimal server</p>
            </div>
          </div>

          {/* Preview List */}
          {selectedFiles.length > 0 && (
            <div className="bg-[#151515] rounded-lg p-4 max-h-60 overflow-y-auto border border-zinc-800 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Daftar File ({selectedFiles.length})</p>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1e1e1e] px-3 py-2 rounded border border-zinc-800 text-sm">
                  <span className="truncate max-w-[70%] text-zinc-300 font-mono text-xs">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300 text-xs transition"
                    disabled={loading}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-400' : 'bg-rose-950/50 border border-rose-800 text-rose-400'}`}>
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || selectedFiles.length === 0}
            className={`w-full py-3 rounded-lg font-medium transition duration-200 tracking-wide ${
              loading || selectedFiles.length === 0
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-100 text-black hover:bg-zinc-200 shadow-md'
            }`}
          >
            {loading ? 'Mengunggah & Menyimpan...' : `Upload ${selectedFiles.length} Gambar`}
          </button>
        </form>
      </div>
    </div>
  );
}