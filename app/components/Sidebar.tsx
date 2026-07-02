"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Clipboard,
  FileText,
  Home,
  Layers,
  LifeBuoy,
  MessageSquare,
  PieChart,
  Shield,
  Sparkles,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { AttecheLogo } from "@/app/components/AttecheLogo";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  showMobile?: boolean;
  onClose?: () => void;
}

const sections: SidebarSection[] = [
  {
    title: "Lead Management",
    items: [
      { href: "/dashboard", label: "Lead Dashboard", icon: Home },
      { href: "/leads", label: "Lead Management", icon: Users },
      { href: "/add-policy", label: "Quotations", icon: FileText },
      { href: "/reports", label: "Lead Report", icon: Activity },
    ],
  },
  {
    title: "Insurance",
    items: [{ href: "/insurance-renewal", label: "Insurance Renewal", icon: Shield }],
  },
  {
    title: "Customers",
    items: [{ href: "/customers", label: "Customers", icon: Users }],
  },
  {
    title: "RTO Operations",
    items: [{ href: "/rto-work", label: "RTO Work", icon: Truck }],
  },
  {
    title: "Finance Operations",
    items: [{ href: "/vehicle-finance", label: "Finance Dashboard", icon: Wallet }],
  },
  {
    title: "Accounting",
    items: [{ href: "/reports", label: "Reports & Payments", icon: BarChart3 }],
  },
];

function NavItem({ item, active }: { item: SidebarItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 group-hover:bg-slate-200">
        <Icon className="h-4 w-4" />
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar({ showMobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden ${showMobile ? "block" : "hidden"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 shrink-0 border-r border-slate-200 bg-white px-6 py-8 text-slate-900 transition-transform duration-300 lg:static lg:translate-x-0 lg:flex lg:flex-col ${
          showMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
            <div className="flex h-14 items-center justify-center rounded-3xl bg-slate-900 px-3 py-2 text-white">
              <AttecheLogo className="h-10 w-auto" />
            </div>
            <div className="sr-only">
              <p>Balaji Insurance</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-8 overflow-y-auto pb-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Main Dashboard</p>
            <nav className="space-y-2">
              <NavItem item={{ href: "/dashboard", label: "Main Dashboard", icon: Home }} active={pathname === "/dashboard"} />
            </nav>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">{section.title}</p>
              <nav className="space-y-2">
                {section.items.map((item) => (
                  <NavItem key={item.label} item={item} active={pathname === item.href} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">SM</div>
            <div>
              <p className="font-semibold text-slate-900">Sahil Mansuri</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-4 text-center text-xs text-slate-500 shadow-sm">
            Mobile app coming soon
          </div>
        </div>
      </aside>
    </>
  );
}
