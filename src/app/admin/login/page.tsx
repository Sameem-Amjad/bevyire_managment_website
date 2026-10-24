import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAuthenticated, usingDevPasscode } from "@/lib/admin/auth";
import { demoMode } from "@/lib/site";

export const metadata: Metadata = {
  title: "Owner Access",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-forest-950 px-5 py-16">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-32 top-0 size-[28rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[28rem] rounded-full bg-forest-500/20 blur-3xl" />
      <div className="relative">
        {/* the portfolio demo's passcode is public, so show it like the dev one */}
        <LoginForm
          hint={
            demoMode && process.env.ADMIN_PASSCODE
              ? { label: "Demo", passcode: process.env.ADMIN_PASSCODE }
              : usingDevPasscode()
                ? { label: "Dev mode", passcode: "bevyirie-admin" }
                : undefined
          }
        />
      </div>
    </div>
  );
}
