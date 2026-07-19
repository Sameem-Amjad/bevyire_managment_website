"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProcessTimeline() {
  return (
    <Section tone="forest" spacing="lg" className="overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          tone="light"
          eyebrow="How It Works"
          title="Five simple steps to effortless ownership"
          description="A clear, proven path from first conversation to a property that quietly works harder for you every month."
        />

        {/* Desktop — horizontal */}
        <div className="relative mt-20 hidden lg:block">
          {/* base line */}
          <div className="absolute left-0 right-0 top-7 h-px bg-forest-100/15" />
          {/* animated gold line */}
          <motion.div
            className="absolute left-0 top-7 h-px origin-left bg-gradient-to-r from-gold-500 to-gold-300"
            style={{ right: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <div className="relative grid grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.18 }}
                className="flex flex-col items-center text-center"
              >
                <span className="relative z-10 grid size-14 place-items-center rounded-full border border-gold-500/40 bg-forest-800 text-gold-300 shadow-lift">
                  <step.icon className="size-6" strokeWidth={1.5} />
                  <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-gold-500 text-[0.65rem] font-bold text-forest-950">
                    {step.step}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-lg font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-100/65">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet — vertical */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-6 left-7 top-6 w-px bg-forest-100/15" />
          <motion.div
            className="absolute left-7 top-6 w-px origin-top bg-gradient-to-b from-gold-500 to-gold-300"
            style={{ bottom: 24 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <div className="space-y-9">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                className="relative flex items-start gap-5"
              >
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-forest-800 text-gold-300 shadow-lift">
                  <step.icon className="size-6" strokeWidth={1.5} />
                  <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-gold-500 text-[0.65rem] font-bold text-forest-950">
                    {step.step}
                  </span>
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest-100/65">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="/contact" variant="gold" size="lg" withArrow>
            Start With Step One
          </Button>
        </div>
      </div>
    </Section>
  );
}
