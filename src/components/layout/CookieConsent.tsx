"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "bevyirie-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setShow(true), 1600);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage unavailable — skip */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-3xl border border-forest-900/10 bg-ivory/95 p-5 shadow-lift backdrop-blur-xl sm:inset-x-auto sm:left-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-900/[0.06] text-gold-600">
              <Cookie className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg text-forest-950">
                We value your privacy
              </p>
              <p className="mt-1 text-sm leading-relaxed text-forest-800/75">
                We use cookies to enhance your browsing experience and analyse
                our traffic. You can accept or decline non-essential cookies.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="sm" variant="primary" onClick={() => decide("accepted")}>
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => decide("declined")}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
