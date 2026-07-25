"use client";

import {
  Package,
  Mail,
  Boxes,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Selamat datang di Sentral Robotic.ID
        </p>
      </div>

      {/* Statistik */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Total Produk"
          value="-"
          icon={<Package size={28} />}
        />

        <Card
          title="Pesan Masuk"
          value="-"
          icon={<Mail size={28} />}
        />

        <Card
          title="Stok Produk"
          value="-"
          icon={<Boxes size={28} />}
        />

        <Card
          title="Aktivitas"
          value="-"
          icon={<Activity size={28} />}
        />

      </div>

      {/* Empty State */}
      <div className="rounded-3xl bg-white p-12 text-center shadow">

        <Package
          size={70}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-6 text-2xl font-bold text-slate-700">
          Belum Ada Data
        </h2>

        <p className="mt-3 text-slate-500">
          Dashboard akan menampilkan statistik secara otomatis
          setelah backend terhubung dengan database.
        </p>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}