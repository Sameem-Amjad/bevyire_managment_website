import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Encrypted, tamper-evident, append-only visit log stored as a text file
 * on the server.
 *
 * Each line is one visit, encrypted with AES-256-GCM:
 *     base64(iv) . base64(authTag) . base64(ciphertext)
 *
 * The GCM auth tag guarantees integrity: if an attacker edits any byte of a
 * record (or forges one) without the secret key, decryption fails and that
 * record is rejected. The contents are also unreadable without the key.
 */

const MAX_RECORDS = 5000;
const ALGO = "aes-256-gcm";

function secret(): string {
  return (
    process.env.ANALYTICS_SECRET ??
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSCODE ??
    "bevyirie-analytics-dev"
  );
}

/** 32-byte key derived from the configured secret. */
function key(): Buffer {
  return createHash("sha256").update(secret()).digest();
}

export function dataFilePath(): string {
  return (
    process.env.ANALYTICS_DATA_FILE ??
    path.join(process.cwd(), ".data", "visits.txt")
  );
}

export function encryptRecord(obj: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, key(), iv);
  const pt = Buffer.from(JSON.stringify(obj), "utf8");
  const ct = Buffer.concat([cipher.update(pt), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [
    iv.toString("base64"),
    tag.toString("base64"),
    ct.toString("base64"),
  ].join(".");
}

export function decryptRecord<T>(line: string): T | null {
  const parts = line.split(".");
  if (parts.length !== 3) return null;
  try {
    const [ivB, tagB, ctB] = parts;
    const decipher = createDecipheriv(ALGO, key(), Buffer.from(ivB, "base64"));
    decipher.setAuthTag(Buffer.from(tagB, "base64"));
    const pt = Buffer.concat([
      decipher.update(Buffer.from(ctB, "base64")),
      decipher.final(),
    ]);
    return JSON.parse(pt.toString("utf8")) as T;
  } catch {
    // Corrupt, truncated or tampered record — reject it.
    return null;
  }
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(path.dirname(dataFilePath()), { recursive: true });
}

export async function appendRecord(obj: unknown): Promise<void> {
  await ensureDir();
  await fs.appendFile(dataFilePath(), encryptRecord(obj) + "\n", "utf8");
}

/** Returns decrypted records newest-first, and a count of rejected (tampered) lines. */
export async function readRecords<T>(
  limit = MAX_RECORDS,
): Promise<{ records: T[]; tampered: number }> {
  let raw: string;
  try {
    raw = await fs.readFile(dataFilePath(), "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT")
      return { records: [], tampered: 0 };
    throw e;
  }

  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  const records: T[] = [];
  let tampered = 0;

  for (let i = lines.length - 1; i >= 0 && records.length < limit; i--) {
    const rec = decryptRecord<T>(lines[i]);
    if (rec) records.push(rec);
    else tampered++;
  }

  // Opportunistic compaction to bound file growth.
  if (lines.length > MAX_RECORDS * 1.2) {
    try {
      await fs.writeFile(
        dataFilePath(),
        lines.slice(lines.length - MAX_RECORDS).join("\n") + "\n",
        "utf8",
      );
    } catch {
      /* best effort */
    }
  }

  return { records, tampered };
}
