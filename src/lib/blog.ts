import { img } from "./content";
import type { BlogAuthor, BlogPost } from "@/types";

/* ---------------------------------------------------------------
   Authors (sample bylines — swap for real team members)
   --------------------------------------------------------------- */
const authors = {
  managingDirector: {
    name: "Emeka Balogun",
    role: "Managing Director",
    image: img("1560250097-0b93528c311a", 200),
  },
  headOfManagement: {
    name: "Adaeze Okonkwo",
    role: "Head of Property Management",
    image: img("1573496359142-b8d87734a5a2", 200),
  },
  headOfOps: {
    name: "Tunde Alabi",
    role: "Head of Operations",
    image: img("1519085360753-af0119f7cbe7", 200),
  },
} satisfies Record<string, BlogAuthor>;

/* ---------------------------------------------------------------
   Posts (original content written for the absentee-landlord niche)
   --------------------------------------------------------------- */
export const posts: BlogPost[] = [
  {
    slug: "is-now-a-good-time-to-invest-in-lagos-real-estate",
    title: "Is Now a Good Time to Invest in Lagos Real Estate? A Balanced View",
    excerpt:
      "Everyone has an opinion on the Lagos property market. Here's a clear-eyed look at the opportunities and the risks — and how to invest without the guesswork.",
    category: "Market Insights",
    coverImage: img("1449844908441-8829872d2607", 1600),
    author: authors.managingDirector,
    date: "2026-07-08",
    readTime: 7,
    featured: true,
    tags: ["Investment", "Lagos", "Market"],
    content: [
      {
        type: "p",
        text: "Ask ten people whether now is the right time to buy property in Lagos and you'll get ten different answers. The honest one is: it depends — on the property, the paperwork, and above all, how it will be managed. Here is the balanced view we give our own clients.",
      },
      { type: "h2", text: "Why the fundamentals are compelling" },
      {
        type: "p",
        text: "Lagos is one of the fastest-growing megacities in the world. A young, expanding population and a chronic housing shortage mean sustained demand for quality accommodation — particularly well-managed, properly documented homes in the right locations. For landlords with a long-term horizon, those fundamentals are hard to ignore.",
      },
      { type: "h2", text: "Where landlords actually get hurt" },
      {
        type: "p",
        text: "Very few investors lose money because the market fell. They lose money because of avoidable, ground-level problems:",
      },
      {
        type: "ul",
        items: [
          "Buying property with defective or unverifiable title.",
          "Long void periods because the property sat un-marketed.",
          "Rent that is collected but never fully accounted for.",
          "Small maintenance issues left to become expensive structural ones.",
        ],
      },
      {
        type: "callout",
        title: "The real risk isn't the market — it's management",
        text: "A good asset with poor management underperforms a modest asset with excellent management, every single time. Distance amplifies this. If you can't see your property, you are entirely dependent on the integrity and systems of whoever runs it.",
      },
      { type: "h2", text: "How to invest without the guesswork" },
      {
        type: "ol",
        items: [
          "Insist on verified, legitimate title before any money changes hands.",
          "Get a market-evidenced valuation — not a seller's asking price.",
          "Decide who will manage it before you buy, not after.",
          "Demand documented, monthly reporting from day one.",
        ],
      },
      {
        type: "p",
        text: "Do those four things and the question stops being \"is it a good time?\" and becomes \"is this a good property, properly run?\" That is a question you can actually answer — and it's the one that determines your returns.",
      },
      {
        type: "quote",
        text: "The best time to plant a tree was twenty years ago. The second best time is now — provided you know how to tend it.",
      },
    ],
  },
  {
    slug: "absentee-landlord-guide-managing-property-in-lagos",
    title: "The Absentee Landlord's Guide to Managing Property in Lagos",
    excerpt:
      "Owning property in Lagos while living abroad shouldn't mean sleepless nights. This is the complete playbook for staying in control from anywhere in the world.",
    category: "Guides",
    coverImage: img("1600596542815-ffad4c1539a9", 1600),
    author: authors.headOfManagement,
    date: "2026-06-24",
    readTime: 8,
    featured: true,
    tags: ["Absentee Landlords", "Property Management", "Guide"],
    content: [
      {
        type: "p",
        text: "Being an absentee landlord is a peculiar kind of stress. You own something valuable, thousands of miles away, that you cannot see, cannot check on, and cannot easily control. This guide is about replacing that anxiety with a system.",
      },
      { type: "h2", text: "1. Accept that you need eyes on the ground" },
      {
        type: "p",
        text: "The single biggest mistake diaspora landlords make is trying to manage remotely through a well-meaning relative or a friend-of-a-friend. It rarely ends well — not because people are dishonest, but because informal arrangements have no accountability and no records. You need a professional whose entire job is to represent your interests, in writing.",
      },
      { type: "h2", text: "2. Make reporting non-negotiable" },
      {
        type: "p",
        text: "If you take one thing from this guide, take this: you should receive a written monthly report, with photographs and receipts, whether or not anything happened. Silence is where problems grow. A predictable rhythm of reporting is what turns a distant asset into something you can genuinely oversee.",
      },
      {
        type: "callout",
        title: "What a good monthly report contains",
        text: "Rent status and remittance, occupancy, any maintenance carried out (with before/after photos and receipts), any issues flagged, and a short plain-language summary. If your current arrangement doesn't produce this, that is your answer.",
      },
      { type: "h2", text: "3. Control spending with an approval threshold" },
      {
        type: "p",
        text: "Agree a figure — say, any repair above a set amount — below which your manager can act immediately, and above which they must get your written approval first. This keeps day-to-day issues moving quickly while ensuring you're never surprised by a large bill.",
      },
      { type: "h2", text: "4. Protect the paperwork" },
      {
        type: "ul",
        items: [
          "Keep verified copies of your title documents in more than one place.",
          "Ensure every tenancy is covered by a properly drafted agreement.",
          "Keep a digital archive of inspections, receipts and correspondence.",
        ],
      },
      { type: "h2", text: "5. Treat vacancy as the enemy" },
      {
        type: "p",
        text: "An empty property earns nothing and deteriorates faster. Professional marketing, proper tenant screening and quick turnarounds between tenancies protect your income far more than squeezing an extra few percent on rent ever will.",
      },
      {
        type: "p",
        text: "Done properly, managing from abroad can feel almost effortless. The goal isn't to do it all yourself — it's to build a system, and a partner, you can trust to run it.",
      },
    ],
  },
  {
    slug: "screening-tenants-remotely-playbook",
    title: "Screening Tenants Remotely: A Practical Playbook",
    excerpt:
      "The right tenant makes ownership effortless; the wrong one makes it a nightmare. Here's how to screen thoroughly even when you're not in the country.",
    category: "Landlord Tips",
    coverImage: img("1600880292203-757bb62b4baf", 1600),
    author: authors.headOfManagement,
    date: "2026-06-10",
    readTime: 6,
    tags: ["Tenants", "Screening", "Risk"],
    content: [
      {
        type: "p",
        text: "A tenancy is a relationship that can last years. Getting the right person in is the highest-leverage decision a landlord makes — and it's entirely possible to do it well from abroad, provided you follow a process rather than a gut feeling.",
      },
      { type: "h2", text: "Verify identity and references — properly" },
      {
        type: "p",
        text: "Every prospective tenant should provide verifiable identification and references that are actually contacted, not just collected. Previous landlords and employers are the two most valuable sources. A tenant with nothing to hide will understand and welcome the diligence.",
      },
      { type: "h2", text: "Confirm affordability honestly" },
      {
        type: "p",
        text: "Rent should be a comfortable fraction of income, not a stretch. A tenant who can only just afford the rent on day one is a tenant who falls into arrears the moment life throws a surprise. Confirming affordability up front protects both of you.",
      },
      {
        type: "callout",
        title: "Red flags worth pausing on",
        text: "Reluctance to provide references, pressure to skip documentation, an offer to pay a large sum in cash to move in immediately, or a story that keeps changing. None of these are automatically disqualifying — but each deserves a second, careful look.",
      },
      { type: "h2", text: "Document everything from the start" },
      {
        type: "ul",
        items: [
          "A properly drafted, signed tenancy agreement — never a handshake.",
          "A dated inventory and condition report with photographs.",
          "A clear record of the deposit and the terms for its return.",
        ],
      },
      { type: "h2", text: "Let a professional do the viewings" },
      {
        type: "p",
        text: "Accompanied viewings tell you things a form never will — how someone treats the property, the questions they ask, whether they turn up on time. A good manager acts as your judgment on the ground, then brings you a shortlist and a recommendation you can sign off with confidence.",
      },
    ],
  },
  {
    slug: "choosing-a-property-manager-nigeria",
    title: "How to Choose a Property Manager in Nigeria: 7 Questions to Ask",
    excerpt:
      "Not all property managers are equal. Ask these seven questions before you hand anyone the keys to your investment — the answers tell you everything.",
    category: "Landlord Tips",
    coverImage: img("1560520653-9e0e4c89eb11", 1600),
    author: authors.managingDirector,
    date: "2026-05-27",
    readTime: 6,
    tags: ["Property Management", "Due Diligence"],
    content: [
      {
        type: "p",
        text: "Choosing a property manager is one of the most consequential decisions a landlord makes — and one of the least scrutinised. Before you sign anything, put these seven questions to any manager you're considering. Their answers are more revealing than any brochure.",
      },
      {
        type: "ol",
        items: [
          "How, and how often, will I receive reports on my property?",
          "Will I have one dedicated contact, or a rotating call centre?",
          "What is your process for collecting and remitting rent?",
          "How do you handle maintenance, and at what point do you need my approval?",
          "How do you screen and vet tenants?",
          "Exactly what are your fees — and what is not included?",
          "Can you show me an example of the documentation I'll receive?",
        ],
      },
      { type: "h2", text: "What good answers sound like" },
      {
        type: "p",
        text: "Notice a pattern in strong answers: they are specific, they are in writing, and they put you in control. A manager who says \"we send a photographed report every month and never spend above an agreed threshold without your sign-off\" is describing a system. A manager who says \"don't worry, we'll take care of it\" is asking you to rely on trust alone.",
      },
      {
        type: "callout",
        title: "Transparency is a feature, not a favour",
        text: "The best managers volunteer information before you ask for it. If getting a straight answer feels like pulling teeth during the sales conversation, imagine what it will feel like once they have your keys.",
      },
      { type: "h2", text: "Fees: cheaper is rarely cheaper" },
      {
        type: "p",
        text: "The lowest headline fee often hides the highest total cost — through poor tenant selection, long voids, or maintenance mark-ups. Look for transparent, all-in pricing and judge value by outcomes: occupancy, income reliability and how well your asset is protected over time.",
      },
    ],
  },
  {
    slug: "protecting-your-property-title-lagos",
    title: "Protecting Your Title: Property Documentation in Lagos Explained",
    excerpt:
      "Legitimate documentation is the foundation of every safe property investment. Here's a plain-English guide to protecting your title and your peace of mind.",
    category: "Legal & Compliance",
    coverImage: img("1554469384-e58fac16e23a", 1600),
    author: authors.headOfOps,
    date: "2026-05-13",
    readTime: 7,
    tags: ["Legal", "Documentation", "Due Diligence"],
    content: [
      {
        type: "p",
        text: "In property, paperwork is not bureaucracy — it is protection. The difference between a secure investment and a costly dispute almost always comes down to the quality and legitimacy of the documentation behind it. Here's what every landlord should understand.",
      },
      { type: "h2", text: "Why verification matters more than ever" },
      {
        type: "p",
        text: "A property is only as good as the title behind it. Verifying that title — confirming the seller has the right to sell, that the land is what it claims to be, and that there are no competing claims — is the most important step in any transaction. Skipping it to save time or money is the single most expensive mistake a landlord can make.",
      },
      {
        type: "callout",
        title: "Never rely on assurances alone",
        text: "\"Trust me, the papers are fine\" is not documentation. Insist on seeing, verifying and retaining copies of the actual title documents. A legitimate seller will expect nothing less.",
      },
      { type: "h2", text: "The documents to keep safe" },
      {
        type: "ul",
        items: [
          "Your verified title documents — the cornerstone of ownership.",
          "Every signed tenancy or lease agreement.",
          "Receipts and records for any works, rates or dues paid.",
          "Inspection reports and correspondence, archived digitally.",
        ],
      },
      { type: "h2", text: "Keep a second copy — somewhere else" },
      {
        type: "p",
        text: "Originals can be lost to fire, flood or simple misplacement. Keep verified digital copies in secure cloud storage, and physical copies in more than one location. For absentee landlords especially, a well-organised digital archive is worth its weight in gold.",
      },
      { type: "h2", text: "When in doubt, get it checked" },
      {
        type: "p",
        text: "If any part of your documentation is unclear, incomplete or simply old, have it reviewed by a qualified professional. It is far cheaper to confirm everything is in order than to defend a claim later. Sound paperwork is what lets you sleep at night.",
      },
    ],
  },
  {
    slug: "preventative-maintenance-protecting-your-yield",
    title: "Preventative Maintenance: The Quiet Secret to Protecting Your Yield",
    excerpt:
      "The cheapest repair is the one you never have to make. Here's how a preventative approach to maintenance quietly protects both your property's value and your income.",
    category: "Property Care",
    coverImage: img("1581578731548-c64695cc6952", 1600),
    author: authors.headOfOps,
    date: "2026-04-29",
    readTime: 5,
    tags: ["Maintenance", "Property Care", "Yield"],
    content: [
      {
        type: "p",
        text: "Maintenance is the least glamorous part of property ownership and, quietly, one of the most important. Handled reactively, it drains money and erodes tenant goodwill. Handled preventatively, it protects your yield and your asset's long-term value.",
      },
      { type: "h2", text: "Why reactive maintenance costs more" },
      {
        type: "p",
        text: "A small leak, ignored, becomes damaged ceilings, ruined flooring and a frustrated tenant looking to leave. A serviced generator keeps running; a neglected one fails on the hottest weekend of the year. Nearly every expensive repair began as a cheap one that nobody caught in time.",
      },
      {
        type: "callout",
        title: "The compounding cost of neglect",
        text: "Deferred maintenance doesn't disappear — it accumulates interest. Every issue left unaddressed makes the next one more likely, and the eventual bill larger. A modest, regular spend almost always beats a large, emergency one.",
      },
      { type: "h2", text: "What a preventative programme looks like" },
      {
        type: "ul",
        items: [
          "Scheduled condition inspections that catch issues early.",
          "Routine servicing of key systems before they fail.",
          "A vetted network of trusted trades on standby.",
          "Photographic records so nothing is missed between visits.",
        ],
      },
      { type: "h2", text: "Happy tenants stay longer" },
      {
        type: "p",
        text: "There's a hidden dividend, too. A property that is visibly well cared for attracts better tenants who treat it with respect and stay for longer — which means fewer voids, lower turnover costs and steadier income. Maintenance, done right, pays for itself many times over.",
      },
    ],
  },
];

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return getAllPosts().find((p) => p.featured) ?? getAllPosts()[0];
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return getAllPosts().slice(0, limit);
  const sameCategory = getAllPosts().filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = getAllPosts().filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
