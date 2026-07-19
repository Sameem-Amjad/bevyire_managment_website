import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { site } from "@/lib/site";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Speak to a real property manager at Bevy Irie. Book a free, no-obligation consultation about managing, letting or selling your Lagos property from anywhere in the world.",
  path: "/contact",
});

const socials = [
  { icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: site.social.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: site.social.twitter, label: "X (Twitter)" },
];

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    "Apapa, Lagos, Nigeria",
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your property"
        description="Whether you're ready to hand over the keys or simply exploring your options, a real member of our team is here to help — no pressure, no obligation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={images.heroInterior}
      />

      <Section tone="ivory" spacing="lg">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow text-gold-600">Get In Touch</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-forest-950 sm:text-4xl">
                Contact our head office
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-forest-800/80">
                Reach us however suits you best. We typically reply within one
                business day — often much sooner.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-3">
                <ContactRow icon={Mail} label="Email us">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline text-forest-900"
                  >
                    {site.contact.email}
                  </a>
                </ContactRow>

                <ContactRow icon={Phone} label="Call us">
                  <div className="flex flex-col">
                    {site.contact.phones.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="link-underline w-fit text-forest-900"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </ContactRow>

                <ContactRow icon={MessageCircle} label="WhatsApp">
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-forest-900"
                  >
                    Chat with us instantly
                  </a>
                </ContactRow>

                <ContactRow icon={MapPin} label="Visit us">
                  <span className="text-forest-800/90">
                    {site.contact.address.line1}, {site.contact.address.line2},{" "}
                    {site.contact.address.city}, {site.contact.address.country}
                  </span>
                </ContactRow>

                <ContactRow icon={Clock} label="Office hours">
                  <ul className="space-y-0.5 text-forest-800/90">
                    {site.contact.hours.map((h) => (
                      <li key={h.day} className="flex gap-2 text-sm">
                        <span className="w-32 text-forest-800/60">{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </ContactRow>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-forest-900/12 text-forest-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-forest-900 hover:text-gold-300"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <section className="relative h-[420px] w-full border-t border-forest-900/8 bg-cream">
        <iframe
          src={mapSrc}
          title="Bevy Irie office location in Apapa, Lagos"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[0.2]"
          style={{ border: 0 }}
        />
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-forest-900/8 bg-white p-4 shadow-soft">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-900 text-gold-300">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-forest-800/50">
          {label}
        </p>
        <div className="mt-1 text-[0.95rem]">{children}</div>
      </div>
    </div>
  );
}
