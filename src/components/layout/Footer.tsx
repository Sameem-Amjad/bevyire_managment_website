import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { site, footerNav } from "@/lib/site";

const socials = [
  { icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: site.social.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: site.social.twitter, label: "X (Twitter)" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-forest-100">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Bevy Irie — home"
              className="inline-flex items-center gap-3"
            >
              <LogoMark className="size-11" />
              <span className="font-display text-2xl font-medium text-white">
                Bevy Irie
              </span>
            </Link>
            <p className="mt-5 text-pretty leading-relaxed text-forest-100/70">
              Trusted property management for absentee landlords. We protect,
              manage and maximise your Lagos property investments — with total
              transparency, from anywhere in the world.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-forest-100/15 text-forest-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-gold-400/90">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-forest-100/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-6 border-t border-forest-100/10 pt-10 sm:grid-cols-3">
          <a
            href={`mailto:${site.contact.email}`}
            className="group flex items-start gap-3"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest-800 text-gold-300">
              <Mail className="size-4" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-forest-100/50">
                Email
              </span>
              <span className="text-sm text-forest-50 transition-colors group-hover:text-gold-300">
                {site.contact.email}
              </span>
            </span>
          </a>

          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest-800 text-gold-300">
              <Phone className="size-4" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-forest-100/50">
                Call
              </span>
              {site.contact.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="block text-sm text-forest-50 transition-colors hover:text-gold-300"
                >
                  {p.display}
                </a>
              ))}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest-800 text-gold-300">
              <MapPin className="size-4" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-forest-100/50">
                Visit
              </span>
              <span className="text-sm text-forest-50">
                {site.contact.address.line1}, {site.contact.address.line2},{" "}
                {site.contact.address.city}, {site.contact.address.country}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-forest-100/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-forest-100/60 sm:flex-row sm:px-8">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
