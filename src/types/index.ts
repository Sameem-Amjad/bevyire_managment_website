import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  description: string;
  benefits: string[];
  process: { title: string; detail: string }[];
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
  icon: LucideIcon;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface ValueItem {
  title: string;
  detail: string;
  icon: LucideIcon;
}

export interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

/* ---------- Blog ---------- */
export interface BlogAuthor {
  name: string;
  role: string;
  image: string;
}

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: BlogAuthor;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  content: ContentBlock[];
}
