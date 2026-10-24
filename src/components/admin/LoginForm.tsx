"use client";

import { useActionState } from "react";
import { Lock, Loader2, ShieldCheck } from "lucide-react";
import { login, type LoginState } from "@/actions/admin";

export function LoginForm({ devHint }: { devHint?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-[1.75rem] border border-forest-100/12 bg-forest-900/40 p-8 backdrop-blur-xl"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-500/30">
        <ShieldCheck className="size-7" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-medium text-white">
        Owner access
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-forest-100/60">
        This dashboard is private. Enter your passcode to continue.
      </p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-sm font-medium text-forest-100/80">
          Passcode
        </span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-forest-100/40" />
          <input
            name="passcode"
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-forest-100/15 bg-forest-950/50 py-3 pl-10 pr-4 text-white placeholder:text-forest-100/30 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
          />
        </div>
      </label>

      {state.error && (
        <p className="mt-3 text-sm font-medium text-red-300">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 font-medium text-forest-950 transition-all hover:bg-gold-400 disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Verifying…
          </>
        ) : (
          "Enter Dashboard"
        )}
      </button>

      {devHint && (
        <p className="mt-4 rounded-lg bg-forest-950/40 px-3 py-2 text-center text-xs text-forest-100/50">
          Dev mode — passcode is{" "}
          <code className="text-gold-300">{devHint}</code>
        </p>
      )}
    </form>
  );
}
