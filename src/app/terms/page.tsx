import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { termsSections } from "@/lib/legal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of the Bevy Irie website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      crumb="Terms of Service"
      intro="The straightforward terms that govern the use of this website."
      sections={termsSections}
    />
  );
}
