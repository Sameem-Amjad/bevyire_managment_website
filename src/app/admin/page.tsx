import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Eye,
  Users,
  MousePointerClick,
  Radio,
  Globe2,
  ArrowUpRight,
} from "lucide-react";
import { isAuthenticated, ADMIN_EMAIL } from "@/lib/admin/auth";
import { getStats } from "@/lib/analytics/store";
import { countryFlag } from "@/lib/analytics/ua";
import {
  StatCard,
  BarList,
  TrafficChart,
  DeviceIcon,
} from "@/components/admin/widgets";
import { DashboardControls } from "@/components/admin/DashboardControls";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const stats = await getStats();

  return (
    <div className="min-h-dvh bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-forest-900/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-medium tracking-tight text-forest-950">
                Visitor Analytics
              </h1>
              <span
                className={
                  stats.source === "memory"
                    ? "rounded-full bg-gold-500/15 px-2.5 py-1 text-xs font-medium text-gold-700"
                    : "rounded-full bg-forest-900/[0.06] px-2.5 py-1 text-xs font-medium text-forest-700"
                }
              >
                {stats.source === "upstash"
                  ? "Live · Upstash"
                  : stats.source === "file"
                    ? "Live · encrypted file"
                    : "Demo data"}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-forest-800/60">
              Private dashboard · signed in as{" "}
              <span className="font-medium text-forest-800">{ADMIN_EMAIL}</span>
            </p>
          </div>
          <DashboardControls />
        </div>

        {stats.source === "memory" && (
          <div className="mt-6 rounded-xl border border-gold-500/25 bg-gold-500/[0.07] px-4 py-3 text-sm text-forest-800">
            You&apos;re viewing seeded sample data — the server filesystem
            isn&apos;t writable here (common on serverless hosts). Deploy to a
            server with a writable disk, or connect Upstash Redis (see{" "}
            <code className="text-gold-700">.env.example</code>) to persist real
            visitors.
          </div>
        )}

        {stats.source === "file" && (
          <div className="mt-6 rounded-xl border border-forest-900/10 bg-white px-4 py-3 text-sm text-forest-800/80">
            🔒 Visitors are stored in an{" "}
            <span className="font-medium text-forest-900">
              AES-256-GCM encrypted, tamper-evident file
            </span>{" "}
            on the server. Records that fail integrity checks are rejected
            automatically.
          </div>
        )}

        {stats.tampered > 0 && (
          <div className="mt-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            ⚠️ {stats.tampered} record(s) failed integrity verification and were
            rejected — the data file may have been tampered with.
          </div>
        )}

        {/* KPI cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total views"
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            hint="Across all tracked pages"
          />
          <StatCard
            label="Unique visitors"
            value={stats.uniqueVisitors.toLocaleString()}
            icon={Users}
            hint="Anonymised fingerprints"
          />
          <StatCard
            label="Views today"
            value={stats.todayViews.toLocaleString()}
            icon={MousePointerClick}
          />
          <StatCard
            label="Active now"
            value={stats.liveWindowViews.toLocaleString()}
            icon={Radio}
            hint="Last 15 minutes"
            accent
          />
        </div>

        {/* Chart */}
        <div className="mt-4">
          <TrafficChart data={stats.perDay} />
        </div>

        {/* Breakdowns */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <BarList title="Top pages" items={stats.topPages} />
          <BarList title="Countries" items={stats.countries} showFlag />
          <BarList title="Devices" items={stats.devices} />
          <BarList title="Browsers" items={stats.browsers} />
          <BarList title="Cities" items={stats.cities} showFlag />
          <BarList title="Referrers" items={stats.referrers} />
        </div>

        {/* Recent visits */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-forest-900/8 bg-white">
          <div className="flex items-center gap-2 border-b border-forest-900/8 px-5 py-4">
            <Globe2 className="size-4 text-forest-600" />
            <h3 className="text-sm font-semibold text-forest-900">
              Recent visits
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-forest-900/8 text-xs uppercase tracking-wider text-forest-800/50">
                  <th className="px-5 py-3 font-medium">When</th>
                  <th className="px-5 py-3 font-medium">Page</th>
                  <th className="px-5 py-3 font-medium">Device</th>
                  <th className="px-5 py-3 font-medium">Browser</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/6">
                {stats.recent.map((v) => (
                  <tr
                    key={v.id}
                    className="transition-colors hover:bg-forest-900/[0.02]"
                  >
                    <td className="whitespace-nowrap px-5 py-3 text-forest-800/70">
                      {timeAgo(v.ts)}
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-medium text-forest-900">
                        {v.path}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 text-forest-800">
                        <DeviceIcon device={v.device} />
                        <span className="capitalize">{v.device}</span>
                        <span className="text-forest-800/45">· {v.os}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-forest-800">
                      {v.browser}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-forest-800">
                      <span className="mr-1.5">{countryFlag(v.countryCode)}</span>
                      {v.city !== "Unknown" && v.city !== "Localhost"
                        ? `${v.city}, `
                        : ""}
                      {v.country}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-forest-800/70">
                      {v.referrer ? (
                        <span className="inline-flex items-center gap-1">
                          {v.referrer}
                          <ArrowUpRight className="size-3 text-forest-800/40" />
                        </span>
                      ) : (
                        "Direct"
                      )}
                    </td>
                  </tr>
                ))}
                {stats.recent.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-forest-800/50"
                    >
                      No visits recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-forest-800/45">
          Privacy-respecting analytics · no raw IP addresses or personal data
          are stored.
        </p>
      </div>
    </div>
  );
}
