import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services, featuredServiceSlugs } from "@/lib/content";

export function ServicesPreview() {
  const featured = featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <Section tone="ivory" spacing="lg" id="services">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Everything your property needs,
              <br className="hidden sm:block" /> handled with care
            </>
          }
          description="One partner for the full lifecycle of your investment — from finding the right tenant to protecting your building's value for the long term."
        />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {featured.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <ServiceCard service={service} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href="/services" variant="primary" size="lg" withArrow>
            View All Services
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
