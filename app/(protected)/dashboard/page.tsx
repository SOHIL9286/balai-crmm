import { Bell } from "lucide-react";
import { PageShell } from "@/app/components/PageShell";

export default function DashboardPage() {
  return (
    <PageShell>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="space-y-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Dashboard</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Good afternoon, Sahil</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Here's what's happening in your agency today.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-3xl bg-[var(--brand-blue)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                + Add Policy
              </button>
              <button className="rounded-3xl bg-white border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--brand-blue)] shadow-sm transition hover:bg-[var(--surface-muted)]">
                Add Customer
              </button>
              <button className="inline-flex items-center gap-2 rounded-3xl bg-[var(--brand-green-soft)] px-4 py-3 text-sm font-semibold text-[var(--brand-green)] shadow-sm transition hover:bg-[var(--brand-green)] hover:text-white">
                <Bell className="h-4 w-4" />
                Send Reminder
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Active Policies", value: "294", growth: "+8% this month", accent: "text-[var(--brand-blue)]" },
              { label: "Total Premium", value: "₹2,15,000.29", growth: "+7% this month", accent: "text-[var(--brand-blue)]" },
              { label: "Renewals Due", value: "0", growth: "0% vs last month", accent: "text-[var(--text-muted)]" },
              { label: "Today's Collection", value: "₹0", growth: "0% vs yesterday", accent: "text-[var(--text-muted)]" },
              { label: "Overdue Alerts", value: "0", growth: "-1% vs last month", accent: "text-red-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
                <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                <p className={`mt-4 text-3xl font-semibold ${item.accent}`}>{item.value}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.growth}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
              <p className="text-sm text-[var(--text-muted)]">Launch common insurance workflows</p>
            </div>
            <button className="rounded-full bg-[var(--brand-blue)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              View all
            </button>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Create customer", style: "bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]" },
              { label: "Add new lead", style: "bg-[var(--brand-green-soft)] text-[var(--brand-green)]" },
              { label: "Upload documents", style: "bg-[var(--surface)] text-slate-900" },
              { label: "Start finance case", style: "bg-[var(--surface)] text-slate-900" },
            ].map((action) => (
              <button
                key={action.label}
                className={`rounded-3xl border border-[var(--border)] px-4 py-4 text-left text-sm font-medium transition hover:border-slate-300 hover:bg-[var(--surface-muted)] ${action.style}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
