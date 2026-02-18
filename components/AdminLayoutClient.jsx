"use client";

import React, { useEffect } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Search, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function AdminLayoutClient({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (user && user.role !== "admin") {
            router.replace(`/dashboard${user.role}/${user.role}`);
        }
    }, [user, loading, router]);

    if (loading || (user && user.role !== "admin")) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
            </div>
        );
    }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all relative">
              <Bell size={18} className="text-zinc-600 dark:text-zinc-400" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold leading-none">{user?.name ?? "Admin"}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{user?.email}</p>
              </div>
              <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0] ?? "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
