import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "info@bevyirie.com";

export const SESSION_COOKIE = "bi_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const DEV_FALLBACK_PASSCODE = "bevyirie-admin";

/**
 * The admin passcode. In production it MUST be set via ADMIN_PASSCODE.
 * In development a fallback is allowed so the dashboard is testable locally.
 * Returns null when access is not configured (→ login is disabled).
 */
function getPasscode(): string | null {
  const env = process.env.ADMIN_PASSCODE;
  if (env && env.length > 0) return env;
  if (process.env.NODE_ENV !== "production") return DEV_FALLBACK_PASSCODE;
  return null;
}

export function isAdminConfigured(): boolean {
  return getPasscode() !== null;
}

export function usingDevPasscode(): boolean {
  return !process.env.ADMIN_PASSCODE && process.env.NODE_ENV !== "production";
}

/**
 * The secret used to sign session cookies. In production this MUST come from
 * the environment — we never fall back to a known default there, otherwise a
 * forged cookie could authenticate. Returns null when no real secret exists,
 * which locks the dashboard entirely.
 */
function sessionSecret(): string | null {
  const fromEnv = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSCODE;
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== "production") return DEV_FALLBACK_PASSCODE;
  return null;
}

function sha256(input: string): Buffer {
  return createHash("sha256").update(input).digest();
}

/** Constant-time comparison that doesn't leak length. */
export function verifyPasscode(input: string): boolean {
  const passcode = getPasscode();
  if (!passcode || typeof input !== "string") return false;
  return timingSafeEqual(sha256(input), sha256(passcode));
}

function sign(payload: string): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ iat: Date.now(), sub: ADMIN_EMAIL }),
  ).toString("base64url");
  const sig = sign(payload);
  if (!sig) throw new Error("Admin session secret is not configured.");
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload);
  if (!expected) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const { iat } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof iat !== "number") return false;
    return Date.now() - iat < MAX_AGE_SECONDS * 1000;
  } catch {
    return false;
  }
}

/** Whether the current request carries a valid admin session. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
