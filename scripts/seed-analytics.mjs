// Seeds the owner dashboard's Upstash list (bi:visits:v1) with two weeks of realistic,
// repeatable visits for the portfolio demo. Real visits are then added on top as they happen.
// Replaces whatever is in the list.
//   KV_REST_API_URL=… KV_REST_API_TOKEN=… node scripts/seed-analytics.mjs
// (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, as in src/lib/analytics/store.ts)
import { Redis } from "@upstash/redis";

const KEY = "bi:visits:v1";
const DAYS = 14;
const DRY = process.argv.includes("--dry"); // print what would be stored
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
if ((!url || !token) && !DRY) {
  console.error("Set KV_REST_API_URL and KV_REST_API_TOKEN (or the UPSTASH_REDIS_REST_* pair).");
  process.exit(1);
}

// Same numbers every run (mulberry32), so the demo looks the same after a reseed.
let seed = 20260719;
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const weighted = (items) => {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [item, w] of items) if ((r -= w) < 0) return item;
  return items.at(-1)[0];
};
const hex = (n) => Array.from({ length: n }, () => Math.floor(rand() * 16).toString(16)).join("");

// Absentee landlords: the diaspora (UK, US, Canada, the Gulf) plus Nigeria itself.
// [country, code, city, region, timezone, language, UTC hours they browse, weight]
const GEOS = [
  ["United Kingdom", "GB", "London", "England", "Europe/London", "en-GB", [7, 12, 19, 20, 21, 22], 20],
  ["United Kingdom", "GB", "Manchester", "England", "Europe/London", "en-GB", [8, 13, 19, 21], 5],
  ["United Kingdom", "GB", "Birmingham", "England", "Europe/London", "en-GB", [12, 20, 21], 3],
  ["United States", "US", "Houston", "Texas", "America/Chicago", "en-US", [1, 2, 14, 18, 23], 7],
  ["United States", "US", "Atlanta", "Georgia", "America/New_York", "en-US", [0, 1, 13, 17, 22], 5],
  ["United States", "US", "New York", "New York", "America/New_York", "en-US", [0, 13, 16, 22], 4],
  ["Canada", "CA", "Toronto", "Ontario", "America/Toronto", "en-CA", [0, 1, 13, 22], 6],
  ["Canada", "CA", "Calgary", "Alberta", "America/Edmonton", "en-CA", [2, 3, 16], 2],
  ["United Arab Emirates", "AE", "Dubai", "Dubai", "Asia/Dubai", "en-GB", [5, 9, 15, 17], 4],
  ["Nigeria", "NG", "Lagos", "Lagos", "Africa/Lagos", "en-GB", [8, 9, 11, 13, 15, 17, 19], 14],
  ["Nigeria", "NG", "Abuja", "FCT", "Africa/Lagos", "en-GB", [9, 12, 16, 19], 5],
  ["Nigeria", "NG", "Port Harcourt", "Rivers", "Africa/Lagos", "en-US", [10, 18], 2],
  ["Ireland", "IE", "Dublin", "Leinster", "Europe/Dublin", "en-IE", [19, 21], 2],
  ["Ghana", "GH", "Accra", "Greater Accra", "Africa/Accra", "en-GB", [10, 16], 2],
  ["South Africa", "ZA", "Johannesburg", "Gauteng", "Africa/Johannesburg", "en-ZA", [9, 18], 1],
  ["Germany", "DE", "Berlin", "Berlin", "Europe/Berlin", "de-DE", [18, 20], 1],
];
const DEVICES = [
  [{ device: "mobile", browser: "Safari", os: "iOS" }, 25],
  [{ device: "mobile", browser: "Chrome", os: "Android" }, 27],
  [{ device: "mobile", browser: "Samsung Internet", os: "Android" }, 3],
  [{ device: "desktop", browser: "Chrome", os: "Windows" }, 18],
  [{ device: "desktop", browser: "Chrome", os: "macOS" }, 8],
  [{ device: "desktop", browser: "Safari", os: "macOS" }, 7],
  [{ device: "desktop", browser: "Edge", os: "Windows" }, 5],
  [{ device: "desktop", browser: "Firefox", os: "Windows" }, 2],
  [{ device: "tablet", browser: "Safari", os: "iOS" }, 5],
];
const REFERRERS = [["", 34], ["google.com", 30], ["linkedin.com", 9], ["facebook.com", 8], ["instagram.com", 7], ["nairaland.com", 3], ["bing.com", 3], ["chatgpt.com", 2], ["t.co", 2]];
const POSTS = [
  ["/blog/is-now-a-good-time-to-invest-in-lagos-real-estate", 6],
  ["/blog/absentee-landlord-guide-managing-property-in-lagos", 6],
  ["/blog/choosing-a-property-manager-nigeria", 4],
  ["/blog/screening-tenants-remotely-playbook", 3],
  ["/blog/protecting-your-property-title-lagos", 3],
  ["/blog/preventative-maintenance-protecting-your-yield", 2],
];
const LANDING = [["/", 52], ["/services", 10], ["/blog", 4], ...POSTS.map(([p, w]) => [p, w * 1.5]), ["/about", 3]];
const NEXT = [["/services", 30], ["/about", 14], ["/contact", 18], ["/blog", 10], ...POSTS, ["/", 6], ["/privacy", 1], ["/terms", 1]];

