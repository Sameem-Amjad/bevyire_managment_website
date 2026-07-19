"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PostCard } from "@/components/blog/PostCard";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...categories];
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-ivory"
                  : "text-forest-700 hover:text-forest-950",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 rounded-full bg-forest-900"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => {
            const isFeatured = active === "All" && i === 0;
            return (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn(isFeatured && "sm:col-span-2 lg:col-span-3")}
              >
                <PostCard post={post} featured={isFeatured} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-forest-800/60">
          No articles in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
