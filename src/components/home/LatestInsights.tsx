import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";

export function LatestInsights() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <Section tone="ivory" spacing="lg">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the Blog"
            title="Insights for landlords abroad"
            description="Practical, honest guidance on managing, protecting and growing your Lagos property investment."
          />
          <Reveal className="shrink-0">
            <Button href="/blog" variant="outline" size="md" withArrow>
              All Articles
            </Button>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {latest.map((post) => (
            <RevealItem key={post.slug} className="h-full">
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
