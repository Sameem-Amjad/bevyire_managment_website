"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Star, ArrowDown, Camera, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={images.heroPrimary}
          alt="A luxury residential property at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility + brand gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:pb-28 lg:pt-24">
        {/* Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div variants={up}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gold-400" />
              </span>
              Property Management · Lagos, Nigeria
            </span>
          </motion.div>

          <motion.h1
            variants={up}
            className="mt-6 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]"
          >
            Property Management You Can Trust —{" "}
            <span className="italic text-gold-300">Even When You&apos;re</span>{" "}
            Miles Away
          </motion.h1>

          <motion.p
            variants={up}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-forest-100/80"
          >
            We help absentee landlords protect, manage and maximise their
            property investments in Lagos — with complete transparency,
            dedicated managers and reporting you can actually see.
          </motion.p>

          <motion.div variants={up} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="gold" size="lg" withArrow>
              Get a Free Consultation
            </Button>
            <Button href="/services" variant="outlineLight" size="lg">
              Explore Our Services
            </Button>
          </motion.div>

          <motion.div
            variants={up}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-sm text-forest-100/70">
                <span className="font-semibold text-white">4.9/5</span> landlord
                rating
              </span>
            </div>
            <div className="hidden h-6 w-px bg-ivory/15 sm:block" />
            <p className="text-sm text-forest-100/70">
              <span className="font-semibold text-white">480+</span> properties
              managed across{" "}
              <span className="font-semibold text-white">3 continents</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Floating transparency card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-sm animate-float">
            <div className="overflow-hidden rounded-[1.75rem] border border-ivory/15 bg-ivory/[0.07] p-2.5 shadow-lift backdrop-blur-xl">
              <div className="relative h-44 overflow-hidden rounded-[1.35rem]">
                <Image
                  src={images.heroInterior}
                  alt="A managed property interior"
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-forest-950/70 px-3 py-1 text-[0.7rem] font-medium text-gold-200 backdrop-blur">
                  <Camera className="size-3" /> July inspection
                </span>
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    Monthly Owner Report
                  </p>
                  <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.7rem] font-semibold text-gold-300">
                    Sent
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-forest-950/40 px-3.5 py-3">
                  <span className="flex items-center gap-2 text-sm text-forest-100/80">
                    <Receipt className="size-4 text-gold-300" /> Rent collected
                  </span>
                  <span className="font-semibold text-white">₦1,450,000</span>
                </div>
                <div className="flex items-center justify-between text-xs text-forest-100/60">
                  <span>Occupancy 100%</span>
                  <span>Maintenance: 1 resolved</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-forest-100/60">
          <span className="text-[0.7rem] uppercase tracking-[0.25em]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
