"use client";

import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome Back Boyyyy👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={24}
            className="text-slate-600"
          />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-blue-600"
          />

          <div>

            <h2 className="font-semibold">
              Sentral Robotik
            </h2>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}