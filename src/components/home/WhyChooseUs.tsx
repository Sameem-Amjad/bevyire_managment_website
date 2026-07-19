import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <Section tone="cream" spacing="lg">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Bevy Irie"
          title="The difference is peace of mind"
          description="Distance shouldn't mean uncertainty. We built our entire service around the three things absentee landlords tell us they need most."
        />

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          stagger={0.12}
        >
          {whyChooseUs.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                <span className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] font-medium leading-none text-forest-900/[0.04] transition-colors duration-500 group-hover:text-gold-500/10">
                  0{i + 1}
                </span>
                <span className="relative mb-6 grid size-16 place-items-center rounded-2xl bg-forest-900 text-gold-300 shadow-soft transition-transform duration-500 group-hover:scale-105">
                  <item.icon className="size-7" strokeWidth={1.5} />
                </span>
                <h3 className="relative font-display text-2xl font-medium text-forest-950">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-pretty leading-relaxed text-forest-800/75">
                  {item.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
