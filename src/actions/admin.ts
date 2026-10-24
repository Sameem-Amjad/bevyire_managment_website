"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyPasscode,
  createSessionToken,
  isAdminConfigured,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/admin/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Admin access is not configured. Set ADMIN_PASSCODE in your environment.",
    };
  }

  const passcode = String(formData.get("passcode") ?? "");
  // Small delay to blunt brute-force / timing probing.
  await new Promise((r) => setTimeout(r, 350));

  if (!verifyPasscode(passcode)) {
    return { error: "Incorrect passcode. Please try again." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
