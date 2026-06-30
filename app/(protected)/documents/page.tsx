import { PageShell } from "@/app/components/PageShell";

export default function DocumentsPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Document upload</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Client documents</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Upload document
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Pending review", value: "18" },
            { title: "Uploaded today", value: "7" },
            { title: "Verified", value: "124" },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
