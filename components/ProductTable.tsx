"use client";

import Image from "next/image";
import { Pencil, Trash2, Package } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-16 shadow">

        <div className="flex flex-col items-center justify-center">

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

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow">

      <table className="w-full">

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
              className="border-t"
            >

              <td className="flex items-center gap-4 p-5">

                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    ID : {product.id}
                  </p>

                </div>

              </td>

              <td>{product.category}</td>

              <td>
                Rp {product.price.toLocaleString("id-ID")}
              </td>

              <td>{product.stock}</td>

              <td>

                <div className="flex justify-center gap-3">

                  <button className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-700">

                    <Pencil size={18} />

                  </button>

                  <button className="rounded-xl bg-red-600 p-2 text-white hover:bg-red-700">

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