"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { href: "/dashboard/user", icon: User, label: "Overview" },
  { href: "/dashboard/user/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/dashboard/user/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/dashboard/user/profile", icon: User, label: "Profile" },
];

const SidebarItem = ({ href, icon: Icon, label, active }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
      active
        ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-semibold"
        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white"
    )}
  >
    <Icon size={18} />
    <span className="text-sm">{label}</span>
  </Link>
);

export function UserSidebar({ className }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={cn("flex flex-col h-full bg-white dark:bg-black p-6", className)}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
          <User className="text-white" size={20} />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight block leading-none">User</span>
          <span className="text-xs text-zinc-400">Dashboard</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-4 mb-3">Menu</p>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-1">
        <SidebarItem
          href="/dashboard/user/settings"
          icon={Settings}
          label="Settings"
          active={pathname === "/dashboard/user/settings"}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be redirected to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white border-none"
              >
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
