"use client";

import React, { useEffect, useState } from "react";
import { 
  Package, 
  Search, 
  Tag, 
  AlertTriangle, 
  Eye, 
  BarChart2, 
  MoreHorizontal,
  Settings,
  TrendingUp,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminProductsClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=10');
        const data = await res.json();
        setProducts(data.products.map(p => ({
          ...p,
          seller: ["TechZone", "FashionHub", "HomeVibe", "SportsPro", "BeautyCo"][p.id % 5],
          compliance: p.rating > 4 ? "Approved" : "Review Needed"
        })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
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
          <h1 className="text-3xl font-bold tracking-tight">Global Inventory</h1>
          <p className="text-zinc-500 mt-1">Monitor and moderate all listings across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-bold text-xs hover:bg-zinc-200 transition-all">
            <Download size={16} />
            Export Inventory
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black dark:bg-zinc-50 dark:text-black text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-black/10">
            <Tag size={16} />
            Manage Categories
          </button>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Listings", value: "14,821", icon: Package, color: "text-blue-500" },
          { label: "Active Sellers", value: "842", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Flagged Items", value: "24", icon: AlertTriangle, color: "text-rose-500" },
          { label: "New Today", value: "+128", icon: BarChart2, color: "text-indigo-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900", stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-black rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by product name, seller, or SKU..." 
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-inner"
            />
          </div>
          <button className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-zinc-200 transition-all">
            <Settings size={20} className="text-zinc-500" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900">
                <th className="px-8 py-5">Product Details</th>
                <th className="px-6 py-5">Merchant</th>
                <th className="px-6 py-5">Global Stock</th>
                <th className="px-6 py-5">Price Point</th>
                <th className="px-6 py-5">Moderation</th>
                <th className="px-8 py-5 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-50 dark:border-zinc-900/50 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-100 overflow-hidden shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors uppercase tracking-tight text-xs">{product.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">ID: {product.brand || "GENERIC"}-{product.id}X</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"></div>
                      <span className="font-semibold text-xs">{product.seller}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold">{product.stock}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className={cn("w-1 h-3 rounded-full", i * 20 <= product.stock ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800")}></div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-zinc-900 dark:text-zinc-100">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      product.compliance === "Approved" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                    )}>
                      <TrendingUp size={10} />
                      {product.compliance}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
                        <Eye size={14} /> View
                      </button>
                      <button className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                        <MoreHorizontal size={18} className="text-zinc-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
