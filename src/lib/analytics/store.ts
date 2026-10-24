import { Redis } from "@upstash/redis";
import type { AnalyticsStats, RankItem, Visit } from "@/types";
import { appendRecord, readRecords } from "./secureFile";

const KEY = "bi:visits:v1";
const MAX = 2000;

type Source = "upstash" | "file" | "memory";

/* ---------------------------------------------------------------
   Storage backend — Upstash Redis when configured, else in-memory
   --------------------------------------------------------------- */
let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

export function usingUpstash(): boolean {
  return getRedis() !== null;
}

// Shared process-wide flags/state (Next bundles routes separately, so we keep
// these on globalThis to share one instance across route bundles).
const globalStore = globalThis as typeof globalThis & {
  __biVisits?: Visit[];
  __biFileBad?: boolean;
  __biTampered?: number;
};

// In-memory fallback (seeded demo data) — used only when neither Upstash nor a
// writable file is available (e.g. a read-only serverless filesystem).
function memoryStore(): Visit[] {
  if (!globalStore.__biVisits) globalStore.__biVisits = seedVisits();
  return globalStore.__biVisits;
}

// Vercel's filesystem is read-only, and there the file would be missing, not
// failing, so the dashboard would show no visits at all: use memory instead,
// unless a writable ANALYTICS_DATA_FILE has been set.
const readOnlyHost = Boolean(process.env.VERCEL) && !process.env.ANALYTICS_DATA_FILE;

function fileUsable(): boolean {
  return !getRedis() && !globalStore.__biFileBad && !readOnlyHost;
}

export function currentSource(): Source {
  if (getRedis()) return "upstash";
  return fileUsable() ? "file" : "memory";
}

export async function recordVisit(visit: Visit): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.lpush(KEY, visit);
    await r.ltrim(KEY, 0, MAX - 1);
    return;
  }

  if (fileUsable()) {
    try {
      await appendRecord(visit);
      return;
    } catch (e) {
      console.error("[analytics] file write failed — using memory:", e);
      globalStore.__biFileBad = true;
    }
  }

  const store = memoryStore();
  store.unshift(visit);
  if (store.length > MAX) store.length = MAX;
}

async function getVisits(limit = MAX): Promise<Visit[]> {
  const r = getRedis();
  if (r) {
    const raw = await r.lrange<Visit | string>(KEY, 0, limit - 1);
    return raw.map((v) => (typeof v === "string" ? (JSON.parse(v) as Visit) : v));
  }

  if (fileUsable()) {
    try {
      const { records, tampered } = await readRecords<Visit>(limit);
      globalStore.__biTampered = tampered;
      return records;
    } catch (e) {
      console.error("[analytics] file read failed — using memory:", e);
      globalStore.__biFileBad = true;
    }
  }

  return memoryStore().slice(0, limit);
}

/* ---------------------------------------------------------------
   Stats
   --------------------------------------------------------------- */
