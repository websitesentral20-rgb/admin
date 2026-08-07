"use client";

import Image from "next/image";
import { Pencil, Trash2, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  image_url: string | null;
  price: number;
  stock: number;
  status?: string | null;
}

interface Props {
  refreshKey?: number;
}

export default function ProductTable({
  refreshKey = 0,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, description, category, image_url, price, stock, status"
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Gagal mengambil produk:", error);
      return;
    }

    setProducts((data as Product[]) || []);
  }

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      if (active) {
        setLoading(true);
      }

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, description, category, image_url, price, stock, status"
        )
        .order("created_at", {
          ascending: false,
        });

      if (!active) return;

      if (error) {
        console.error(
          "Gagal mengambil produk:",
          error
        );

        setProducts([]);
        setLoading(false);
        return;
      }

      setProducts((data as Product[]) || []);
      setLoading(false);
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  async function handleDelete(id: string) {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?"
    );

    if (!yakin) return;

    setDeleting(id);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Gagal menghapus produk:",
        error
      );

      alert(
        `Gagal menghapus produk: ${error.message}`
      );

      setDeleting(null);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );

    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Memuat produk...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center">
        <Package
          size={70}
          className="text-slate-300"
        />

        <h2 className="mt-6 text-2xl font-bold text-slate-700">
          Belum Ada Produk
        </h2>

        <p className="mt-3 max-w-md text-center text-slate-500">
          Produk yang ditambahkan melalui Admin akan
          muncul di halaman ini secara otomatis.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-5 text-left">
              Produk
            </th>

            <th className="text-left">
              Kategori
            </th>

            <th className="text-left">
              Harga
            </th>

            <th className="text-left">
              Stok
            </th>

            <th className="text-center">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-slate-200"
            >
              {/* Produk */}
              <td className="flex items-center gap-4 p-5">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={60}
                    height={60}
                    unoptimized
                    className="h-[60px] w-[60px] rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-slate-100">
                    <Package
                      size={28}
                      className="text-slate-400"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    ID : {product.id}
                  </p>
                </div>
              </td>

              {/* Kategori */}
              <td>
                {product.category || "-"}
              </td>

              {/* Harga */}
              <td>
                Rp{" "}
                {Number(
                  product.price || 0
                ).toLocaleString("id-ID")}
              </td>

              {/* Stok */}
              <td>
                {product.stock ?? 0}
              </td>

              {/* Aksi */}
              <td>
                <div className="flex justify-center gap-3">

                  {/* Edit */}
                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                    title="Edit produk"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    disabled={
                      deleting === product.id
                    }
                    className="rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Hapus produk"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}