"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are required.");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("balaji-auth");

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, { cookies: cookieStore });
  await supabase.auth.signOut();
  redirect("/login");
}
