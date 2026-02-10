"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  User, 
  Store, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

const SidebarItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-black text-white shadow-lg shadow-black/10 dark:bg-zinc-800 dark:text-zinc-50" 
          : "text-zinc-500 hover:bg-zinc-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      )}
    >
      <Icon size={20} className={cn("transition-transform duration-200", active ? "scale-110" : "group-hover:scale-110")} />
      <span className="font-medium flex-1">{label}</span>
      {active && <ChevronRight size={16} className="opacity-50" />}
    </Link>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const [showSignOutConfirm, setShowSignOutConfirm] = React.useState(false);

  const menuItems = [
    { href: "/dashboard/user", icon: User, label: "User Dashboard" },
    { href: "/dashboard/seller", icon: Store, label: "Seller Dashboard" },
    { href: "/dashboard/admin", icon: ShieldCheck, label: "Admin Dashboard" },
  ];

  const handleSignOut = () => {
    if (showSignOutConfirm) {
      alert("Signing out...");
      setShowSignOutConfirm(false);
    } else {
      setShowSignOutConfirm(true);
      setTimeout(() => setShowSignOutConfirm(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 w-72 p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-black dark:bg-zinc-800 rounded-xl flex items-center justify-center">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">Dashboard</span>
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-4 mb-4">Dashboards</p>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.href} 
            {...item} 
            active={pathname === item.href} 
          />
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-2">
        <SidebarItem href="/dashboard/settings" icon={Settings} label="Settings" active={pathname === "/dashboard/settings"} />
        <button 
          onClick={handleSignOut}
          className={cn(
            "flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
            showSignOutConfirm 
              ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20" 
              : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          )}
        >
          <LogOut size={20} />
          <span>{showSignOutConfirm ? "Confirm Sign Out?" : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );
}
