"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-forest-50 sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      {/* soft gold glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 size-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 size-96 rounded-full bg-forest-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          tone="light"
          eyebrow="Landlord Stories"
          title="Trusted from across the world"
          description="Real words from landlords who handed us their properties — and got their peace of mind back."
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto size-12 text-gold-400/50" />

          <div className="relative mt-6 min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="mx-auto max-w-3xl text-balance font-display text-2xl font-medium leading-snug text-forest-50 sm:text-[1.75rem]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-gold-500/15 font-display text-lg font-medium text-gold-300 ring-1 ring-inset ring-gold-500/30">
                    {initials(active.name)}
                  </span>
                  <div className="text-left">
                    <p className="font-medium text-white">{active.name}</p>
                    <p className="text-sm text-forest-100/60">
                      {active.role} · {active.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-forest-100/15 text-forest-100 transition-all hover:border-gold-400/60 hover:text-gold-300"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-gold-400"
                      : "w-1.5 bg-forest-100/25 hover:bg-forest-100/50",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-forest-100/15 text-forest-100 transition-all hover:border-gold-400/60 hover:text-gold-300"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
