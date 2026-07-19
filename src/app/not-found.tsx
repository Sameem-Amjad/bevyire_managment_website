import Link from "next/link";
import { Home, ArrowRight, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-forest-950 text-forest-50">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-0 size-[30rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[30rem] rounded-full bg-forest-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <p className="font-display text-[7rem] font-medium leading-none tracking-tight text-gold-gradient sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium text-white sm:text-4xl">
          This page has moved out
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-forest-100/75">
          The page you&apos;re looking for isn&apos;t here — but your next great
          property decision might be just a click away.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="gold" size="lg">
            <Home className="size-4" />
            Back Home
          </Button>
          <Button href="/contact" variant="outlineLight" size="lg" withArrow>
            Contact Us
          </Button>
        </div>

        <div className="mt-12">
          <p className="flex items-center justify-center gap-2 text-sm text-forest-100/50">
            <LifeBuoy className="size-4" />
            Or try one of these pages
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1 rounded-full border border-forest-100/15 px-4 py-2 text-sm text-forest-100/80 transition-all hover:border-gold-400/60 hover:text-gold-300"
              >
                {item.label}
                <ArrowRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
