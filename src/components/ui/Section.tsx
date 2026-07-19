import { cn } from "@/lib/utils";

type Tone = "ivory" | "cream" | "forest" | "forest-deep" | "white";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  forest: "bg-forest-900 text-forest-50",
  "forest-deep": "bg-forest-950 text-forest-50",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  spacing?: "sm" | "md" | "lg";
}

const spacings = {
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-36",
};

export function Section({
  className,
  tone = "ivory",
  spacing = "md",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative", tones[tone], spacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
