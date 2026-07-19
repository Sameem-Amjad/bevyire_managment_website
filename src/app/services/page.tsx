import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { services, images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Our Services",
  description:
    "Full-service property management for absentee landlords in Lagos — management, rent collection, tenant screening, maintenance, inspections, marketing, sales, construction, development and valuation.",
  path: "/services",
});

function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Bevy Irie Property Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "Lagos, Nigeria",
      },
    })),
  };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />

      <PageHero
        eyebrow="Our Services"
        title="One trusted partner for every property need"
        description="From day-to-day management to major projects, we handle the full lifecycle of your investment — so distance never means compromise."
        image={images.heroInterior}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <Button href="/contact" variant="gold" size="lg" withArrow>
          Get a Free Consultation
        </Button>
      </PageHero>

      {/* Quick nav */}
      <section className="border-b border-forest-900/8 bg-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2.5 px-5 py-6 sm:px-8">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-forest-900/12 bg-white/70 px-4 py-2 text-sm font-medium text-forest-800 transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:text-forest-950"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed sections */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {services.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="No Obligation"
        title="Not sure which service you need?"
        description="Tell us about your property and your goals. We'll recommend exactly what makes sense — and nothing that doesn't."
        primaryLabel="Talk to a Property Manager"
      />
    </>
  );
}
