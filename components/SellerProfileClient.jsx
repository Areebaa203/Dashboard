"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Calendar, Store } from "lucide-react";

export function SellerProfileClient() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seller Profile</h1>
        <p className="text-zinc-500 mt-2">Manage your shop settings and seller identity.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="h-32 bg-emerald-500" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl border-4 border-white dark:border-zinc-900 flex items-center justify-center text-3xl font-bold">
              {user?.name?.[0]}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Shop Representative</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <User size={18} className="text-zinc-400" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Store Name</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Store size={18} className="text-zinc-400" />
                <span className="text-sm font-medium">{user?.name}'s Boutique</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Business Email</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Mail size={18} className="text-zinc-400" />
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Account Role</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Shield size={18} className="text-zinc-400" />
                <span className="text-sm font-medium capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
