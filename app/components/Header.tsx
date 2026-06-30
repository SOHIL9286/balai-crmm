import { Bell, Search, Plus, Settings, UserCircle2 } from "lucide-react";
import { signOut } from "@/app/actions/auth";

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-[var(--border)] bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="rounded-3xl bg-[var(--brand-blue-soft)] px-4 py-3 text-sm font-semibold text-[var(--brand-blue)]">Good afternoon, Sahil</div>
        <div className="flex items-center gap-2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)] shadow-sm">
          <Search className="h-4 w-4 text-[var(--brand-blue)]" />
          Search by Policy No., Client, Vehicle No., Mobile No.
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-slate-600">
        <button className="inline-flex items-center gap-2 rounded-3xl bg-[var(--brand-blue)] px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Policy
        </button>
        <button className="inline-flex items-center gap-2 rounded-3xl bg-white border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--brand-blue)] shadow-sm transition hover:bg-[var(--surface-muted)]">
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
        <button className="inline-flex items-center gap-2 rounded-3xl bg-[var(--brand-green-soft)] px-4 py-3 text-sm font-medium text-[var(--brand-green)] border border-[var(--brand-green-soft)] transition hover:bg-[var(--brand-green)] hover:text-white">
          <Bell className="h-4 w-4" />
          Send Reminder
        </button>
        <button className="inline-flex items-center gap-2 rounded-3xl bg-white border border-[var(--border)] px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[var(--surface-muted)]">
          <Settings className="h-4 w-4" />
          More Actions
        </button>
        <div className="flex items-center gap-3 rounded-3xl bg-[var(--surface-muted)] px-4 py-3">
          <UserCircle2 className="h-5 w-5 text-[var(--brand-blue)]" />
          <div className="text-sm">
            <p className="font-semibold text-slate-900">Sahil Mansuri</p>
            <p className="text-[var(--text-muted)]">Admin</p>
          </div>
        </div>
        <form action={signOut}>
          <button className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
