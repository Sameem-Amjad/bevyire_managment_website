import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Variant =
  | "primary"
  | "gold"
  | "outline"
  | "outlineLight"
  | "ghost"
  | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-900 text-ivory shadow-soft hover:bg-forest-800 hover:shadow-lift hover:-translate-y-0.5",
  gold: "bg-gold-500 text-forest-950 shadow-gold hover:bg-gold-400 hover:-translate-y-0.5",
  light:
    "bg-ivory text-forest-900 shadow-soft hover:bg-white hover:-translate-y-0.5",
  outline:
    "border border-forest-900/25 text-forest-900 hover:border-forest-900/50 hover:bg-forest-900/[0.04]",
  outlineLight:
    "border border-ivory/35 text-ivory hover:border-ivory/70 hover:bg-ivory/10",
  ghost: "text-forest-900 hover:bg-forest-900/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[0.95rem]",
  lg: "h-14 px-9 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps =
  | (BaseProps &
      Omit<React.ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
        href?: undefined;
      })
  | (BaseProps &
      Omit<React.ComponentPropsWithoutRef<"a">, keyof BaseProps> & {
        href: string;
      });

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as React.ComponentPropsWithoutRef<"a"> & {
      href: string;
    };
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {inner}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ComponentPropsWithoutRef<"button">)}
    >
      {inner}
    </button>
  );
}
