import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceDetail({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  const flip = index % 2 === 1;

  return (
    <div
      id={service.slug}
      className="scroll-mt-28 border-b border-forest-900/8 py-16 last:border-0 sm:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Media */}
        <Reveal
          direction={flip ? "left" : "right"}
          className={cn(flip && "lg:order-2")}
        >
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
            </div>
            {/* floating icon badge */}
            <div
              className={cn(
                "absolute -bottom-5 grid size-16 place-items-center rounded-2xl bg-forest-900 text-gold-300 shadow-lift",
                flip ? "-right-3 lg:-right-5" : "-left-3 lg:-left-5",
              )}
            >
              <Icon className="size-7" strokeWidth={1.5} />
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className={cn(flip && "lg:order-1")}>
          <Reveal>
            <span className="eyebrow text-gold-600">{service.tagline}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-forest-950 sm:text-4xl">
              {service.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty leading-relaxed text-forest-800/80">
              {service.description}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-forest-800/85">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Process mini-steps */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-x-2 gap-y-3">
              {service.process.map((p, i) => (
                <div key={p.title} className="flex items-center gap-2">
                  <span className="rounded-full bg-forest-900/[0.05] px-3.5 py-1.5 text-xs font-medium text-forest-800">
                    <span className="text-gold-600">{i + 1}.</span> {p.title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <Button
              href="/contact"
              variant="primary"
              size="md"
              withArrow
              className="mt-8"
            >
              Enquire About {service.title}
            </Button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
