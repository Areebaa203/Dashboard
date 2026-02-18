"use client";

import React from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Mail,
  Shield,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SettingsClient() {
  const [formData, setFormData] = React.useState({
    fullName: "Alex Rivera",
    email: "alex@example.com"
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const handleSave = async () => {
    setSuccess("");
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSuccess("Changes saved successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-zinc-500 mb-6">Manage your account settings and preferences.</p>
        
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
        {/* Profile Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User size={20} className="text-blue-500" />
              Profile Information
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                <User size={32} className="text-zinc-400" />
              </div>
              <div className="flex-1 space-y-1">
                <button className="text-sm font-semibold py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-opacity">
                  Change Avatar
                </button>
                <p className="text-xs text-zinc-500">Recommended size: 400x400px. JPG, PNG or WebP.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="text-sm font-semibold py-2 px-6 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell size={20} className="text-emerald-500" />
              Notifications
            </h2>
          </div>
          <div className="p-6 divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              { title: "Email Notifications", desc: "Receive email about your account activity.", icon: Mail, enabled: true },
              { title: "Security Alerts", desc: "Get notified of unauthorized login attempts.", icon: Shield, enabled: true },
              { title: "Push Notifications", desc: "Receive alerts directly on your device.", icon: Smartphone, enabled: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 rounded-xl flex items-center justify-center">
                    <item.icon size={20} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.enabled ? 'bg-black dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                  <div className={`w-4 h-4 bg-white dark:bg-black rounded-full shadow-sm transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Lock size={20} className="text-indigo-500" />
              Security
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Two-Factor Authentication</p>
                <p className="text-xs text-zinc-500">Add an extra layer of security to your account.</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-red-500">Delete Account</p>
                <p className="text-xs text-zinc-500">Permanently delete your account and all data.</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
