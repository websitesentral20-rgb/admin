"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="ml-72">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}