const now = Date.now();
const startOfToday = new Date(now);
startOfToday.setUTCHours(0, 0, 0, 0);
const visits = [];
for (let d = DAYS - 1; d >= 0; d--) {
  const day = new Date(startOfToday.getTime() - d * 86_400_000);
  const weekday = day.getUTCDay();
  // weekends a little busier (landlords browse at home), with a gentle upward trend
  const sessions = Math.round((16 + (DAYS - d) * 0.6 + (weekday === 0 || weekday === 6 ? 5 : 0)) * (0.85 + rand() * 0.3));
  for (let s = 0; s < sessions; s++) {
    const [country, countryCode, city, region, timezone, language, hours] = weighted(GEOS.map((g) => [g, g[7]]));
    const hour = hours[Math.floor(rand() * hours.length)];
    let t = day.getTime() + hour * 3_600_000 + Math.floor(rand() * 3_600_000);
    if (t > now - 60_000) continue; // nothing in the future
    const ua = weighted(DEVICES);
    const referrer = weighted(REFERRERS);
    const visitor = hex(16);
    const pages = [weighted(LANDING)];
    const depth = weighted([[1, 34], [2, 30], [3, 20], [4, 10], [5, 6]]);
    while (pages.length < depth) {
      const p = weighted(NEXT);
      if (p !== pages.at(-1)) pages.push(p);
    }
    for (const path of pages) {
      if (t > now - 60_000) break;
      visits.push({
        id: `${t.toString(36)}_${hex(6)}`,
        ts: new Date(t).toISOString(),
        path, referrer, country, countryCode, city, region, ...ua, language, timezone, visitor,
      });
      t += 25_000 + Math.floor(rand() * 150_000);
    }
  }
}
// A few people on the site right now, so "Active now" isn't empty.
for (let i = 0; i < 3; i++) {
  const [country, countryCode, city, region, timezone, language] = GEOS[[0, 9, 3][i]];
  visits.push({
    id: `live_${hex(8)}`, ts: new Date(now - (2 + i * 4) * 60_000).toISOString(),
    path: ["/", "/services", "/blog/absentee-landlord-guide-managing-property-in-lagos"][i], referrer: ["google.com", "", "linkedin.com"][i],
    country, countryCode, city, region, ...DEVICES[[0, 1, 3][i]][0], language, timezone, visitor: hex(16),
  });
}

visits.sort((a, b) => (a.ts < b.ts ? 1 : -1)); // newest first, like recordVisit's LPUSH
if (DRY) {
  const count = (pick) => Object.entries(visits.reduce((m, v) => ((m[pick(v)] = (m[pick(v)] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]).slice(0, 6);
  console.log(`${visits.length} visits, ${new Set(visits.map((v) => v.visitor)).size} visitors`);
  for (const [label, pick] of [["per day", (v) => v.ts.slice(5, 10)], ["countries", (v) => v.country], ["pages", (v) => v.path], ["devices", (v) => v.device], ["referrers", (v) => v.referrer || "Direct"]])
    console.log(label.padEnd(10), count(pick).map(([k, n]) => `${k} ${n}`).join(" · "));
  process.exit(0);
}
const redis = new Redis({ url, token });
await redis.del(KEY);
for (let i = 0; i < visits.length; i += 200) await redis.rpush(KEY, ...visits.slice(i, i + 200));
const stored = await redis.llen(KEY);
const unique = new Set(visits.map((v) => v.visitor)).size;
console.log(`✓ ${stored} visits from ${unique} visitors over ${DAYS} days in ${KEY}`);
