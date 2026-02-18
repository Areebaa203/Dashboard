"use client";

import React, { useEffect, useState } from "react";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  MoreVertical,
  ChevronRight,
  ClipboardList,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SellerOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=6');
        const data = await res.json();
        setOrders(data.products.map((p, idx) => ({
          id: `#ORD-${5000 + idx}`,
          customer: ["John Doe", "Sarah Smith", "Mike Johnson", "Emily Brown", "David Wilson", "Emma Davis"][idx],
          product: p.title,
          amount: `$${p.price}`,
          date: "Oct " + (25 - idx) + ", 2023",
          status: idx === 0 ? "New" : idx < 3 ? "Shipping" : "Delivered",
          priority: idx === 0 ? "High" : "Normal"
        })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
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
          <h1 className="text-3xl font-bold tracking-tight">Order Fulfillment</h1>
          <p className="text-zinc-500 mt-1">Manage incoming orders and track shipments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-bold text-sm hover:bg-zinc-200 transition-all">
            Export CSV
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-black dark:bg-zinc-50 dark:text-black text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10">
            Print Labels
          </button>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
            <ClipboardList size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">To Process</p>
            <h3 className="text-2xl font-bold">12 Orders</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
            <Truck size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">In Transit</p>
            <h3 className="text-2xl font-bold">8 Orders</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Completed</p>
            <h3 className="text-2xl font-bold">142 Today</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <h2 className="font-bold text-lg">Active Orders</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or customer..." 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="p-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="group p-5 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-2xl border border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black tracking-tight">{order.id}</span>
                  {order.priority === "High" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-md">
                      <AlertCircle size={10} /> Priority
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-base">{order.customer}</h4>
                  <p className="text-xs text-zinc-500 font-medium">Purchased: <span className="text-zinc-900 dark:text-zinc-300 font-bold">{order.product}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:text-center shrink-0">
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Date</p>
                  <p className="text-sm font-bold">{order.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Amount</p>
                  <p className="text-sm font-bold">{order.amount}</p>
                </div>
                <div className="space-y-1 col-span-2 lg:col-span-1">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Status</p>
                  <div className="flex items-center lg:justify-center gap-2 mt-1">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      order.status === "New" ? "bg-blue-500 animate-pulse" :
                      order.status === "Shipping" ? "bg-amber-500" : "bg-emerald-500"
                    )}></span>
                    <span className="text-xs font-bold">{order.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-200 dark:border-zinc-800">
                <button className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold hover:bg-zinc-50 transition-all">
                  Update Status
                </button>
                <button className="p-2.5 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">
                  <MoreVertical size={18} className="text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 text-center border-t border-zinc-100 dark:border-zinc-900">
          <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-all flex items-center gap-2 mx-auto">
            View All Incoming Orders <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
