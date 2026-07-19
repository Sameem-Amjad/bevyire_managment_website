import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Bevy Irie brand mark — an arched doorway (a threshold, a welcome home)
 * paired with a keystone dot. Fully self-contained SVG.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        width="44"
        height="44"
        rx="12"
        className="fill-forest-900"
      />
      {/* doorway arch */}
      <path
        d="M13 32V21.5C13 16.8056 16.8056 13 21.5 13C26.1944 13 30 16.8056 30 21.5V32"
        className="stroke-gold-400"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* threshold */}
      <path
        d="M10.5 32H33"
        className="stroke-gold-400"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* keystone / doorknob */}
      <circle cx="21.5" cy="21.5" r="2.1" className="fill-gold-300" />
      <path
        d="M21.5 24V32"
        className="stroke-gold-400/60"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Bevy Irie — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="size-9 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-medium tracking-tight",
            tone === "light" ? "text-white" : "text-forest-950",
          )}
        >
          Bevy Irie
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
            tone === "light" ? "text-gold-300/80" : "text-gold-600/90",
          )}
        >
          Property · Lagos
        </span>
      </span>
    </Link>
  );
}
