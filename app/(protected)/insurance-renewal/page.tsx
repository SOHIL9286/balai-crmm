import { PageShell } from "@/app/components/PageShell";

export default function InsuranceRenewalPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Insurance renewals</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Renewals in progress</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Add renewal
          </button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <div className="grid grid-cols-[1.7fr_0.9fr_0.9fr_0.8fr] gap-4 p-5 text-sm font-semibold text-[var(--brand-blue)]">
            <span>Customer</span>
            <span>Policy</span>
            <span>Renewal date</span>
            <span>Status</span>
          </div>
          {[
            { name: "Suresh Patel", policy: "Car Insurance", date: "2026-07-10", status: "Pending" },
            { name: "Priya Rao", policy: "Home Insurance", date: "2026-07-16", status: "Due" },
            { name: "Vikram Singh", policy: "Health Insurance", date: "2026-07-20", status: "Completed" },
          ].map((item) => (
            <div key={item.name} className="grid grid-cols-[1.7fr_0.9fr_0.9fr_0.8fr] gap-4 border-t border-slate-200 px-5 py-4 text-sm text-slate-700">
              <span>{item.name}</span>
              <span>{item.policy}</span>
              <span>{item.date}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
