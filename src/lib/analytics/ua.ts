import type { DeviceType } from "@/types";

/**
 * Lightweight, dependency-free User-Agent parser.
 * Covers the browsers/OSes that make up the overwhelming majority of traffic.
 */
export function parseUserAgent(ua: string): {
  device: DeviceType;
  browser: string;
  os: string;
} {
  const s = ua || "";

  // OS
  let os = "Unknown";
  if (/windows nt/i.test(s)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(s)) os = "iOS";
  else if (/mac os x/i.test(s)) os = "macOS";
  else if (/android/i.test(s)) os = "Android";
  else if (/cros/i.test(s)) os = "ChromeOS";
  else if (/linux/i.test(s)) os = "Linux";

  // Browser (order matters — Edge/Opera/Samsung masquerade as Chrome)
  let browser = "Unknown";
  if (/edg(a|ios|)?\//i.test(s)) browser = "Edge";
  else if (/opr\/|opera/i.test(s)) browser = "Opera";
  else if (/samsungbrowser/i.test(s)) browser = "Samsung Internet";
  else if (/firefox|fxios/i.test(s)) browser = "Firefox";
  else if (/chrome|crios/i.test(s)) browser = "Chrome";
  else if (/safari/i.test(s)) browser = "Safari";

  // Device
  let device: DeviceType = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(s)) device = "tablet";
  else if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(s))
    device = "mobile";

  return { device, browser, os };
}

/** ISO country code (e.g. "NG") → flag emoji (🇳🇬). */
export function countryFlag(code?: string): string {
  if (!code || code.length !== 2) return "🌍";
  const cc = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "🌍";
  return String.fromCodePoint(
    ...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  NG: "Nigeria",
  GB: "United Kingdom",
  US: "United States",
  CA: "Canada",
  AE: "United Arab Emirates",
  GH: "Ghana",
  ZA: "South Africa",
  DE: "Germany",
  FR: "France",
  IN: "India",
  AU: "Australia",
  IE: "Ireland",
  NL: "Netherlands",
  SA: "Saudi Arabia",
  IT: "Italy",
  ES: "Spain",
};

export function countryName(code?: string): string {
  if (!code) return "Unknown";
  return COUNTRY_NAMES[code.toUpperCase()] ?? code.toUpperCase();
}
