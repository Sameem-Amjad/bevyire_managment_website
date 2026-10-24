"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires a lightweight, privacy-respecting pageview beacon on every route
 * change. Sends no personal data — the server derives coarse location from
 * edge headers and stores only an anonymised visitor hash.
 *
 * Honours the cookie-consent choice and never tracks the /admin dashboard.
 */
export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    // Respect an explicit decline of the cookie banner.
    try {
      if (localStorage.getItem("bevyirie-cookie-consent") === "declined") return;
    } catch {
      /* ignore */
    }

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || "",
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screenWidth: window.innerWidth,
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/track",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        void fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      /* fire-and-forget */
    }
  }, [pathname]);

  return null;
}
