import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;
  // Properly sized, lean social image (1200×630 crop) — WhatsApp-friendly.
  const ogImage = `${post.coverImage.split("?")[0]}?auto=format&fit=crop&w=1200&h=630&q=70`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const url = `${site.url}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const shareLinks = [
    {
      icon: XIcon,
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      icon: FacebookIcon,
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      icon: LinkedinIcon,
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950 text-forest-50">
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/85 to-forest-950" />
        </div>
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-forest-100/70 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>

          <span className="mt-6 inline-block rounded-full bg-gold-500/15 px-3.5 py-1.5 text-xs font-semibold text-gold-300 ring-1 ring-inset ring-gold-500/30">
            {post.category}
          </span>

          <h1 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover ring-2 ring-gold-500/30"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-forest-100/60">{post.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-sm text-forest-100/70">
              <Calendar className="size-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-forest-100/70">
              <Clock className="size-4" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <Section tone="ivory" spacing="lg">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <PostBody blocks={post.content} />
          </Reveal>

          {/* Tags + share */}
          <div className="mt-12 flex flex-col gap-6 border-t border-forest-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-forest-900/[0.05] px-3 py-1.5 text-xs font-medium text-forest-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-forest-800/60">Share</span>
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-forest-900/12 text-forest-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-forest-900 hover:text-gold-300"
                >
                  <s.icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Author box */}
          <div className="mt-10 flex items-start gap-4 rounded-[1.5rem] border border-forest-900/8 bg-white p-6 shadow-soft">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-600">
                Written by
              </p>
              <p className="mt-1 font-display text-lg font-medium text-forest-950">
                {post.author.name}
              </p>
              <p className="text-sm text-forest-800/70">
                {post.author.role} at {site.name} · Helping absentee landlords
                own with confidence.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="cream" spacing="lg">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-medium tracking-tight text-forest-950 sm:text-3xl">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="link-underline shrink-0 text-sm font-medium text-forest-700"
              >
                View all articles
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <CtaBanner
        eyebrow="Ready to Act?"
        title="Turn insight into a stress-free investment"
        description="Reading is a great start. When you're ready, we'll help you put it all into practice — with total transparency."
        primaryLabel="Get a Free Consultation"
      />
    </>
  );
}
