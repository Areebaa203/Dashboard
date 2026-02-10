import Link from "next/link";
import { LayoutDashboard, User, Store, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Dashboard Ecosystem</h1>
          <p className="text-zinc-500 text-lg">Select a role to view its dedicated dashboard environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "User Dashboard",
              href: "/dashboard/user",
              icon: User,
              color: "bg-blue-500",
              desc: "Manage orders, wishlist, and profile."
            },
            {
              name: "Seller Dashboard",
              href: "/dashboard/seller",
              icon: Store,
              color: "bg-emerald-500",
              desc: "Track sales, products, and revenue."
            },
            {
              name: "Admin Dashboard",
              href: "/dashboard/admin",
              icon: ShieldCheck,
              color: "bg-indigo-500",
              desc: "Monitor platform and infrastructure."
            },
          ].map((role) => (
            <Link
              key={role.name}
              href={role.href}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${role.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                <role.icon size={28} />
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-black dark:group-hover:text-white">{role.name}</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{role.desc}</p>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                Enter Dashboard
                <LayoutDashboard size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
