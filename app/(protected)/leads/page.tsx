import { PageShell } from "@/app/components/PageShell";

export default function LeadsPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Lead management</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Current leads</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Add lead
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 text-slate-800">
              <tr>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Opportunity</th>
                <th className="px-4 py-3">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { name: "Deepak Mehta", source: "Website", opportunity: "Insurance", stage: "Contacted" },
                { name: "Nisha Verma", source: "Referral", opportunity: "Finance", stage: "Qualified" },
                { name: "Aarti Rao", source: "Walk-in", opportunity: "Renewal", stage: "Proposal" },
              ].map((lead) => (
                <tr key={lead.name}>
                  <td className="px-4 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-4 py-4">{lead.source}</td>
                  <td className="px-4 py-4">{lead.opportunity}</td>
                  <td className="px-4 py-4">{lead.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
