"use client";

import React, { useEffect, useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Package,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const SellerStat = ({ label, value, trend, isPositive, icon: Icon }) => (
  <div className="bg-white dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-zinc-900 dark:text-zinc-50">
        <Icon size={20} />
      </div>
      <div className={cn(
        "flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg",
        isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
      )}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}%
      </div>
    </div>
    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold mt-1 tracking-tight">{value}</h3>
  </div>
);

export function SellerDashboardClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=4');
        const data = await res.json();
        setProducts(data.products.map(p => ({
          name: p.title,
          sales: Math.floor(Math.random() * 100) + 50,
          revenue: `$${(p.price * (Math.floor(Math.random() * 100) + 50)).toLocaleString()}`,
          stock: p.stock,
          image: p.thumbnail
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
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Hub</h1>
          <p className="text-zinc-500 mt-1">Manage your shop, products, and track performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-black dark:bg-zinc-50 dark:text-black text-white px-5 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-black/10">
          <Plus size={18} />
          Add New Product
        </button>
      </header>

      {/* Seller Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SellerStat label="Monthly Revenue" value="$12,842.00" trend={18.4} isPositive={true} icon={DollarSign} />
        <SellerStat label="Total Orders" value="482" trend={12.5} isPositive={true} icon={Package} />
        <SellerStat label="Active Customers" value="1,240" trend={3.2} isPositive={false} icon={Users} />
        <SellerStat label="Conversion Rate" value="4.8%" trend={0.5} isPositive={true} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-lg">Top Selling Products</h2>
            <TrendingUp size={20} className="text-zinc-400" />
          </div>
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.name} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-zinc-100 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate group-hover:text-blue-500 transition-colors cursor-pointer">{product.name}</h4>
                  <p className="text-xs text-zinc-500 mt-1">{product.stock} items remaining</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{product.revenue}</p>
                  <p className="text-xs text-emerald-500 font-medium mt-1">{product.sales} sales</p>
                </div>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all ml-2">
                  <MoreVertical size={16} className="text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Performance Overview Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-black dark:from-zinc-800 dark:to-zinc-950 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Shop Performance</h3>
            <p className="text-zinc-400 text-sm mb-10">Your store is in the top 5% of sellers this month!</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="uppercase tracking-widest text-zinc-500">Sales Goal</span>
                  <span>82%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[82%] shadow-[0_0_12px_rgba(255,255,255,0.4)]"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-zinc-800/50 rounded-2xl p-4">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Views</p>
                  <p className="text-lg font-bold">12.4k</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Bounce</p>
                  <p className="text-lg font-bold">32%</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all">
              Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
