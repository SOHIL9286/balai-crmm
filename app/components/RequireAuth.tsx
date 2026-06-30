import { requireServerSession } from "@/lib/auth";

export default async function RequireAuth({ children }: { children: React.ReactNode }) {
  await requireServerSession();
  return <>{children}</>;
}
