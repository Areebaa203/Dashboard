"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Shield, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Ban,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminUsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=10');
        const data = await res.json();
        setUsers(data.users.map((u, idx) => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          role: idx === 0 ? "Super Admin" : idx % 3 === 0 ? "Admin" : idx % 2 === 0 ? "Seller" : "User",
          status: idx % 4 === 0 ? "Active" : idx % 4 === 1 ? "Pending" : idx % 4 === 2 ? "Inactive" : "Blocked",
          avatar: u.image,
          joined: "Oct " + (idx + 1) + ", 2023"
        })));
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
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Global User Registry</h1>
          <p className="text-zinc-500 mt-1">Manage and audit all user accounts across the platform.</p>
        </div>
        <button className="flex items-center gap-2 bg-black dark:bg-zinc-50 dark:text-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10">
          <UserPlus size={18} />
          Create User
        </button>
      </header>

      <div className="bg-white dark:bg-black rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/30 dark:bg-zinc-900/10">
          <div className="relative flex-1 max-w-lg font-medium">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
              <Filter size={16} className="text-zinc-400" />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
              <ArrowUpDown size={16} className="text-zinc-400" />
              Order By
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-black border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/10 dark:bg-zinc-900/5">
                <th className="px-8 py-6">Identity</th>
                <th className="px-6 py-6">Administrative Role</th>
                <th className="px-6 py-6">Current Status</th>
                <th className="px-6 py-6">Joined Date</th>
                <th className="px-8 py-6 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-zinc-50 dark:border-zinc-900/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-zinc-100 dark:border-zinc-800 group-hover:border-blue-500/20 transition-all">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">{user.name}</p>
                        <p className="text-xs text-zinc-500 lowercase font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center",
                        user.role.includes("Admin") ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400" :
                        user.role === "Seller" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" :
                        "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      )}>
                        <Shield size={14} />
                      </div>
                      <span className="font-bold text-xs">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      user.status === "Active" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" :
                      user.status === "Pending" ? "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" :
                      user.status === "Inactive" ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" :
                      "bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-zinc-500 font-medium">{user.joined}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-500 hover:text-black dark:hover:text-white transition-all" title="View Profile">
                        <Mail size={16} />
                      </button>
                      <button className="p-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl text-zinc-400 hover:text-rose-500 transition-all" title="Suspend User">
                        <Ban size={16} />
                      </button>
                      <button className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-500 transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/5 flex items-center justify-between">
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Page 1 of 82 • 1,204 Total Users</p>
          <div className="flex items-center gap-3">
            {[1, 2, 3, "...", 82].map((p, idx) => (
              <button 
                key={idx} 
                className={cn(
                  "w-10 h-10 rounded-xl text-xs font-bold transition-all",
                  p === 1 ? "bg-black text-white dark:bg-white dark:text-black shadow-lg" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
