"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductModal({
  open,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  // Pilih gambar
  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validasi tipe gambar
    if (
      ![
        "image/png",
        "image/jpeg",
        "image/webp",
      ].includes(file.type)
    ) {
      setError("Format gambar harus PNG, JPG atau WEBP.");
      return;
    }

    // Validasi ukuran maksimal 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB.");
      return;
    }

    setError("");
    setImage(file);

    // Buat preview gambar
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  }

  // Simpan produk
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Nama produk wajib diisi.");
      return;
    }

    if (!category) {
      setError("Silakan pilih kategori.");
      return;
    }

    if (!price || Number(price) < 0) {
      setError("Harga produk tidak valid.");
      return;
    }

    if (!image) {
      setError("Silakan pilih gambar produk.");
      return;
    }

    setLoading(true);

    try {
      /*
       * =====================================
       * 1. UPLOAD GAMBAR KE SUPABASE STORAGE
       * =====================================
       */

      const fileExtension =
        image.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      const filePath = `products/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("products")
          .upload(filePath, image, {
            cacheControl: "3600",
            upsert: false,
            contentType: image.type,
          });

      if (uploadError) {
        throw new Error(
          `Gagal upload gambar: ${uploadError.message}`
        );
      }

      /*
       * =====================================
       * 2. AMBIL URL GAMBAR
       * =====================================
       */

      const { data: imageData } =
        supabase.storage
          .from("products")
          .getPublicUrl(filePath);

      const imageUrl = imageData.publicUrl;

      /*
       * =====================================
       * 3. SIMPAN DATA PRODUK KE DATABASE
       * =====================================
       */

      const { error: insertError } =
        await supabase.from("products").insert({
          name: name.trim(),
          category,
          price: Number(price),
          stock: Number(stock || 0),
          description: description.trim(),
          image_url: imageUrl,
          status: "active",
        });

      if (insertError) {
        throw new Error(
          `Gagal menyimpan produk: ${insertError.message}`
        );
      }

      /*
       * =====================================
       * 4. BERHASIL
       * =====================================
       */

      setName("");
      setCategory("");
      setStock("");
      setPrice("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setError("");

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      {/* Modal */}
      <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-3">

          <div>
            <h2 className="text-2xl font-bold text-black">
              Tambah Produk
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Tambahkan produk baru
            </p>
          </div>

          {/* Tombol X */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            aria-label="Tutup"
          >
            <X size={19} />
          </button>

        </div>

        {/* Isi Modal */}
        <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Upload */}
            <div>

              <label className="mb-2 block font-semibold text-black">
                Gambar Produk
              </label>

              <label className="group relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/30 px-4 transition hover:border-blue-500 hover:bg-blue-50">

                {imagePreview ? (
                  <>
                    {/* Preview gambar */}
                    <img
                      src={imagePreview}
                      alt="Preview produk"
                      className="h-full w-full rounded-xl object-contain"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                      <p className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                        Ganti gambar
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload
                      size={40}
                      className="text-blue-400 transition group-hover:text-blue-500"
                    />

                    <p className="mt-3 font-medium text-blue-500">
                      Klik untuk upload gambar
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG atau WEBP
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

              </label>

              {/* Nama file */}
              {image && (
                <p className="mt-2 truncate text-xs text-slate-500">
                  {image.name}
                </p>
              )}

            </div>

            {/* Nama Produk */}
            <div>

              <label className="mb-2 block font-semibold text-black">
                Nama Produk
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Masukkan nama produk"
                className="w-full rounded-xl border border-slate-300 p-4 text-black outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />

            </div>

            {/* Grid */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Kategori */}
              <div>

                <label className="mb-2 block font-semibold text-black">
                  Kategori
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                >

                  <option value="">
                    Pilih kategori
                  </option>

                  <option value="Arduino">
                    Arduino
                  </option>

                  <option value="ESP32">
                    ESP32
                  </option>

                  <option value="Sensor">
                    Sensor
                  </option>

                  <option value="Motor">
                    Motor
                  </option>

                </select>

              </div>

              {/* Stok */}
              <div>

                <label className="mb-2 block font-semibold text-black">
                  Stok
                </label>

                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-300 p-4 text-black outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>

            </div>

            {/* Harga */}
            <div>

              <label className="mb-2 block font-semibold text-black">
                Harga
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10">

                <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 font-semibold text-slate-600">
                  Rp
                </span>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="0"
                  className="w-full p-4 text-black outline-none placeholder:text-slate-400"
                />

              </div>

            </div>

            {/* Deskripsi */}
            <div>

              <label className="mb-2 block font-semibold text-black">
                Deskripsi
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Masukkan deskripsi produk..."
                className="w-full resize-none rounded-xl border border-slate-300 p-4 text-black outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />

            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Menyimpan..."
                  : "Simpan Produk"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}