"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Mail,
  Settings,
  LogOut,
  Bot,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produk",
    href: "/dashboard/product",
    icon: Package,
  },
  {
    title: "Pesan",
    href: "/dashboard/contact",
    icon: Mail,
  },
  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col bg-slate-900 text-white shadow-xl">

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-700 px-6 py-6">

        <div className="rounded-xl bg-blue-600 p-3">
          <Bot size={30} />
        </div>

        <div>
          <h1 className="text-lg font-bold">
            Sentral Admin
          </h1>

          <p className="text-xs text-slate-400">
            Sentral Robotik.ID
          </p>
        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-4 py-6">

        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/");

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={22} />

              <span className="font-medium">
                {menu.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white">

          <LogOut size={22} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}