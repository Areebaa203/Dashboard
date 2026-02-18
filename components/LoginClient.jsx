"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  LayoutDashboard,
  Mail,
  Lock,
  ArrowRight,
  Info,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setAuthError("");
    const result = login(data.email, data.password);
    if (result.success) {
      router.push(`/dashboard${result.role}/${result.role}`);
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-black/10">
            <LayoutDashboard size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 mt-2">
            Enter your details to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-semibold">Password</label>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-12 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Auth error */}
            {authError && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{authError}</p>
              </div>
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all mt-6"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-zinc-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Demo Credentials</span>
            </div>
            <div className="space-y-2">
              {[
                { role: "User", email: "user@gmail.com" },
                { role: "Seller", email: "seller@gmail.com" },
                { role: "Admin", email: "admin@gmail.com" },
              ].map(({ role, email }) => (
                <div key={role} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-600 dark:text-zinc-400 w-12">{role}</span>
                  <span className="text-zinc-500 font-mono">{email}</span>
                  <span className="text-zinc-400 font-mono">demo1234</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-black dark:text-white hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
