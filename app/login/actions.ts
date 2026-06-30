"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are required.");
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (email === "balaji.ins.fin@gmail.com" && password === "admin") {
    const cookieStore = await cookies();
    cookieStore.set("balaji-auth", "admin", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, { cookies: cookieStore });
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
