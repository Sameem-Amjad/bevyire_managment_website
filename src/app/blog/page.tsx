import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogList } from "@/components/blog/BlogList";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllPosts, getCategories } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Insights & Advice",
  description:
    "Practical guides, market insights and landlord tips from Bevy Irie — helping absentee landlords manage, protect and grow their Lagos property investments.",
  path: "/blog",
});

function blogJsonLd() {
  const posts = getAllPosts();
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${site.name} Insights`,
    description:
      "Guides, market insights and landlord tips for absentee property owners.",
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
      author: { "@type": "Person", name: p.author.name },
    })),
  };
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <JsonLd data={blogJsonLd()} />

      <PageHero
        eyebrow="Insights & Advice"
        title="Property wisdom for landlords abroad"
        description="Guides, market insight and hard-won tips — written to help you own with confidence, wherever in the world you happen to be."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <Section tone="ivory" spacing="lg">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <BlogList posts={posts} categories={categories} />
        </div>
      </Section>

      <CtaBanner
        eyebrow="Beyond the Blog"
        title="Have a question we haven't covered?"
        description="Our team is always happy to share honest, no-obligation advice about your specific property and situation."
        primaryLabel="Ask a Property Manager"
      />
    </>
  );
}
