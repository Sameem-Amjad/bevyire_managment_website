import type { Metadata } from "next";
import Image from "next/image";
import { Target, Compass, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Stats } from "@/components/home/Stats";
import { VisionTimeline } from "@/components/about/VisionTimeline";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Button } from "@/components/ui/Button";
import { aboutValues, team, images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Bevy Irie is a client-first property company built to give absentee landlords total confidence in their Lagos investments — through transparency, legitimate documentation and genuine care.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Bevy Irie"
        title="Built on trust, run with transparency"
        description="We exist for one reason: to give landlords — wherever in the world they live — complete confidence in their Lagos property."
        image={images.cityLagos}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <Section tone="ivory" spacing="lg">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
                <Image
                  src={images.aboutStory}
                  alt="A premium managed residential property"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 max-w-[15rem] rounded-2xl bg-forest-900 p-5 text-forest-50 shadow-lift lg:-right-8">
                <Quote className="size-6 text-gold-300" />
                <p className="mt-2 font-display text-lg leading-snug">
                  It all starts with you.
                </p>
                <p className="mt-1 text-xs text-forest-100/60">
                  Our founding principle
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Your property partner — not just an agency"
            />
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-forest-800/80">
              <Reveal>
                <p>
                  For too long, owning property from abroad has meant a quiet,
                  constant anxiety — an asset you cannot see, managed by people
                  you struggle to reach, with answers that never quite add up.
                  Bevy Irie was founded to end that.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Unlike agencies that focus on their next commission, we put
                  you at the centre of everything we do. We take the time to
                  understand your goals, then manage your property as if it were
                  our own — documenting every action, every expense and every
                  decision, so nothing is ever hidden or assumed.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  The result is something absentee landlords rarely feel: genuine
                  peace of mind. A property that is cared for, income that arrives
                  on time, and a partner you can actually trust — from anywhere in
                  the world.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                withArrow
                className="mt-8"
              >
                Start a Conversation
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section tone="cream" spacing="md">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
          {[
            {
              icon: Target,
              label: "Our Mission",
              text: "To give every landlord total confidence in their Lagos property through transparency, legitimate documentation and genuine, client-first care.",
            },
            {
              icon: Compass,
              label: "Our Vision",
              text: "To leave a lasting legacy in Lagos real estate — shaping the skyline with iconic developments and setting new standards for how property is managed and trusted.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="h-full rounded-[1.75rem] border border-forest-900/8 bg-white p-8 shadow-soft sm:p-10">
                <span className="grid size-14 place-items-center rounded-2xl bg-forest-900 text-gold-300">
                  <item.icon className="size-7" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-forest-950">
                  {item.label}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-forest-800/80">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section tone="ivory" spacing="lg">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The values behind every decision"
            description="These aren't words on a wall. They are the standard we hold ourselves to on every property, every month."
          />
          <RevealGroup
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {aboutValues.map((value) => (
              <RevealItem key={value.title} className="h-full">
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-forest-900/8 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-500/12 text-gold-700 transition-colors duration-500 group-hover:bg-forest-900 group-hover:text-gold-300">
                    <value.icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-forest-950">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest-800/75">
                      {value.detail}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Stats />

      {/* Vision timeline */}
      <Section tone="forest-deep" spacing="lg" className="overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Where We're Going"
            title="A vision for Lagos, decade by decade"
            description="We think in generations, not quarters. Here is the future we are building toward."
          />
          <div className="mt-16">
            <VisionTimeline />
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section tone="ivory" spacing="lg">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The People"
            title="A team that answers"
            description="Real people who know your property and your name. (Team details are placeholders — ready for real photos and bios.)"
          />
          <RevealGroup
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
            stagger={0.1}
          >
            {team.map((member) => (
              <RevealItem key={member.name} className="h-full">
                <div className="group overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-forest-950">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-gold-600">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-forest-800/75">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Join Them"
        title="Become a landlord who sleeps easy"
        description="Hundreds of owners have handed us their properties and their worries. We'd be honoured to earn your trust too."
        primaryLabel="Book Your Free Consultation"
      />
    </>
  );
}