function rank(
  visits: Visit[],
  pick: (v: Visit) => string,
  metaPick?: (v: Visit) => string | undefined,
  limit = 6,
): RankItem[] {
  const counts = new Map<string, { value: number; meta?: string }>();
  for (const v of visits) {
    const label = pick(v) || "Unknown";
    const existing = counts.get(label);
    if (existing) existing.value += 1;
    else counts.set(label, { value: 1, meta: metaPick?.(v) });
  }
  return [...counts.entries()]
    .map(([label, { value, meta }]) => ({ label, value, meta }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export async function getStats(): Promise<AnalyticsStats> {
  const visits = await getVisits();
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const perDayMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000);
    perDayMap.set(dayKey(d), 0);
  }
  for (const v of visits) {
    const k = dayKey(new Date(v.ts));
    if (perDayMap.has(k)) perDayMap.set(k, (perDayMap.get(k) ?? 0) + 1);
  }

  return {
    totalViews: visits.length,
    uniqueVisitors: new Set(visits.map((v) => v.visitor)).size,
    todayViews: visits.filter((v) => new Date(v.ts) >= startOfToday).length,
    liveWindowViews: visits.filter(
      (v) => now - new Date(v.ts).getTime() < 15 * 60_000,
    ).length,
    topPages: rank(visits, (v) => v.path),
    devices: rank(visits, (v) => v.device),
    browsers: rank(visits, (v) => v.browser),
    os: rank(visits, (v) => v.os),
    countries: rank(
      visits,
      (v) => v.country,
      (v) => v.countryCode,
    ),
    cities: rank(
      visits,
      (v) => (v.city && v.city !== "Unknown" ? v.city : "Unknown"),
      (v) => v.countryCode,
    ),
    referrers: rank(visits, (v) => v.referrer || "Direct"),
    perDay: [...perDayMap.entries()].map(([day, views]) => ({ day, views })),
    recent: visits.slice(0, 25),
    source: currentSource(),
    tampered: globalStore.__biTampered ?? 0,
  };
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/* ---------------------------------------------------------------
   Seed data (in-memory demo only — makes the dashboard look alive
   before a persistent store is connected)
   --------------------------------------------------------------- */
function seedVisits(): Visit[] {
  const pages = [
    "/",
    "/",
    "/",
    "/services",
    "/services",
    "/about",
    "/contact",
    "/blog",
    "/blog/is-now-a-good-time-to-invest-in-lagos-real-estate",
    "/blog/absentee-landlord-guide-managing-property-in-lagos",
  ];
  const geos: [string, string, string, string][] = [
    // country, code, city, region
    ["United Kingdom", "GB", "London", "England"],
    ["United Kingdom", "GB", "Manchester", "England"],
    ["United States", "US", "Houston", "Texas"],
    ["United States", "US", "Atlanta", "Georgia"],
    ["Canada", "CA", "Toronto", "Ontario"],
    ["United Arab Emirates", "AE", "Dubai", "Dubai"],
    ["Nigeria", "NG", "Lagos", "Lagos"],
    ["Nigeria", "NG", "Abuja", "FCT"],
    ["Ghana", "GH", "Accra", "Greater Accra"],
    ["Germany", "DE", "Berlin", "Berlin"],
  ];
  const devices: { device: Visit["device"]; browser: string; os: string }[] = [
    { device: "mobile", browser: "Safari", os: "iOS" },
    { device: "mobile", browser: "Chrome", os: "Android" },
    { device: "desktop", browser: "Chrome", os: "Windows" },
    { device: "desktop", browser: "Chrome", os: "macOS" },
    { device: "desktop", browser: "Safari", os: "macOS" },
    { device: "tablet", browser: "Safari", os: "iOS" },
    { device: "desktop", browser: "Edge", os: "Windows" },
    { device: "desktop", browser: "Firefox", os: "Windows" },
  ];
  const referrers = [
    "Direct",
    "Direct",
    "Direct",
    "google.com",
    "google.com",
    "linkedin.com",
    "facebook.com",
    "instagram.com",
    "t.co",
  ];

  const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const visitors = Array.from({ length: 34 }, (_, i) => `v_${i}`);
  const count = 78;
  const out: Visit[] = [];

  for (let i = 0; i < count; i++) {
    const [country, countryCode, city, region] = pick(geos);
    const d = pick(devices);
    // Weight recent days more heavily.
    const daysAgo = Math.floor(Math.pow(Math.random(), 1.8) * 14);
    const ts = new Date(
      Date.now() - daysAgo * 86_400_000 - Math.random() * 86_400_000,
    ).toISOString();
    out.push({
      id: `seed_${i}_${Math.random().toString(36).slice(2, 8)}`,
      ts,
      path: pick(pages),
      referrer: pick(referrers),
      country,
      countryCode,
      city,
      region,
      device: d.device,
      browser: d.browser,
      os: d.os,
      language: pick(["en-GB", "en-US", "en", "fr-FR"]),
      timezone: pick([
        "Europe/London",
        "America/Chicago",
        "America/Toronto",
        "Asia/Dubai",
        "Africa/Lagos",
      ]),
      visitor: pick(visitors),
    });
  }

  return out.sort((a, b) => (a.ts < b.ts ? 1 : -1));
}
