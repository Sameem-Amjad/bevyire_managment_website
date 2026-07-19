import { Quote } from "lucide-react";
import type { ContentBlock } from "@/types";

/** Renders an article's content blocks with editorial prose styling. */
export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 font-display text-2xl font-medium tracking-tight text-forest-950 sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-2 font-display text-xl font-medium tracking-tight text-forest-950"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-pretty text-[1.075rem] leading-[1.8] text-forest-800/85"
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span className="text-[1.05rem] leading-relaxed text-forest-800/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-forest-900 text-sm font-semibold text-gold-300">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 text-[1.05rem] leading-relaxed text-forest-800/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-gold-500 pl-6"
              >
                <p className="font-display text-xl italic leading-snug text-forest-900 sm:text-2xl">
                  {block.text}
                </p>
                {block.cite && (
                  <cite className="mt-3 block text-sm not-italic text-forest-800/60">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={i}
                className="my-8 rounded-2xl border border-gold-500/25 bg-gold-500/[0.07] p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-gold-500/20 text-gold-700">
                    <Quote className="size-4" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-medium text-forest-950">
                      {block.title}
                    </p>
                    <p className="mt-1.5 text-pretty leading-relaxed text-forest-800/80">
                      {block.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
