import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Search, Bell, User as UserIcon } from "lucide-react";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Sidebar - Desktop */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 shrink-0">
                    <div className="relative w-96 max-w-md hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all relative">
                            <Bell size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-zinc-800 ml-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold leading-none">Alex Rivera</p>
                                <p className="text-xs text-zinc-500 mt-1">Free Plan</p>
                            </div>
                            <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
                                <UserIcon size={20} className="text-zinc-600" />
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
