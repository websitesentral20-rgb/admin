"use client";

import {
  Search,
  Mail,
  Eye,
  Trash2,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Pesan Contact
        </h1>

        <p className="mt-2 text-slate-500">
          Daftar pesan yang dikirim dari website publik.
        </p>

      </div>

      {/* Search */}
      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Cari pesan..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-5 outline-none focus:border-blue-600"
        />

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Nama</th>

              <th className="text-left">Email</th>

              <th className="text-left">Pesan</th>

              <th className="text-left">Status</th>

              <th className="text-center">Aksi</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td
                colSpan={5}
                className="py-24 text-center"
              >

                <Mail
                  size={60}
                  className="mx-auto text-slate-300"
                />

                <h2 className="mt-5 text-2xl font-bold text-slate-700">
                  Belum Ada Pesan
                </h2>

                <p className="mt-2 text-slate-500">
                  Semua pesan dari website publik akan muncul di sini.
                </p>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}