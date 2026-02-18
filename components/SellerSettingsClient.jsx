"use client";

import React from "react";
import { 
  Store, 
  Bell, 
  CreditCard, 
  Package,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SellerSettingsClient() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleSave = async () => {
    setSuccess("");
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSuccess("Seller settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Seller Settings</h1>
        <p className="text-zinc-500 mb-6">Manage your shop configurations and payout preferences.</p>
        
        {success && (
          <Alert variant="default" className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              {success}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Shop Info */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Store size={20} className="text-emerald-500" />
              Shop Configuration
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Shop Name</label>
              <input 
                type="text" 
                defaultValue={`${user?.name}'s Boutique`}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Business Email</label>
                <input 
                  type="email" 
                  defaultValue={user?.email}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Payout Method</label>
                <div className="flex items-center gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <CreditCard size={18} className="text-zinc-400" />
                  <span className="text-sm">Stripe (Connected)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Notifications */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell size={20} className="text-emerald-500" />
              Shop Notifications
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: "New Orders", desc: "Instantly notify when a customer makes a purchase.", icon: Package, enabled: true },
              { title: "Payout Successful", desc: "Receive email when funds are sent to your bank.", icon: CreditCard, enabled: true },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 rounded-xl flex items-center justify-center">
                    <item.icon size={20} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.enabled ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="text-sm font-semibold py-2.5 px-8 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Shop Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
