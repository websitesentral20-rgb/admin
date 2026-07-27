"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Bot } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 items-center justify-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative text-center text-white px-10">
          <div className="mx-auto w-28 h-28 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
            <Bot size={60} />
          </div>

          <h1 className="mt-8 text-5xl font-bold">
            SENTRAL
            <span className="text-cyan-300"> ROBOTIC.ID</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Dashboard Administrator
            <br />
            Kelola Produk, Pesan, dan Website
            <br />
            secara mudah dan cepat.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 bg-gray-50 flex justify-center items-center px-6">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-2xl p-10">

            <h2 className="text-3xl font-bold text-gray-800">
              Login Admin
            </h2>

            <p className="text-gray-500 mt-2">
              Selamat datang kembali 👋
            </p>

            <form className="mt-8 space-y-6">

              <div>
                <label className="text-sm text-gray-600">
                  Email
                </label>

                <div className="mt-2 flex items-center border rounded-xl px-4 h-14">
                  <Mail className="text-gray-400 mr-3" size={20} />

                  <input
                    type="email"
                    placeholder="admin@sentralrobotic.id"
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Password
                </label>

                <div className="mt-2 flex items-center border rounded-xl px-4 h-14">

                  <Lock className="text-gray-400 mr-3" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="flex-1 outline-none bg-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff
                        className="text-gray-400"
                        size={20}
                      />
                    ) : (
                      <Eye
                        className="text-gray-400"
                        size={20}
                      />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
              >
                Login
              </button>

            </form>

            <div className="mt-8 border-t pt-6 text-center">

              <p className="text-sm text-gray-500">
                © 2026 Sentral Robotic.ID
              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}