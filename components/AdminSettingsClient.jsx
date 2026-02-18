"use client";

import React from "react";
import { 
  Shield, 
  Server,
  Lock,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AdminSettingsClient() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleSave = async () => {
    setSuccess("");
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSuccess("Admin system settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Settings</h1>
        <p className="text-zinc-500 mb-6">Global system preferences and security configurations.</p>
        
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
        {/* System Config */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Server size={20} className="text-indigo-500" />
              System Infrastructure
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Maintenance Mode</p>
                <p className="text-xs text-zinc-500">Temporarily disable public access for updates.</p>
              </div>
              <div className="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold">Global Tier Multiplier</label>
              <select className="w-64 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none">
                <option>1.0x (Normal)</option>
                <option>1.2x (High Yield)</option>
                <option>1.5x (Peak)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security & Access */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Lock size={20} className="text-indigo-500" />
              Security & Global Access
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: "Force 2FA", desc: "Require all admins to use two-factor authentication.", icon: Shield, enabled: true },
              { title: "Geo-blocking", desc: "Restrict access from specific regions.", icon: Globe, enabled: false },
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
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.enabled ? 'bg-indigo-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
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
            className="text-sm font-semibold py-2.5 px-8 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Global Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
