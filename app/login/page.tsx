
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("LOGIN MULAI");

    setLoading(true);
    setError("");

    try {
      console.log("SEBELUM SUPABASE");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("SESUDAH SUPABASE");
      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error("SUPABASE ERROR:", error);
        setError(error.message);
        return;
      }

      if (!data.user) {
        setError("User tidak ditemukan.");
        return;
      }

      console.log("LOGIN BERHASIL");
      console.log("USER:", data.user);

      router.push("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      console.log("LOGIN SELESAI");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Sentral Robotic
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sentralrbtk.id"
              required
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

