import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { recordVisit } from "@/lib/analytics/store";
import { parseUserAgent, countryName } from "@/lib/analytics/ua";
import type { Visit } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function header(req: NextRequest, name: string): string {
  return req.headers.get(name) ?? "";
}

function clientIp(req: NextRequest): string {
  const fwd = header(req, "x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return header(req, "x-real-ip") || "0.0.0.0";
}

/** Non-reversible daily visitor fingerprint (no raw IP is ever stored). */
function fingerprint(ip: string, ua: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256")
    .update(`${ip}::${ua}::${day}::bevyirie`)
    .digest("hex")
    .slice(0, 16);
}

function sanitizePath(input: unknown): string {
  if (typeof input !== "string" || !input.startsWith("/")) return "/";
  return input.split("?")[0].split("#")[0].slice(0, 200);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty body is fine */
  }

  const path = sanitizePath(body.path);

  // Never track the private dashboard or API traffic.
  if (path.startsWith("/admin") || path.startsWith("/api")) {
    return new NextResponse(null, { status: 204 });
  }

  const ua = header(req, "user-agent");
  const { device, browser, os } = parseUserAgent(ua);

  const countryCode = header(req, "x-vercel-ip-country");
  const rawCity = header(req, "x-vercel-ip-city");
  const city = rawCity
    ? decodeURIComponent(rawCity)
    : countryCode
      ? "Unknown"
      : "Localhost";
  const region = header(req, "x-vercel-ip-country-region");

  let referrer = typeof body.referrer === "string" ? body.referrer : "";
  try {
    if (referrer) referrer = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    referrer = "";
  }

  const visit: Visit = {
    id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    path,
    referrer,
    country: countryCode ? countryName(countryCode) : "Local",
    countryCode: countryCode || "",
    city,
    region: region || "",
    device,
    browser,
    os,
    language:
      typeof body.language === "string"
        ? body.language.slice(0, 12)
        : header(req, "accept-language").split(",")[0] || "en",
    timezone: typeof body.timezone === "string" ? body.timezone.slice(0, 40) : "",
    visitor: fingerprint(clientIp(req), ua),
  };

  try {
    await recordVisit(visit);
  } catch (error) {
    console.error("[track] failed to record visit:", error);
  }

  return new NextResponse(null, { status: 204 });
}
