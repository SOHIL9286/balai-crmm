import {
  BadgeCheck,
  BadgeAlert,
  Banknote,
  ClipboardList,
  Clock3,
  Download,
  FileText,
  Gauge,
  MessageCircleMore,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Upload,
  UserCircle2,
} from "lucide-react";
import { PageShell } from "@/app/components/PageShell";

const steps = [
  { title: "Customer Details", description: "Capture KYC and lead context", accent: "from-[#0f4cff] to-[#1e3a8a]" },
  { title: "Vehicle Details", description: "Validate registration and policy insights", accent: "from-[#1e3a8a] to-[#0f4cff]" },
  { title: "Company Login", description: "Secure login for live quotes", accent: "from-[#22c55e] to-[#16a34a]" },
];

const companyLogins = [
  { name: "ICICI Lombard", status: "Logged In", tone: "bg-emerald-50 text-emerald-700" },
  { name: "TATA AIG", status: "Not Logged", tone: "bg-rose-50 text-rose-700" },
  { name: "Reliance General", status: "Logged In", tone: "bg-emerald-50 text-emerald-700" },
  { name: "Go Digit", status: "Not Logged", tone: "bg-rose-50 text-rose-700" },
];

const quoteCards = [
  {
    company: "ICICI Lombard",
    netPremium: "18,240",
    grossPremium: "19,800",
    idv: "7,20,000",
    ncb: "50%",
    highlights: ["Own Damage", "Zero Dep", "Engine Protect"],
    bestValue: true,
  },
  {
    company: "TATA AIG",
    netPremium: "19,410",
    grossPremium: "21,200",
    idv: "7,20,000",
    ncb: "50%",
    highlights: ["Roadside", "Consumables", "RTI"],
    bestValue: false,
  },
  {
    company: "Reliance",
    netPremium: "20,060",
    grossPremium: "21,850",
    idv: "7,20,000",
    ncb: "50%",
    highlights: ["Cashless", "PA Cover", "Best Claim Ratio"],
    bestValue: false,
  },
];

const comparisonRows = [
  { metric: "Premium", values: ["₹18,240", "₹19,410", "₹20,060"] },
  { metric: "IDV", values: ["₹7.20L", "₹7.20L", "₹7.20L"] },
  { metric: "NCB", values: ["50%", "50%", "50%"] },
  { metric: "Addons", values: ["Zero Dep + Engine", "Roadside + RTI", "Consumables + PA"] },
  { metric: "Claim Ratio", values: ["94%", "91%", "96%"] },
  { metric: "Policy Tenure", values: ["1 Year", "1 Year", "1 Year"] },
];

const historyItems = [
  { title: "Previous Policy", detail: "Maruti Swift 2022 • 3 claims settled" },
  { title: "Renewal History", detail: "2 renewals completed • premium trend +8%" },
  { title: "Lead Score", detail: "92/100 • high conversion probability" },
];

const documents = ["RC", "Previous Policy", "PUC", "Driving Licence", "Invoice"];

