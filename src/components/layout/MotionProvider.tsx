"use client";

import { MotionConfig } from "motion/react";

/**
 * Honours the visitor's "reduce motion" setting for every Motion animation:
 * slides and scale-ins are skipped, gentle fades remain. (The CSS rule in
 * globals.css only covers CSS animations and transitions.)
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
