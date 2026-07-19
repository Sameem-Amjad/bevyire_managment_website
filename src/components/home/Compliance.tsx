import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { compliance } from "@/lib/content";
import { BadgeCheck } from "lucide-react";

export function Compliance() {
  return (
    <Section tone="ivory" spacing="md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Compliance & Assurance"
          title="Held to a higher standard"
          description="Every property we manage is run on the same principles of documentation, transparency and professionalism you would expect from a top UK agency."
        />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {compliance.map((item) => (
            <RevealItem key={item.label} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-forest-900/8 bg-white p-7 text-center shadow-soft">
                <span className="mb-4 grid size-14 place-items-center rounded-full bg-gold-500/12 text-gold-600">
                  <BadgeCheck className="size-7" strokeWidth={1.6} />
                </span>
                <p className="font-display text-lg font-medium text-forest-950">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-forest-800/70">
                  {item.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Accreditation placeholders — client can drop in real memberships */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-dashed border-forest-900/15 bg-cream/50 p-6">
            <p className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-forest-800/50">
              Accreditations & Memberships
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-xl border border-forest-900/10 bg-white/60 text-xs font-medium text-forest-800/40"
                >
                  Your logo here
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
