import { PageShell } from "@/app/components/PageShell";

export default function CustomersPage() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Customer management</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">All customers</h1>
          </div>
          <button className="rounded-3xl bg-[var(--brand-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Add customer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 text-slate-800">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Policy</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { name: "Ramesh Kumar", phone: "9876543210", policy: "Car Insurance", status: "Active" },
                { name: "Sita Devi", phone: "9123456780", policy: "Vehicle Finance", status: "Pending" },
                { name: "Amit Sharma", phone: "9988776655", policy: "Renewal", status: "Due" },
              ].map((customer) => (
                <tr key={customer.phone}>
                  <td className="px-4 py-4 font-medium text-slate-900">{customer.name}</td>
                  <td className="px-4 py-4">{customer.phone}</td>
                  <td className="px-4 py-4">{customer.policy}</td>
                  <td className="px-4 py-4">{customer.status}</td>
                  <td className="px-4 py-4">
                    <button className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
