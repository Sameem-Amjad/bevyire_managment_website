import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/ui/CtaBanner";
import type { LegalSection } from "@/lib/legal";
import { LEGAL_UPDATED } from "@/lib/legal";

export function LegalDoc({
  title,
  intro,
  sections,
  crumb,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  crumb: string;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
      />

      <Section tone="ivory" spacing="lg">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="mb-10 text-sm text-forest-800/55">
              Last updated: {LEGAL_UPDATED}
            </p>
          </Reveal>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i * 0.04, 0.2)}>
                <div>
                  <h2 className="font-display text-2xl font-medium text-forest-950">
                    <span className="mr-3 text-gold-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-pretty leading-relaxed text-forest-800/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Questions?"
        title="Prefer to just talk to a person?"
        description="If anything here is unclear, we're always happy to explain it in plain language. Reach out any time."
        primaryLabel="Contact Us"
      />
    </>
  );
}
