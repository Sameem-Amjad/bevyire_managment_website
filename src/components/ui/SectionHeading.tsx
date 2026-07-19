import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "eyebrow inline-flex items-center gap-2.5",
              isLight ? "text-gold-300" : "text-gold-600",
            )}
          >
            <span
              className={cn(
                "h-px w-8",
                isLight ? "bg-gold-300/60" : "bg-gold-500/60",
              )}
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading
          className={cn(
            "font-display text-balance font-medium leading-[1.08] tracking-tight",
            Heading === "h1"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl lg:text-[2.75rem]",
            isLight ? "text-white" : "text-forest-950",
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
              align === "center" ? "mx-auto" : "",
              isLight ? "text-forest-100/80" : "text-forest-800/75",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
