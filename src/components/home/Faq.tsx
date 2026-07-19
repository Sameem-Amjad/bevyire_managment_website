import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { MessagesSquare } from "lucide-react";

export function Faq() {
  return (
    <Section tone="cream" spacing="lg" id="faq">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2.5 text-gold-600">
              <span className="h-px w-8 bg-gold-500/60" />
              Questions
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-forest-950 sm:text-4xl lg:text-[2.75rem]">
              Everything you were <br className="hidden lg:block" /> about to ask
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-forest-800/75">
              Still unsure about something? We would rather answer it now than
              have you wonder. Reach out any time.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-2xl border border-forest-900/8 bg-white p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-forest-900 text-gold-300">
                <MessagesSquare className="size-5" />
              </span>
              <p className="mt-4 font-display text-lg text-forest-950">
                Still have questions?
              </p>
              <p className="mt-1 text-sm text-forest-800/70">
                Talk to a real property manager — no pressure, no obligation.
              </p>
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                withArrow
                className="mt-5"
              >
                Ask Us Directly
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
