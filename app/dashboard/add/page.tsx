"use client";

export default function AddProductPage() {
  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Tambah Produk
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">

        <div className="grid gap-6">

          <input
            placeholder="Nama Produk"
            className="rounded-xl border p-4"
          />

          <input
            placeholder="Kategori"
            className="rounded-xl border p-4"
          />

          <input
            placeholder="Harga"
            className="rounded-xl border p-4"
          />

          <input
            placeholder="Stock"
            className="rounded-xl border p-4"
          />

          <textarea
            rows={6}
            placeholder="Deskripsi Produk"
            className="rounded-xl border p-4"
          />

          <input
            type="file"
            className="rounded-xl border p-4"
          />

          <button className="rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700">
            Simpan Produk
          </button>

        </div>

      </div>

    </div>
  );
}