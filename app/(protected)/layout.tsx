import RequireAuth from "@/app/components/RequireAuth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
