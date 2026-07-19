import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/content";
import { site } from "@/lib/site";
import { Phone } from "lucide-react";

interface CtaBannerProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  image?: string;
}

export function CtaBanner({
  eyebrow = "Ready When You Are",
  title = "Ready to stop worrying about your property?",
  description = "Book a free, no-obligation consultation today. We'll assess your property, answer your questions, and show you exactly how stress-free ownership feels.",
  primaryLabel = "Get Started Today",
  primaryHref = "/contact",
  image = images.ctaProperty,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950/60" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2.5 text-gold-300">
            <span className="h-px w-8 bg-gold-300/60" />
            {eyebrow}
            <span className="h-px w-8 bg-gold-300/60" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-forest-100/80">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryHref} variant="gold" size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button
              href={`tel:${site.contact.phones[0].tel}`}
              variant="outlineLight"
              size="lg"
            >
              <Phone className="size-4" />
              {site.contact.phones[0].display}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
