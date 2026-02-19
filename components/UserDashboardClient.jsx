"use client";

import React, { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  CreditCard,
  ArrowUpRight,
  Package,
  CheckCircle2,
  Timer,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ label, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-2xl", color)}>
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <ArrowUpRight size={14} />
            <span>{trend}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

const ActivityItem = ({ title, time, icon: Icon, status }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-zinc-100 dark:border-zinc-900 last:border-0">
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{time}</p>
      </div>
      <div className={cn(
        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        status === "Completed" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
        status === "Pending" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
        "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
      )}>
        {status}
      </div>
    </div>
  );
};

export function UserDashboardClient() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, productsRes] = await Promise.all([
          fetch('https://dummyjson.com/users/1'),
          fetch('https://dummyjson.com/products?limit=5')
        ]);
        
        const user = await userRes.json();
        const productsData = await productsRes.json();
        
        setUserData(user);
        setOrders(productsData.products.slice(0, 3).map((p, idx) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          status: idx === 0 ? "Delivered" : idx === 1 ? "In Transit" : "Processing",
          date: "Oct " + (20 + idx) + ", 2023"
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData?.firstName || "User"}! 👋</h1>
        <p className="text-zinc-500 mt-1">Here's what's happening with your account today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value="24" icon={ShoppingBag} trend={12} color="bg-blue-500" />
        <StatCard label="Wishlist" value="18" icon={Heart} color="bg-rose-500" />
        <StatCard label="Reward Points" value="1,240" icon={CreditCard} trend={5} color="bg-amber-500" />
        <StatCard label="Active Orders" value="3" icon={Clock} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-bold text-lg">Recent Orders</h2>
            <button className="text-sm text-zinc-500 hover:text-black dark:hover:text-white font-medium">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900">
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-50 dark:border-zinc-900/50">
                    <td className="px-6 py-4 font-semibold">{order.name}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "font-medium",
                        order.status === "Delivered" ? "text-emerald-500" :
                        order.status === "In Transit" ? "text-blue-500" : "text-amber-500"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{order.date}</td>
                    <td className="px-6 py-4 text-right font-bold">${order.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="font-bold text-lg mb-6">Activity Feed</h2>
          <div className="space-y-2">
            <ActivityItem title="Package delivered" time="2 hours ago" icon={Package} status="Completed" />
            <ActivityItem title="Payment processed" time="5 hours ago" icon={CheckCircle2} status="Completed" />
            <ActivityItem title="Order #8291 delayed" time="1 day ago" icon={Timer} status="Pending" />
            <ActivityItem title="Security alert: New login" time="2 days ago" icon={ShieldCheck} status="Critical" />
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
}
