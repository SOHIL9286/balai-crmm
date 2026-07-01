import { Bell, CalendarDays, ChevronDown, CircleDot, ClipboardList, DollarSign, UserPlus } from "lucide-react";
import { PageShell } from "@/app/components/PageShell";

const summaryStats = [
  { label: "Active Policies", value: "299", growth: "+8% this month", accent: "text-[var(--brand-blue)]" },
  { label: "Total Premium", value: "₹22,01,767.21", growth: "0% vs last month", accent: "text-[var(--brand-blue)]" },
  { label: "Renewals Due", value: "0", growth: "0% vs last month", accent: "text-[var(--text-muted)]" },
  { label: "Today's Collection", value: "₹0", growth: "0% vs yesterday", accent: "text-[var(--text-muted)]" },
  { label: "Overdue Alerts", value: "0", growth: "0% vs last month", accent: "text-red-500" },
];

const recentPolicies = [
  { policy: "3379/0477/706/000/00", client: "Mr. JAY NARAYAN ROADWAYS", vehicle: "MOTOR GCV", amount: "₹57,823", status: "Active" },
  { policy: "6204943103 01 00", client: "Mr. Rathva Keshvabhai", vehicle: "MOTOR PRIVATE CAR", amount: "₹12,210", status: "Active" },
  { policy: "D216169486", client: "Mr. Maheta Karsonbhai Rameshbhai", vehicle: "MOTOR PRIVATE CAR", amount: "₹16,490.92", status: "Active" },
  { policy: "POCVMVM010213561", client: "Mr. PATEL PRAFULBHAI CHHITUBHAI", vehicle: "MOTOR GCV", amount: "₹8,949", status: "Active" },
  { policy: "OG-26-2230-1871-00000120", client: "Mr. Rathod Tabasum Alfaiz", vehicle: "MOTOR TWO WHEELER", amount: "₹1,285", status: "Active" },
];

const quickActions = [
  { label: "Add Policy", icon: <CircleDot className="h-4 w-4" />, style: "bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]" },
  { label: "Add Customer", icon: <UserPlus className="h-4 w-4" />, style: "bg-[var(--surface)] text-slate-900" },
  { label: "Payment Entry", icon: <DollarSign className="h-4 w-4" />, style: "bg-[var(--surface)] text-slate-900" },
  { label: "Reports", icon: <ClipboardList className="h-4 w-4" />, style: "bg-[var(--surface)] text-slate-900" },
];

