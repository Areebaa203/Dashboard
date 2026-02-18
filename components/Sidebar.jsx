"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  User, 
  Store, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight,
  ClipboardList,
  ShoppingBag,
  Heart,
  Package,
  Users
} from "lucide-react";

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const SidebarItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group relative ml-4",
        active 
          ? "text-black dark:text-white bg-zinc-50 dark:bg-zinc-900/50" 
          : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
      )}
    >
      <Icon size={18} className={cn("transition-transform duration-200")} />
      <span className={cn("text-sm font-medium flex-1", active && "underline underline-offset-4 decoration-2")}>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuGroups = [
    {
      title: "User",
      value: "user-group",
      icon: User,
      items: [
        { href: "/dashboard/user", icon: User, label: "Overview" },
        { href: "/dashboard/user/orders", icon: ShoppingBag, label: "Orders" },
        { href: "/dashboard/user/wishlist", icon: Heart, label: "Wishlist" },
      ]
    },
    {
      title: "Seller",
      value: "seller-group",
      icon: Store,
      items: [
        { href: "/dashboard/seller", icon: Store, label: "Seller Hub" },
        { href: "/dashboard/seller/products", icon: Package, label: "Products" },
        { href: "/dashboard/seller/orders", icon: ClipboardList, label: "Fulfillment" },
      ]
    },
    {
      title: "Admin",
      value: "admin-group",
      icon: ShieldCheck,
      items: [
        { href: "/dashboard/admin", icon: ShieldCheck, label: "Admin Panel" },
        { href: "/dashboard/admin/users", icon: Users, label: "User Registry" },
        { href: "/dashboard/admin/products", icon: LayoutDashboard, label: "Inventory" },
      ]
    }
  ];

  // Find which group should be open by default
  const defaultOpenGroup = menuGroups.find(group => 
    group.items.some(item => pathname === item.href)
  )?.value;

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
    <div className="flex flex-col h-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 w-72 p-6 overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]">
      <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
        <div className="w-10 h-10 bg-black dark:bg-zinc-800 rounded-xl flex items-center justify-center">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">Dashboard</span>
      </div>

      <div className="flex-1">
        <Accordion 
          type="multiple" 
          defaultValue={defaultOpenGroup ? [defaultOpenGroup] : []} 
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
        >
          {menuGroups.map((group) => {
            const Icon = group.icon;
            const isActive = group.items.some(item => pathname === item.href);

            return (
              <AccordionItem 
                key={group.value} 
                value={group.value} 
                className="border-b border-zinc-200 dark:border-zinc-800 px-4 last:border-b-0"
              >
                <AccordionTrigger 
                  className={cn(
                    "flex items-center gap-3 py-4 transition-all duration-200 group font-bold text-[10px] uppercase tracking-[0.2em] hover:no-underline shadow-none",
                    isActive ? "text-black dark:text-white" : "text-zinc-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <Icon size={18} className={cn("transition-colors", isActive ? "text-black dark:text-white" : "text-zinc-400")} />
                    <span>{group.title}</span>
                  </div>
                  <ChevronRight 
                    size={14} 
                    className="transition-transform duration-300 opacity-40 shrink-0 group-data-[state=open]:rotate-90" 
                  />
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarItem 
                        key={item.href} 
                        {...item} 
                        active={pathname === item.href} 
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-2 shrink-0">
        <SidebarItem href="/dashboard/settings" icon={Settings} label="Settings" active={pathname === "/dashboard/settings"} />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button 
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will sign you out of your account. You will need to login again to access the dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => router.push('/')}
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
