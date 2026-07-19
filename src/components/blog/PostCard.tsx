import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-card",
        featured ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] md:aspect-auto md:w-[55%]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-xs font-semibold text-forest-800 backdrop-blur">
          {post.category}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6",
          featured && "md:justify-center md:p-9",
        )}
      >
        <div className="flex items-center gap-3 text-xs text-forest-800/55">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readTime} min read
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-medium leading-snug tracking-tight text-forest-950 transition-colors group-hover:text-forest-700",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            "mt-2 flex-1 text-pretty leading-relaxed text-forest-800/70",
            featured ? "text-base" : "text-sm",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-forest-900">
              {post.author.name}
            </span>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-forest-900/[0.05] text-forest-700 transition-all duration-300 group-hover:bg-forest-900 group-hover:text-gold-300">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
