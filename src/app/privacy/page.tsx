import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { privacySections } from "@/lib/legal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Bevy Irie collects, uses and protects your personal data when you use our website and services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      crumb="Privacy Policy"
      intro="Your trust matters to us — here is exactly how we handle your information."
      sections={privacySections}
    />
  );
}
