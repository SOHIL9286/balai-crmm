import Link from "next/link";
import { signInWithEmail } from "@/app/login/actions";
import { BalajiLogo } from "@/app/components/BalajiLogo";

function LoginForm() {
  return (
    <form action={signInWithEmail} className="space-y-5">
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          name="email"
          type="email"
          required
          placeholder="you@balaji.com"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Sign in
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-full max-w-[220px] items-center justify-center rounded-3xl bg-[var(--surface)] p-3 shadow-sm">
            <BalajiLogo className="max-h-10 w-auto" />
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.24em] text-[var(--brand-blue)]">Attéche Insurance</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to your account</h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">Use balaji.ins.fin@gmail.com with password admin to log in.</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account? <Link href="/" className="font-semibold text-slate-900">Contact admin</Link>
        </p>
      </div>
    </main>
  );
}
