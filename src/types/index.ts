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
