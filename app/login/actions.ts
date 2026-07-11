"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { signCookieValue } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are required.");
}

/**
 * Server action to sign in a user with email and password.
 * Conforms to React 19's useActionState signature.
 */
export async function signInWithEmail(prevState: unknown, formData: FormData) {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  // Handle hardcoded admin bypass securely by signing the session cookie
  if (email === "balaji.ins.fin@gmail.com" && password === "admin") {
    const cookieStore = await cookies();
    const signedValue = signCookieValue("admin");
    cookieStore.set("balaji-auth", signedValue, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    redirect("/dashboard");
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, { cookies: cookieStore });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
  } catch (err: unknown) {
    // Next.js redirect() throws a special error containing NEXT_REDIRECT.
    // We must rethrow this error to allow the framework to redirect.
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof err.digest === "string" &&
      err.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    
    const errorMessage = err instanceof Error ? err.message : "An unexpected authentication error occurred.";
    return { error: errorMessage };
  }

  redirect("/dashboard");
}
