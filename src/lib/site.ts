import type { NavItem } from "@/types";

/**
 * Central site configuration — single source of truth for
 * brand, contact details, navigation and social links.
 */
export const site = {
  name: "Bevy Irie",
  legalName: "Bevy Irie Ltd",
  tagline: "Property Management You Can Trust",
  // Update NEXT_PUBLIC_SITE_URL in production (e.g. https://bevyirie.com)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bevyirie.com",
  description:
    "Bevy Irie helps absentee landlords protect, manage and maximise their property investments in Lagos with complete transparency, dedicated managers and fully documented reporting.",
  locale: "en_GB",

  contact: {
    email: "info@bevyirie.com",
    phones: [
      { display: "+234 803 097 6423", tel: "+2348030976423" },
      { display: "+234 802 440 3463", tel: "+2348024403463" },
    ],
    // Primary WhatsApp line (digits only, international format)
    whatsapp: "2348030976423",
    address: {
      line1: "3, Kofo Abayomi Avenue",
      line2: "By Airways Bus-stop, Apapa",
      city: "Lagos",
      country: "Nigeria",
      full: "3, Kofo Abayomi Avenue, By Airways Bus-stop, Apapa, Lagos, Nigeria",
    },
    hours: [
      { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
      { day: "Saturday", time: "9:00 AM – 3:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },

  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },

  founded: 2016,
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  title: string;
  links: NavItem[];
}[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Property Management", href: "/services#property-management" },
      { label: "Rent Collection", href: "/services#rent-collection" },
      { label: "Maintenance", href: "/services#maintenance" },
      { label: "Buying & Selling", href: "/services#buying-selling" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
