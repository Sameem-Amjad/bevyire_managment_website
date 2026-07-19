import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="border-y border-forest-900/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-12 text-center">
          <span className="eyebrow inline-flex items-center gap-2.5 text-gold-600">
            <span className="h-px w-8 bg-gold-500/60" />
            By the Numbers
            <span className="h-px w-8 bg-gold-500/60" />
          </span>
        </div>
        <RevealGroup
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4"
          stagger={0.1}
        >
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={
                i < stats.length - 1
                  ? "lg:border-r lg:border-forest-900/10"
                  : ""
              }
            >
              <div className="px-4 text-center">
                <p className="font-display text-5xl font-medium tracking-tight text-forest-900 sm:text-6xl">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-wide text-forest-800/60">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
