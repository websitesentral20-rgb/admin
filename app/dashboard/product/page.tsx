"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import ProductModal from "@/components/ProductModal";
import ProductTable, { Product } from "@/components/ProductTable";

export default function ProductPage() {

  const [open, setOpen] = useState(false);

  // API Ready
  const [products] = useState<Product[]>([]);

  return (
    <>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Manajemen Produk
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola seluruh produk website.
            </p>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >

            <Plus size={20} />

            Tambah Produk

          </button>

        </div>

        {/* Search */}
        <div className="rounded-2xl bg-white p-4 shadow">

          <div className="flex items-center gap-3 rounded-xl border px-4">

            <Search className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full py-4 outline-none"
            />

          </div>

        </div>

        <ProductTable
          products={products}
        />

      </div>

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}