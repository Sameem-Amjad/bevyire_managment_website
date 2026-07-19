import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-forest-50">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
      )}
      {/* ambient gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/85 to-forest-900" />
      <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-44">
        {breadcrumbs && (
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center justify-center gap-1.5 text-sm text-forest-100/60"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-gold-300"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-forest-50">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="size-3.5 text-forest-100/40" />
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal delay={0.05}>
            <span className="eyebrow inline-flex items-center gap-2.5 text-gold-300">
              <span className="h-px w-8 bg-gold-300/60" />
              {eyebrow}
              <span className="h-px w-8 bg-gold-300/60" />
            </span>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>

        {description && (
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-forest-100/80">
              {description}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
