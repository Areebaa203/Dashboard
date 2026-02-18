"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  ShieldAlert,
  Activity,
  Globe,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  Database,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminStat = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-6">
    <div
      className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
        color,
      )}
    >
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        <span className="text-emerald-500 text-xs font-bold flex items-center">
          <ArrowUpRight size={14} />
          {trend}%
        </span>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=5");
        const data = await res.json();
        setUsers(
          data.users.map((u, idx) => ({
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            role: idx === 0 ? "Admin" : idx === 1 ? "Seller" : "User",
            status:
              idx % 3 === 0 ? "Active" : idx % 3 === 1 ? "Pending" : "Blocked",
            date: "Oct " + (10 + idx) + ", 2023",
          })),
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock size={16} className="text-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
              Security: Stable
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">System Admin</h1>
          <p className="text-zinc-500">
            Complete control over the platform and infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">
            System Logs
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-black dark:bg-zinc-50 dark:text-black text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10">
            Platform Settings
          </button>
        </div>
      </header>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminStat
          label="Total Users"
          value="42,891"
          trend={5.4}
          icon={Users}
          color="bg-indigo-500"
        />
        <AdminStat
          label="Active Sessions"
          value="1,204"
          trend={12.8}
          icon={Activity}
          color="bg-emerald-500"
        />
        <AdminStat
          label="API Requests"
          value="1.4M"
          trend={8.2}
          icon={Globe}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management Table */}
        <div className="lg:col-span-2 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/10">
            <h2 className="font-bold text-lg">User Management</h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Find users..."
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-1.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/5">
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-zinc-50 dark:border-zinc-900/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-400">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : user.status === "Pending"
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{user.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Infrastructure Health */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Database size={18} className="text-blue-500" />
              Infrastructure
            </h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-zinc-500 uppercase">Database Load</span>
                  <span>24%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[24%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-zinc-500 uppercase">CDN Latency</span>
                  <span>14ms</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[15%]"></div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-500 uppercase">Auth Server</span>
                  <span className="flex items-center gap-1.5 text-emerald-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-6 border border-rose-100 dark:border-rose-900/50">
            <h2 className="font-bold text-lg text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-2">
              <ShieldAlert size={20} />
              Recent Alerts
            </h2>
            <ul className="space-y-4">
              <li className="text-xs font-medium text-rose-600 dark:text-rose-500 flex gap-3">
                <div className="shrink-0 mt-0.5">•</div>
                Failed login attempt from IP 192.168.1.1. (Rate limited)
              </li>
              <li className="text-xs font-medium text-rose-600 dark:text-rose-500 flex gap-3">
                <div className="shrink-0 mt-0.5">•</div>
                Memory usage spike on Node-4.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
