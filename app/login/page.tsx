"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail } from "@/app/login/actions";
import { AttecheLogo } from "@/app/components/AttecheLogo";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {state.error}
        </div>
      )}
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          name="email"
          type="email"
          required
          placeholder="you@balaji.com"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 disabled:opacity-55"
          disabled={isPending}
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 disabled:opacity-55"
          disabled={isPending}
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-full max-w-[260px] items-center justify-center rounded-3xl bg-[var(--surface)] p-3 shadow-sm">
            <AttecheLogo className="h-12 w-auto" />
          </div>
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
