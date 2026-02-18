"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function DashboardLayoutClient({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    // Show loading state while checking auth
    if (loading || !user) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
