"use client";

import { motion } from "motion/react";
import { visionTimeline } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function VisionTimeline() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* center line (desktop) / left line (mobile) */}
      <div className="absolute bottom-0 left-4 top-0 w-px bg-forest-100/15 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        className="absolute left-4 top-0 w-px origin-top bg-gradient-to-b from-gold-400 via-gold-500 to-transparent md:left-1/2 md:-translate-x-1/2"
        style={{ bottom: 0 }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.8, ease: EASE }}
      />

      <div className="space-y-10 md:space-y-16">
        {visionTimeline.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className={cn(
                "relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0",
                right && "md:[direction:rtl]",
              )}
            >
              {/* node */}
              <span className="absolute left-4 top-1.5 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full bg-gold-400 ring-4 ring-forest-950 md:left-1/2" />

              <div
                className={cn(
                  "md:[direction:ltr]",
                  right ? "md:col-start-2 md:pl-4" : "md:pr-4 md:text-right",
                )}
              >
                <span className="font-display text-3xl font-medium text-gold-300 sm:text-4xl">
                  {item.year}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-forest-100/70">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
