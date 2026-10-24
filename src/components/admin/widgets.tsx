import { Smartphone, Tablet, Monitor, type LucideIcon } from "lucide-react";
import type { DeviceType, RankItem } from "@/types";
import { countryFlag } from "@/lib/analytics/ua";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        accent
          ? "border-gold-500/30 bg-gold-500/[0.06]"
          : "border-forest-900/8 bg-white",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-forest-800/55">
          {label}
        </span>
        <span
          className={cn(
            "grid size-9 place-items-center rounded-full",
            accent
              ? "bg-gold-500/20 text-gold-700"
              : "bg-forest-900/[0.05] text-forest-700",
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-medium tracking-tight text-forest-950">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-forest-800/55">{hint}</p>}
    </div>
  );
}

export function BarList({
  title,
  items,
  showFlag = false,
}: {
  title: string;
  items: RankItem[];
  showFlag?: boolean;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="rounded-2xl border border-forest-900/8 bg-white p-5">
      <h3 className="text-sm font-semibold text-forest-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-forest-800/50">No data yet.</p>
        )}
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 truncate text-forest-800">
                {showFlag && (
                  <span className="text-base leading-none">
                    {countryFlag(item.meta)}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </span>
              <span className="shrink-0 font-medium text-forest-900">
                {item.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-forest-900/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest-700 to-forest-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrafficChart({
  data,
}: {
  data: { day: string; views: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.views));
  return (
    <div className="rounded-2xl border border-forest-900/8 bg-white p-5">
      <h3 className="text-sm font-semibold text-forest-900">
        Views · last 14 days
      </h3>
      <div className="mt-5 flex h-40 items-end gap-1.5">
        {data.map((d) => (
          <div
            key={d.day}
            className="group relative flex h-full flex-1 flex-col items-center justify-end"
          >
            <span className="pointer-events-none absolute -top-7 rounded-md bg-forest-900 px-2 py-1 text-[0.7rem] font-medium text-ivory opacity-0 transition-opacity group-hover:opacity-100">
              {d.views}
            </span>
            {/* the bar's % height needs a parent with a definite height */}
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-forest-700 to-forest-400 transition-all hover:from-gold-600 hover:to-gold-400"
                style={{ height: `${Math.max(4, (d.views / max) * 100)}%` }}
              />
            </div>
            <span className="mt-2 text-[0.6rem] text-forest-800/45">
              {d.day.slice(8, 10)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const deviceIcons: Record<DeviceType, LucideIcon> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
};

export function DeviceIcon({ device }: { device: string }) {
  const Icon = deviceIcons[device as DeviceType] ?? Monitor;
  return <Icon className="size-4 text-forest-600" />;
}
