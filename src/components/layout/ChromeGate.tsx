"use client";

import { usePathname } from "next/navigation";

/**
 * Hides public site chrome (e.g. the footer) on private routes like /admin.
 * Accepts already-rendered server content as children.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
