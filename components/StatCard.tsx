"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div className={`${color} rounded-xl p-4 text-white`}>
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}   