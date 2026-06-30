import { PageShell } from "@/app/components/PageShell";

export default function ReportsPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Reports</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Business insights</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Export report
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Renewal rate", value: "78%", accent: "bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]" },
            { title: "Lead conversion", value: "34%", accent: "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)]" },
            { title: "Finance approval", value: "62%", accent: "bg-slate-50 text-slate-900" },
          ].map((card) => (
            <div key={card.title} className={`rounded-3xl border border-slate-200 p-6 ${card.accent}`}>
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="mt-4 text-3xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
