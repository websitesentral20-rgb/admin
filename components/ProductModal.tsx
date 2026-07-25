"use client";

import { X, Upload } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Tambah Produk
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        <form className="space-y-6">

          {/* Upload */}
          <div>

            <label className="mb-2 block font-semibold">
              Gambar Produk
            </label>

            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500">

              <Upload
                size={40}
                className="text-slate-400"
              />

              <p className="mt-3 text-slate-500">
                Klik untuk upload gambar
              </p>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

          {/* Nama */}
          <div>

            <label className="mb-2 block font-semibold">
              Nama Produk
            </label>

            <input
              type="text"
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-600"
            />

          </div>

          {/* Grid */}
          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">
                Kategori
              </label>

              <select className="w-full rounded-xl border p-4">

                <option>Arduino</option>
                <option>ESP32</option>
                <option>Sensor</option>
                <option>Motor</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Stok
              </label>

              <input
                type="number"
                className="w-full rounded-xl border p-4"
              />

            </div>

          </div>

          {/* Harga */}
          <div>

            <label className="mb-2 block font-semibold">
              Harga
            </label>

            <input
              type="number"
              className="w-full rounded-xl border p-4"
            />

          </div>

          {/* Deskripsi */}
          <div>

            <label className="mb-2 block font-semibold">
              Deskripsi
            </label>

            <textarea
              rows={5}
              className="w-full rounded-xl border p-4"
            />

          </div>

          {/* Button */}
          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Simpan Produk
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}   