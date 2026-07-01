import { ArrowLeft, Bike, Bus, Flame, HeartPulse, Plane, ShoppingBag, Store, Toilet, Tractor, Truck, UserCheck } from "lucide-react";
import { PageShell } from "@/app/components/PageShell";

const products = [
  { title: "Motor Two Wheeler", icon: Bike, tone: "from-orange-100 to-orange-50", label: "MOTOR TWO WHEELER" },
  { title: "Motor PCV", icon: Bus, tone: "from-violet-100 to-violet-50", label: "MOTOR PCV" },
  { title: "Motor GCV", icon: Truck, tone: "from-emerald-100 to-emerald-50", label: "MOTOR GCV" },
  { title: "Motor Misc D", icon: Tractor, tone: "from-amber-100 to-amber-50", label: "MOTOR MISC D" },
  { title: "Health Insurance", icon: HeartPulse, tone: "from-pink-100 to-pink-50", label: "HEALTH INSURANCE" },
  { title: "WC (Workmen Comp.)", icon: Toilet, tone: "from-sky-100 to-sky-50", label: "WC" },
  { title: "Fire Insurance", icon: Flame, tone: "from-orange-100 to-amber-50", label: "FIRE INSURANCE" },
  { title: "Shop Insurance", icon: Store, tone: "from-violet-100 to-indigo-50", label: "SHOP INSURANCE" },
  { title: "Travel Insurance", icon: Plane, tone: "from-sky-100 to-blue-50", label: "TRAVEL INSURANCE" },
  { title: "PA (Personal Accident)", icon: UserCheck, tone: "from-emerald-100 to-emerald-50", label: "PA" },
];

export default function AddPolicyPage() {
  return (
    <PageShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--brand-blue)]">Policy Vault</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Add New Policy</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">Create a new general insurance policy in few simple steps.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-[var(--surface-muted)]">
            <ArrowLeft className="h-4 w-4" />
            Back to Policies
          </button>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <button
                  key={product.title}
                  className={`group relative overflow-hidden rounded-[2rem] border border-transparent bg-gradient-to-br ${product.tone} p-6 text-left shadow-sm transition hover:border-[var(--brand-blue)] hover:shadow-md`}
                >
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_60%)]" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/80 text-[var(--brand-blue)] shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">{product.title}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{product.label}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.6),_transparent_60%)]" />
                </button>
              );
            })}
            <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center text-slate-500 shadow-sm">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                  +
                </div>
                <p className="text-sm font-semibold">Coming Soon</p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">More products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