export default function AddPolicyPage() {
  return (
    <PageShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-[#071738] via-[#0f4cff] to-[#1e3a8a] p-6 text-white shadow-[0_30px_90px_-25px_rgba(15,76,255,0.45)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Enterprise Insurance Quotation Portal
              </div>
              <h1 className="text-3xl font-semibold sm:text-4xl">Multi Insurance Quotation</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                A world-class quotation experience for BALAJI POLICY MATRIX LLP with premium ERP styling, AI recommendation intelligence, and instant comparison across insurers.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
                New Quotation
              </button>
              <button className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0f4cff] transition hover:scale-[1.01]">
                Get Live Quotations
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Quotation Workflow</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Premium lead capture and insurer comparison</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <Sparkles className="h-4 w-4 text-[#0f4cff]" />
                  AI-assisted quoting ready
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={step.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-r ${step.accent} p-2 text-white`}>
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{index + 1}. {step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Customer Details</h3>
                    <span className="rounded-full bg-[#0f4cff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#0f4cff]">Step 1</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      ["Customer Name", "Balaji Sharma"],
                      ["Mobile Number", "+91 9998183094"],
                      ["Email", "balaji@policy.com"],
                      ["GST Number", "27AABCU9603R1ZV"],
                      ["PAN Number", "AABCU9603R"],
                      ["Aadhaar Number", "XXXX XXXX 4567"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
                        <p className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Vehicle Details</h3>
                    <span className="rounded-full bg-[#1e3a8a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#1e3a8a]">Step 2</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      ["Registration Number", "MH 04 AB 1234"],
                      ["Vehicle Type", "Private Car"],
                      ["Manufacturer", "Maruti Suzuki"],
                      ["Model", "Swift Dzire"],
                      ["Fuel Type", "Petrol"],
                      ["IDV", "₹7,20,000"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
                        <p className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Live Comparison</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Instant premium cards and best price insights</h2>
                </div>
                <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Compare All
                </button>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-3">
                {quoteCards.map((quote) => (
                  <div key={quote.company} className={`rounded-[24px] border p-5 ${quote.bestValue ? "border-emerald-400 bg-emerald-50/80 shadow-lg shadow-emerald-500/10" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{quote.company}</p>
                        <p className="mt-2 text-sm text-slate-500">Premium comparison</p>
                      </div>
                      <div className={`rounded-2xl p-2 ${quote.bestValue ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                        <Banknote className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5 rounded-[20px] bg-slate-950/95 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Net Premium</p>
                          <p className="mt-2 text-2xl font-semibold">₹{quote.netPremium}</p>
                        </div>
                        {quote.bestValue ? (
                          <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">Best Price</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Gross Premium</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">₹{quote.grossPremium}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">IDV</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">₹{quote.idv}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {quote.highlights.map((item) => (
                        <span key={item} className="rounded-full bg-[#0f4cff]/10 px-3 py-1 text-xs font-semibold text-[#0f4cff]">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button className="rounded-full bg-[#0f4cff] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#0d3dc7]">
                        View Breakdown
                      </button>
                      <button className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                        Select Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Comparison Matrix</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sticky and sortable quote insights</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <Gauge className="h-4 w-4 text-[#0f4cff]" />
                  Best value recommendation
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-sm text-slate-500">
                      <th className="rounded-l-2xl bg-slate-50 px-4 py-3 font-semibold">Metric</th>
                      <th className="bg-slate-50 px-4 py-3 font-semibold">ICICI</th>
                      <th className="bg-slate-50 px-4 py-3 font-semibold">TATA</th>
                      <th className="rounded-r-2xl bg-slate-50 px-4 py-3 font-semibold">Reliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.metric} className="text-sm text-slate-700">
                        <td className="rounded-l-2xl bg-slate-50 px-4 py-3 font-semibold text-slate-900">{row.metric}</td>
                        <td className="bg-white px-4 py-3">{row.values[0]}</td>
                        <td className="bg-white px-4 py-3">{row.values[1]}</td>
                        <td className="rounded-r-2xl bg-white px-4 py-3">{row.values[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Quick Actions</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Accelerate the sales and follow-up journey</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    [Download, "Download PDF"],
                    [FileText, "Generate Proposal"],
                    [MessageCircleMore, "WhatsApp"],
                    [Printer, "Print"],
                  ].map(([Icon, label]) => (
                    <button key={label} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Customer History</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Account intelligence</h2>
                </div>
                <div className="rounded-full bg-[#0f4cff]/10 p-2 text-[#0f4cff]">
                  <UserCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {historyItems.map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Company Login</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Live insurer access</h2>
                </div>
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                  <BadgeCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {companyLogins.map((company) => (
                  <div key={company.name} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{company.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{company.status}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${company.tone}`}>{company.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-[#0f4cff] to-[#1e3a8a] p-6 text-white shadow-[0_18px_60px_-25px_rgba(15,76,255,0.45)]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">AI Features</p>
              </div>
              <h3 className="mt-3 text-xl font-semibold">Premium recommendation engine</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-100">
                <li className="flex items-center gap-2"><Star className="h-4 w-4" /> Suggest best company</li>
                <li className="flex items-center gap-2"><BadgeAlert className="h-4 w-4" /> Highlight missing add-ons</li>
                <li className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Surface cheapest and best-value option</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(15,76,255,0.25)]">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Remarks & Notes</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Customer intent and internal context</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <Clock3 className="h-4 w-4" />
                  Follow-up ready
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Remarks</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">Customer prefers a higher claim ratio and wants a waiver for engine protect with zero depreciation. Premium should stay under the current renewal range.</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Internal Notes</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">Keep the proposal ready for 1-day review and flag the lead to the renewals desk after the quote is accepted.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f4cff]">Documents Upload</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Required files for underwriting</h2>
                </div>
                <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Add Files
                </button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {documents.map((document) => (
                  <div key={document} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{document}</p>
                      <p className="mt-1 text-sm text-slate-500">Ready for upload</p>
                    </div>
                    <div className="rounded-2xl bg-white p-2 text-[#0f4cff]">
                      <Upload className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
