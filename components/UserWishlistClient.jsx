"use client";

import React, { useEffect, useState } from "react";
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserWishlistClient() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=6');
        const data = await res.json();
        setWishlist(data.products.map(p => ({
          ...p,
          addedDate: "Oct 24, 2023"
        })));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

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
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-zinc-500 mt-1">Products you've saved for later.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-xl border border-rose-100 dark:border-rose-900/50">
          <Heart size={16} fill="currentColor" />
          {wishlist.length} Items Saved
        </div>
      </header>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 bg-black/80 dark:bg-white/80 backdrop-blur-md text-white dark:text-black text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-blue-500 transition-colors cursor-pointer">{item.title}</h3>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-xl font-black">${item.price}</p>
                </div>

                <p className="text-sm text-zinc-500 line-clamp-2">{item.description}</p>
                
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-zinc-50 dark:text-black text-white py-3 rounded-2xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-black/5">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                  <button className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-50 dark:bg-zinc-900/10 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-zinc-300" />
          </div>
          <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 mb-8">Save items you love to find them easily later.</p>
          <button className="bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}
