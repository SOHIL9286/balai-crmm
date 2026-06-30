import Link from "next/link";
import {
  Activity,
  Airplay,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  CheckSquare,
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
  User,
  Users,
  Wallet,
} from "lucide-react";
import { BalajiLogo } from "@/app/components/BalajiLogo";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sections: SidebarSection[] = [
  {
    title: "Lead Management",
    items: [
      { href: "/dashboard", label: "Load Dashboard", icon: Home, active: true },
      { href: "/leads", label: "Lead Management", icon: Users },
    ],
  },
  {
    title: "Policy",
    items: [
      { href: "/dashboard", label: "Add Policy", icon: Sparkles },
      { href: "/documents", label: "Policies", icon: FileText },
      { href: "/insurance-renewal", label: "Renewals", icon: Shield },
      { href: "/rto-work", label: "Claims", icon: Clipboard },
    ],
  },
  {
    title: "Customers",
    items: [
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/customers", label: "Client Folders", icon: FolderOpen },
    ],
  },
  {
    title: "RTO",
    items: [
      { href: "/rto-work", label: "RTO Reminder", icon: Bell },
      { href: "/rto-work", label: "RTO Process", icon: Truck },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/vehicle-finance", label: "Finance Dashboard", icon: Wallet },
      { href: "/vehicle-finance", label: "Finance Management", icon: BarChart3 },
    ],
  },
  {
    title: "Accounting",
    items: [
      { href: "/reports", label: "Account Vouchers", icon: FileText },
      { href: "/reports", label: "Sell Bill Entry", icon: Activity },
      { href: "/reports", label: "Collection Centre", icon: Layers },
      { href: "/reports", label: "Payments", icon: Wallet },
    ],
  },
  {
    title: "Tools",
    items: [
      { href: "/documents", label: "Create Quotation", icon: BookOpen },
      { href: "/reports", label: "Survey Form", icon: MessageSquare },
    ],
  },
  {
    title: "Reports & Settings",
    items: [
      { href: "/reports", label: "Reports", icon: PieChart },
      { href: "/reports", label: "Settings", icon: LifeBuoy },
    ],
  },
];

function FolderOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7h4l2 3h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-80 shrink-0 border-r border-[var(--border)] bg-white px-6 py-8 text-slate-900 lg:flex lg:flex-col">
      <div className="mb-10">
        <div className="flex items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
          <BalajiLogo className="max-h-12 w-auto" />
        </div>
      </div>

      <div className="space-y-8 overflow-y-auto pb-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">{section.title}</p>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      item.active
                        ? "bg-[var(--brand-blue)] text-white shadow-sm"
                        : "text-slate-700 hover:bg-[var(--brand-blue-soft)] hover:text-[var(--brand-blue)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-slate-700 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-blue)] text-sm font-semibold text-white">SM</div>
          <div>
            <p className="font-semibold text-slate-900">Sahil Mansuri</p>
            <p className="text-xs text-[var(--text-muted)]">Admin</p>
          </div>
        </div>
        <div className="rounded-3xl bg-[var(--surface-muted)] p-4 text-center text-xs text-[var(--text-muted)]">
          Mobile app coming soon
        </div>
      </div>
    </aside>
  );
}
