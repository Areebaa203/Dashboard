"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  LayoutDashboard, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  Github,
  Chrome
} from "lucide-react";

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    // Simulate API call
    console.log("Signup data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Account created successful (check console)");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-black/10">
            <LayoutDashboard size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-zinc-500 mt-2">Join us today and start managing your business</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 font-medium px-1 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all mt-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold bg-white dark:bg-zinc-900 px-4 text-zinc-400">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <Chrome size={18} />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <Github size={18} />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-black dark:text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
