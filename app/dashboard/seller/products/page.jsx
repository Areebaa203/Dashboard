"use client";

import React, { useEffect, useState } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SellerProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=8');
        const data = await res.json();
        setProducts(data.products.map(p => ({
          ...p,
          sales: Math.floor(Math.random() * 200),
          status: p.stock > 20 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Out of Stock"
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
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-zinc-500 mt-1">Manage your catalog, stock levels and pricing.</p>
        </div>
        <button className="flex items-center gap-2 bg-black dark:bg-zinc-50 dark:text-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10">
          <Plus size={18} />
          Add New Product
        </button>
      </header>

      <div className="bg-white dark:bg-black rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-50/30 dark:bg-zinc-900/10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
              <ArrowUpDown size={16} />
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/10 dark:bg-zinc-900/5">
                <th className="px-8 py-5">Product Info</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5">Sales</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-50 dark:border-zinc-900/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate group-hover:text-blue-500 transition-colors">{product.title}</p>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">SKU-{product.id}2931</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-500 font-medium capitalize">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold">{product.stock} units</span>
                      <div className="h-1 w-16 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            product.stock > 20 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-rose-500"
                          )}
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-600 dark:text-zinc-400">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      product.status === "In Stock" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
                      product.status === "Low Stock" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
                      "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-zinc-400 hover:text-rose-500 transition-all">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-900/5">
          <p className="text-xs text-zinc-500 font-medium">Showing 8 of 42 products</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 text-xs font-bold rounded-xl bg-black dark:bg-white dark:text-black text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
