import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">          
          <Header />
          <main className="p-6 xl:px-10 xl:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
