"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, LogOut, Radio } from "lucide-react";
import { logout } from "@/actions/admin";
import { cn } from "@/lib/utils";

export function DashboardControls() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [live, setLive] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => router.refresh(), 20_000);
    return () => clearInterval(t);
  }, [live, router]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLive((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
          live
            ? "bg-gold-500/15 text-gold-700 ring-1 ring-inset ring-gold-500/40"
            : "text-forest-700 hover:bg-forest-900/[0.05]",
        )}
      >
        <Radio className={cn("size-4", live && "animate-pulse")} />
        {live ? "Live" : "Go live"}
      </button>

      <button
        type="button"
        onClick={refresh}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full border border-forest-900/12 px-3.5 py-2 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-900/[0.05] disabled:opacity-60"
      >
        <RefreshCw className={cn("size-4", pending && "animate-spin")} />
        Refresh
      </button>

      <form action={logout}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-3.5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-forest-800"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </div>
  );
}
