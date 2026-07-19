# Bevy Irie — Property Management Website

A premium, conversion-focused brochure website for **Bevy Irie Ltd**, a property
management company serving absentee landlords in Lagos, Nigeria. Built to the
standard of leading UK agencies — trust-first, transparent, and designed to turn
visitors into enquiries.

> Design language: **Deep Forest Green · Champagne Gold · Warm Ivory** — minimal,
> editorial, luxurious. Every section is custom-designed; there is no template.

---

## ✨ Highlights

- **7 pages** — Home, Services, About, Contact, 404, Privacy, Terms
- **Editorial design system** — Fraunces (display) + Inter (body), custom palette,
  soft shadows, rounded cards, generous whitespace
- **Motion throughout** — scroll reveals, animated counters, an animated process
  timeline, an auto-advancing testimonial slider, a scroll-progress bar — tasteful,
  never excessive, and fully `prefers-reduced-motion` aware
- **Working contact form** — React Hook Form + Zod validation + a Server Action
  that sends a team notification **and** an auto-response via SMTP (Nodemailer),
  with a polished success animation (runs in demo mode until you add SMTP creds)
- **Complete SEO** — per-page metadata, OpenGraph + Twitter cards, a dynamically
  generated branded social image, canonical URLs, `sitemap.xml`, `robots.txt`,
  and JSON-LD structured data (`RealEstateAgent`, `WebSite`, `FAQPage`,
  `OfferCatalog`)
- **Conversion & UX extras** — floating WhatsApp button, cookie consent, live
  Google Map embed, analytics-ready (GA4 + Microsoft Clarity), swappable
  accreditation placeholders
- **Accessible & fast** — semantic HTML, keyboard focus states, alt text,
  optimised images (AVIF/WebP), fully static rendering

---

## 🧱 Tech Stack

| Layer     | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router, Server Components) |
| Language  | TypeScript                                 |
| Styling   | Tailwind CSS v4                            |
| Animation | Motion (Framer Motion)                     |
| Forms     | React Hook Form + Zod                      |
| Email     | Nodemailer (SMTP)                          |
| Icons     | lucide-react + custom SVG brand marks      |

---

## 🚀 Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in values (all optional for local dev)
pnpm dev                     # http://localhost:3000
```

Production:

```bash
pnpm build
pnpm start
```

---

## 🔑 Environment Variables

All are optional — the site runs fully without them (the contact form falls back
to "demo mode" and analytics simply don't load).

| Variable                            | Purpose                                             |
| ----------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Canonical/OG base URL (e.g. `https://bevyirie.com`) |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials — enables real email sending   |
| `SMTP_PORT` / `SMTP_SECURE`         | Port (default 587) and TLS mode (auto-inferred)     |
| `CONTACT_FROM_EMAIL`                | From address on outgoing mail                       |
| `CONTACT_TO_EMAIL`                  | Where enquiries are delivered                       |
| `NEXT_PUBLIC_GA_ID`                 | Google Analytics 4 measurement ID                   |
| `NEXT_PUBLIC_CLARITY_ID`            | Microsoft Clarity project ID                        |

---

## 📁 Project Structure

```
src/
├── app/                 # Routes, metadata, sitemap, robots, OG image
├── components/
│   ├── layout/          # Header, Footer, WhatsApp, cookies, analytics
│   ├── ui/              # Reusable primitives (Button, Section, Reveal, …)
│   ├── home/            # Home-page sections
│   ├── services/        # Service cards & detail sections
│   ├── about/           # Vision timeline
│   ├── contact/         # Contact form
│   └── legal/           # Privacy / Terms renderer
├── actions/             # Server actions (contact form)
├── emails/              # HTML email templates
├── lib/                 # Site config, content, SEO, validation, utils
└── types/               # Shared TypeScript types
docs/                    # Original brief & content reference
```

Content is centralised in `src/lib/` — update copy, services, testimonials,
contact details and imagery there without touching components.

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the environment variables above (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy. That's it.

---

Built for Bevy Irie Ltd · Lagos, Nigeria
