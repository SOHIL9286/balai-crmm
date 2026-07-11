import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, FileText } from "lucide-react";

const highlights = [
  {
    title: "Smart policy management",
    description: "Track renewals, customer records, and pending follow-ups from a single workspace.",
    icon: ShieldCheck,
  },
  {
    title: "Live business insights",
    description: "Monitor leads, finance progress, and service status with a clear overview.",
    icon: BarChart3,
  },
  {
    title: "Document-ready workflows",
    description: "Keep agreements, policy files, and updates organized for faster response times.",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,102,209,0.16),_transparent_42%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:flex-row">
        <div className="flex-1 p-8 sm:p-10 lg:p-16">
          <span className="inline-flex items-center rounded-full border border-[var(--brand-blue-soft)] bg-[var(--brand-blue-soft)] px-3 py-1 text-sm font-medium text-[var(--brand-blue)]">
            Balaji CRM
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Keep every customer journey moving with confidence.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Organize insurance renewals, finance opportunities, and customer communications in one polished dashboard built for faster decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="#highlights"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Explore features
            </a>
          </div>
        </div>

        <div className="flex-1 bg-[var(--brand-blue-soft)] p-8 sm:p-10 lg:p-16" id="highlights">
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-blue)]">
              What the workspace helps with
            </p>
            <div className="mt-6 space-y-4">
              {highlights.map(({ title, description, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-[var(--brand-blue-soft)] p-2 text-[var(--brand-blue)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
