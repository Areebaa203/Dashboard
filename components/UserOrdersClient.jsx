"use client";

import React, { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle2, 
  ChevronRight,
  Search,
  Calendar,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const FilterButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-xl text-sm font-medium transition-all",
      active 
        ? "bg-black text-white dark:bg-white dark:text-black" 
        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
    )}
  >
    {label}
  </button>
);

export function UserOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=10');
        const data = await res.json();
        setOrders(data.products.map((p, idx) => ({
          id: `#ORD-${1000 + idx}`,
          title: p.title,
          price: p.price,
          date: "Oct " + (10 + idx) + ", 2023",
          status: idx % 4 === 0 ? "Delivered" : idx % 4 === 1 ? "In Transit" : idx % 4 === 2 ? "Processing" : "Cancelled",
          image: p.thumbnail
        })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-zinc-500 mt-1">Track and manage your recent purchases.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "Delivered", "In Transit", "Processing", "Cancelled"].map((f) => (
            <FilterButton key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-24 h-24 rounded-2xl bg-zinc-100 overflow-hidden shrink-0">
                <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg">{order.title}</h3>
                    <p className="text-sm text-zinc-500 font-medium">{order.id}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit",
                    order.status === "Delivered" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
                    order.status === "In Transit" ? "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" :
                    order.status === "Processing" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
                    "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                  )}>
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={12} /> Date Placed
                    </p>
                    <p className="text-sm font-semibold">{order.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <DollarSign size={12} /> Total Amount
                    </p>
                    <p className="text-sm font-semibold">${order.price.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Package size={12} /> Items
                    </p>
                    <p className="text-sm font-semibold">1 Product</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="flex items-center gap-1 text-sm font-bold text-zinc-900 dark:text-white hover:gap-2 transition-all">
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/10 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800">
            <ShoppingBag size={48} className="mx-auto text-zinc-300 mb-4" />
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-zinc-500">Looks like you haven't placed any orders matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
