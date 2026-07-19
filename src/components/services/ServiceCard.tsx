import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services#${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-forest-900/8 bg-white p-6 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-card",
        className,
      )}
    >
      {/* gold sheen on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="mb-5 grid size-13 place-items-center rounded-2xl bg-forest-900/[0.05] text-forest-800 transition-all duration-500 group-hover:bg-forest-900 group-hover:text-gold-300">
        <Icon className="size-6" strokeWidth={1.6} />
      </span>

      <h3 className="font-display text-xl font-medium text-forest-950">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-800/70">
        {service.summary}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 transition-colors group-hover:text-gold-600">
        Learn more
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