export default function DashboardPage() {
  return (
    <PageShell>
      <div className="space-y-6">
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Good morning, Sohil</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Here&apos;s what&apos;s happening in your agency today.</h1>
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
              <button className="inline-flex items-center gap-2 rounded-3xl bg-white border border-[var(--border)] px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-[var(--surface-muted)]">
                More Actions
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {summaryStats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
                <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                <p className={`mt-4 text-3xl font-semibold ${item.accent}`}>{item.value}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.growth}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr_1fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Business Overview</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Premium and collection trends for this month.</p>
              </div>
              <div className="rounded-3xl bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-slate-700">This Month</div>
            </div>
            <div className="mt-6 space-y-6">
              <div className="h-52 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(15,102,209,.12),_transparent_40%)] p-5">
                <div className="h-full rounded-[2rem] bg-[var(--surface)] shadow-inner" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-[var(--surface)] p-5">
                  <p className="text-sm text-[var(--text-muted)]">Premium</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">₹18.4L</p>
                </div>
                <div className="rounded-3xl bg-[var(--surface)] p-5">
                  <p className="text-sm text-[var(--text-muted)]">Collection</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--brand-green)]">₹10.8L</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Policy Status</h2>
                <p className="text-sm text-[var(--text-muted)]">Total policies by status</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: "Active", value: "299", accent: "bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]" },
                { label: "Expiring Soon", value: "12", accent: "bg-[var(--brand-green-soft)] text-[var(--brand-green)]" },
                { label: "Overdue", value: "0", accent: "bg-[var(--surface)] text-slate-700" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className={`mt-1 text-sm ${item.accent}`}>{item.value}</p>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${item.accent}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Renewal Calendar</h2>
                <p className="text-sm text-[var(--text-muted)]">May 2025</p>
              </div>
              <button className="rounded-full border border-[var(--border)] px-3 py-2 text-sm text-slate-700 transition hover:bg-[var(--surface-muted)]">
                View Calendar
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm text-[var(--text-muted)]">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => (
                <div key={day} className="font-semibold">{day}</div>
              ))}
              {Array.from({ length: 27 }).map((_, index) => {
                const day = index + 1;
                const isActive = day === 23;
                return (
                  <div
                    key={day}
                    className={`rounded-2xl py-3 ${isActive ? 'bg-[var(--brand-blue)] text-white' : 'bg-[var(--surface)] text-slate-700 shadow-sm'}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--brand-blue)]" />
              Upcoming
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--brand-green)]" />
              Due Soon
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
              Overdue
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent Policies</h2>
                <p className="text-sm text-[var(--text-muted)]">Most recent policies issued by your agency.</p>
              </div>
              <button className="rounded-full border border-[var(--border)] px-3 py-2 text-sm text-slate-700 transition hover:bg-[var(--surface-muted)]">
                View All
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {recentPolicies.map((policy) => (
                <div key={policy.policy} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{policy.policy}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{policy.client}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
                      <span>{policy.vehicle}</span>
                      <span>•</span>
                      <span>{policy.amount}</span>
                    </div>
                    <span className="rounded-full bg-[var(--brand-green-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-green)]">{policy.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Pending Tasks</h2>
                <p className="text-sm text-[var(--text-muted)]">Work items waiting on your team.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Review policy renewals",
                "Send renewal reminders",
                "Upload proof of payment",
              ].map((task) => (
                <div key={task} className="flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm text-slate-700">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-blue)]" />
                  {task}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Upcoming Renewals</h2>
                <p className="text-sm text-[var(--text-muted)]">Renewals scheduled for the next week.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { title: "Mahesh Motors", date: "May 25" },
                { title: "Roadways Pvt Ltd", date: "May 26" },
                { title: "Keshav Travels", date: "May 27" },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-4">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-muted)]">Today&apos;s Collection</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">₹0</p>
            <div className="mt-3 text-sm text-[var(--text-muted)]">0% vs yesterday</div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-muted)]">Monthly Collection</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">₹0</p>
            <div className="mt-3 text-sm text-[var(--text-muted)]">0% achieved of target</div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)]">Top Performing Agent</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">₹0</p>
              </div>
              <div className="rounded-3xl bg-[var(--brand-blue-soft)] px-3 py-2 text-sm font-semibold text-[var(--brand-blue)]">This month</div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                <p className="text-sm text-[var(--text-muted)]">Access common workflows</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={`${action.style} flex items-center gap-3 rounded-3xl border border-[var(--border)] px-4 py-4 text-left text-sm font-medium transition hover:bg-[var(--surface-muted)]`}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.9fr_0.9fr_0.9fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--brand-green-soft)] p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[var(--brand-green)]">Never miss a renewal!</h2>
                <p className="mt-2 text-sm text-[var(--brand-green)]">Enable WhatsApp reminders to keep customers notified automatically.</p>
              </div>
              <button className="rounded-3xl bg-[var(--brand-green)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-green)]/90">
                Enable Now
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Backup Status</h2>
                <p className="text-sm text-[var(--text-muted)]">Last Backup: 23 May 2025 02:30 AM</p>
              </div>
              <span className="rounded-full bg-[var(--brand-green-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-green)]">Backed Up</span>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--text-muted)]">Storage Usage</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">21.2 GB / 50 GB</p>
              </div>
              <p className="rounded-full bg-[var(--surface)] px-3 py-1 text-sm font-semibold text-slate-700">42%</p>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div className="h-full w-42 rounded-full bg-[var(--brand-blue)]" />
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
