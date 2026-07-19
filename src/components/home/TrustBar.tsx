import { trustPoints } from "@/lib/content";

const locations = [
  "London",
  "Houston",
  "Toronto",
  "Dubai",
  "Manchester",
  "New York",
  "Abuja",
  "Atlanta",
  "Birmingham",
  "Accra",
];

export function TrustBar() {
  return (
    <section className="relative z-20 bg-forest-900 text-forest-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-forest-100/10 py-9 md:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-800 text-gold-300 ring-1 ring-inset ring-gold-500/20">
                <point.icon className="size-5" />
              </span>
              <span className="text-sm font-medium leading-tight text-forest-50">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Location marquee */}
      <div className="relative flex items-center gap-6 overflow-hidden py-5">
        <span className="shrink-0 pl-5 text-xs uppercase tracking-[0.25em] text-forest-100/50 sm:pl-8">
          Serving landlords in
        </span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-10">
            {[...locations, ...locations].map((loc, i) => (
              <span
                key={i}
                className="flex items-center gap-10 font-display text-lg text-forest-100/40"
              >
                {loc}
                <span className="size-1.5 rounded-full bg-gold-500/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
