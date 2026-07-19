import type { Metadata } from "next";
import { site } from "./site";

const titleTemplate = `%s · ${site.name}`;

/** Default metadata applied to the whole app (extended per-page). */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} for Absentee Landlords`,
    template: titleTemplate,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "property management Lagos",
    "absentee landlord services",
    "rent collection Nigeria",
    "property management for landlords abroad",
    "Lagos real estate management",
    "property maintenance Lagos",
    "Bevy Irie",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "Real Estate",
};

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

/** Build per-page metadata with correct canonical + OG URLs. */
export function createMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/** RealEstateAgent / LocalBusiness structured data. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.contact.email,
    description: site.description,
    telephone: site.contact.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
      addressLocality: site.contact.address.city,
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "City",
      name: "Lagos",
    },
    priceRange: "$$",
    foundingDate: String(site.founded),
    sameAs: [
      site.social.facebook,
      site.social.twitter,
      site.social.linkedin,
      site.social.instagram,
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
  };
}

/** WebSite structured data (enables sitelinks search box eligibility). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-GB",
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
