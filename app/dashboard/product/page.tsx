"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import ProductModal from "@/components/ProductModal";
import ProductTable from "@/components/ProductTable";

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleProductSaved() {
    setOpen(false);
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-black">
            Manajemen Produk
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola seluruh produk website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={20} />
          Tambah Produk
        </button>

      </div>

      {/* Search */}
      <div className="rounded-2xl bg-slate-100 p-4 text-black shadow">

        <div className="flex items-center gap-3 rounded-xl border bg-white px-4">

          <Search className="text-black" />

          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full py-4 outline-none"
          />

        </div>

      </div>

      {/* Product Table */}
      <ProductTable refreshKey={refreshKey} />

      {/* Product Modal */}
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSaved={handleProductSaved}
      />

    </div>
  );
}