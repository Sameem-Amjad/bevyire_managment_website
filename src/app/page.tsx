import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { Compliance } from "@/components/home/Compliance";
import { LatestInsights } from "@/components/home/LatestInsights";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <WhyChooseUs />
      <ProcessTimeline />
      <Stats />
      <Testimonials />
      <Compliance />
      <LatestInsights />
      <Faq />
      <CtaBanner />
    </>
  );
}
