import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
}) {
  const tones = {
    light:
      "bg-forest-900/[0.04] text-forest-700 ring-1 ring-inset ring-forest-900/10",
    dark: "bg-ivory/10 text-forest-50 ring-1 ring-inset ring-ivory/20",
    gold: "bg-gold-500/12 text-gold-700 ring-1 ring-inset ring-gold-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
