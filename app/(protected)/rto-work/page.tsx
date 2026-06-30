import { PageShell } from "@/app/components/PageShell";

export default function RtoWorkPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">RTO work</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Vehicle registration tasks</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Add RTO task
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Pending inspections", value: "12", accent: "bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]" },
            { title: "Documents ready", value: "8", accent: "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)]" },
            { title: "Registrations due", value: "4", accent: "bg-slate-50 text-slate-900" },
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
