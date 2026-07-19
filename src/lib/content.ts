import {
  Building2,
  KeyRound,
  Users,
  Wrench,
  ClipboardCheck,
  Megaphone,
  Handshake,
  HardHat,
  LineChart,
  ScrollText,
  ShieldCheck,
  Eye,
  HeartHandshake,
  FileCheck2,
  Globe2,
  CalendarCheck,
  Search,
  Presentation,
  Coins,
} from "lucide-react";
import type {
  Service,
  Testimonial,
  Faq,
  ProcessStep,
  Stat,
  ValueItem,
  TimelineItem,
} from "@/types";

/* ---------------------------------------------------------------
   Imagery — curated luxury property photography (Unsplash)
   --------------------------------------------------------------- */
const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build an optimised Unsplash URL. */
export function img(id: string, w = 1600, q = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  heroPrimary: img("1600596542815-ffad4c1539a9", 2000),
  heroInterior: img("1600607687939-ce8a6c25118c", 1400),
  aboutStory: img("1600585154340-be6161a56a0c", 1400),
  aboutTeam: img("1497366216548-37526070297c", 1400),
  ctaProperty: img("1613977257363-707ba9348227", 2000),
  managementDashboard: img("1600585154526-990dc5c1a5b0", 1400),
  cityLagos: img("1449844908441-8829872d2607", 1600),
};

/* ---------------------------------------------------------------
   Services
   --------------------------------------------------------------- */
export const services: Service[] = [
  {
    slug: "property-management",
    title: "Property Management",
    icon: Building2,
    tagline: "Full-service, hands-off ownership",
    summary:
      "End-to-end management of your property so you never have to be on the ground.",
    description:
      "We become your eyes, ears and hands in Lagos. From tenant relations to compliance, statements and everything between, we run your property as if it were our own — and report every step in writing.",
    benefits: [
      "A single dedicated property manager as your point of contact",
      "Monthly written statements with photos and receipts",
      "24/7 emergency response coordination",
      "Transparent, fully documented decision-making",
    ],
    process: [
      { title: "Onboarding", detail: "Full property audit and documentation." },
      { title: "Management plan", detail: "A tailored strategy for your goals." },
      { title: "Active management", detail: "We handle the day-to-day, you relax." },
      { title: "Monthly reporting", detail: "Clear statements, straight to your inbox." },
    ],
    image: img("1600607687939-ce8a6c25118c", 1400),
  },
  {
    slug: "rent-collection",
    title: "Rent Collection",
    icon: KeyRound,
    tagline: "Reliable income, on time",
    summary:
      "Structured rent collection with clear records and prompt remittance to you.",
    description:
      "We invoice, chase and reconcile rent on your behalf, then remit your funds on a predictable schedule. Every payment is logged and reconciled so your income is never a mystery.",
    benefits: [
      "Automated reminders and firm, professional follow-up",
      "Reconciled statements for every payment cycle",
      "Clear arrears procedure handled with tact",
      "Predictable remittance dates you can plan around",
    ],
    process: [
      { title: "Invoicing", detail: "Tenants billed on a clear cycle." },
      { title: "Collection", detail: "Firm, courteous follow-up on dues." },
      { title: "Reconciliation", detail: "Every naira accounted for." },
      { title: "Remittance", detail: "Funds sent to you on schedule." },
    ],
    image: img("1554224155-6726b3ff858f", 1400),
  },
  {
    slug: "tenant-management",
    title: "Tenant Management",
    icon: Users,
    tagline: "Quality tenants, fewer headaches",
    summary:
      "Careful screening and relationship management to protect your asset.",
    description:
      "The right tenant is the difference between a stress-free investment and a constant worry. We screen thoroughly, document tenancies properly and manage relationships professionally throughout.",
    benefits: [
      "Rigorous background and reference checks",
      "Properly drafted, legally sound tenancy agreements",
      "Professional handling of queries and disputes",
      "Structured move-in and move-out inspections",
    ],
    process: [
      { title: "Screening", detail: "Verified references and checks." },
      { title: "Agreements", detail: "Watertight, documented contracts." },
      { title: "Relations", detail: "Responsive, respectful communication." },
      { title: "Renewals", detail: "Retention that protects your yield." },
    ],
    image: img("1600880292203-757bb62b4baf", 1400),
  },
  {
    slug: "maintenance",
    title: "Property Maintenance",
    icon: Wrench,
    tagline: "Your property, always cared for",
    summary:
      "Preventative and reactive maintenance from vetted, trusted trades.",
    description:
      "We maintain your property proactively to prevent small issues becoming expensive ones — and respond quickly when things do go wrong, always with your prior approval on significant spend.",
    benefits: [
      "Vetted network of trusted local tradespeople",
      "Preventative maintenance schedule",
      "Approval sought before any significant works",
      "Photo-documented completion for every job",
    ],
    process: [
      { title: "Assessment", detail: "Regular condition surveys." },
      { title: "Approval", detail: "Quotes and sign-off before works." },
      { title: "Execution", detail: "Trusted trades, quality work." },
      { title: "Evidence", detail: "Before-and-after documentation." },
    ],
    image: img("1581578731548-c64695cc6952", 1400),
  },
  {
    slug: "inspections",
    title: "Property Inspections",
    icon: ClipboardCheck,
    tagline: "Peace of mind, in pictures",
    summary:
      "Regular documented inspections so you always know your property's condition.",
    description:
      "We carry out scheduled inspections and send you a full report with photographs, so an ocean between you and your property never means being in the dark about its condition.",
    benefits: [
      "Scheduled routine and ad-hoc inspections",
      "Detailed photographic condition reports",
      "Early detection of issues and lease breaches",
      "Digital archive of every inspection",
    ],
    process: [
      { title: "Schedule", detail: "Agreed inspection calendar." },
      { title: "Inspect", detail: "Thorough on-site walkthrough." },
      { title: "Report", detail: "Photos and findings to you." },
      { title: "Action", detail: "We resolve anything flagged." },
    ],
    image: img("1560518883-ce09059eeffa", 1400),
  },
  {
    slug: "marketing",
    title: "Property Marketing",
    icon: Megaphone,
    tagline: "Let faster, for more",
    summary:
      "Professional marketing that fills vacancies quickly with quality tenants.",
    description:
      "Empty property is lost income. We market your property with professional photography and targeted reach across the right channels to minimise voids and attract the right applicants.",
    benefits: [
      "Professional photography and listing copy",
      "Targeted multi-channel exposure",
      "Pre-qualified enquiry handling",
      "Accompanied viewings on your behalf",
    ],
    process: [
      { title: "Prepare", detail: "Staging advice and photography." },
      { title: "Promote", detail: "Right channels, right audience." },
      { title: "Qualify", detail: "We filter for serious applicants." },
      { title: "Convert", detail: "Viewings through to signed lease." },
    ],
    image: img("1560184897-ae75f418493e", 1400),
  },
  {
    slug: "buying-selling",
    title: "Buying & Selling",
    icon: Handshake,
    tagline: "Confident transactions, legitimate title",
    summary:
      "Guided acquisition and disposal with rigorous due diligence.",
    description:
      "Whether you are growing your portfolio or realising your investment, we guide the transaction end-to-end with rigorous due diligence and legitimate, verifiable documentation at every stage.",
    benefits: [
      "Verified title and thorough due diligence",
      "Market-backed valuations and negotiation",
      "Transparent, legitimate documentation",
      "A single point of contact throughout",
    ],
    process: [
      { title: "Brief", detail: "We understand your objective." },
      { title: "Source / list", detail: "Match buyers and properties." },
      { title: "Diligence", detail: "Title and legal verification." },
      { title: "Close", detail: "Smooth, documented completion." },
    ],
    image: img("1560520653-9e0e4c89eb11", 1400),
  },
  {
    slug: "construction",
    title: "Building & Construction",
    icon: HardHat,
    tagline: "Built to standard, on budget",
    summary:
      "Managed construction and refurbishment delivered to specification.",
    description:
      "From refurbishments to ground-up builds, we manage construction projects with professional oversight, clear budgets and regular progress reporting — so distance is never a barrier to quality.",
    benefits: [
      "Fixed scopes, transparent budgets",
      "Vetted contractors and quality control",
      "Regular photographic progress reports",
      "Milestone-based, accountable delivery",
    ],
    process: [
      { title: "Design", detail: "Scope, drawings and budget." },
      { title: "Mobilise", detail: "Contractor selection and permits." },
      { title: "Build", detail: "Supervised, quality-checked works." },
      { title: "Handover", detail: "Snagging and final sign-off." },
    ],
    image: img("1541888946425-d81bb19240f5", 1400),
  },
  {
    slug: "development",
    title: "Property Development",
    icon: LineChart,
    tagline: "Unlock your land's potential",
    summary:
      "Strategic development advisory to maximise the value of your asset.",
    description:
      "We help you see and unlock what your land or property could become — from feasibility and planning through to a completed, income-generating or saleable asset.",
    benefits: [
      "Feasibility studies and highest-and-best-use analysis",
      "Planning and approvals coordination",
      "Project structuring and delivery oversight",
      "Exit and monetisation strategy",
    ],
    process: [
      { title: "Feasibility", detail: "What the site can support." },
      { title: "Planning", detail: "Approvals and design." },
      { title: "Delivery", detail: "Managed development." },
      { title: "Realise", detail: "Sell, let or hold for yield." },
    ],
    image: img("1503387762-592deb58ef4e", 1400),
  },
  {
    slug: "valuation",
    title: "Property Valuation",
    icon: ScrollText,
    tagline: "Know exactly what you own",
    summary:
      "Accurate, market-backed valuations for confident decisions.",
    description:
      "Whether for sale, purchase, refinancing or peace of mind, we provide clear, market-evidenced valuations so every decision you make is grounded in reality, not guesswork.",
    benefits: [
      "Comparable, market-evidenced analysis",
      "Clear, professional valuation reports",
      "Guidance for sale, purchase or finance",
      "Fast turnaround when timing matters",
    ],
    process: [
      { title: "Instruct", detail: "Tell us the purpose." },
      { title: "Inspect", detail: "On-site assessment." },
      { title: "Analyse", detail: "Comparable market evidence." },
      { title: "Report", detail: "A clear, defensible figure." },
    ],
    image: img("1554469384-e58fac16e23a", 1400),
  },
];

/** Eight services surfaced in the home-page preview grid. */
export const featuredServiceSlugs = [
  "property-management",
  "rent-collection",
  "tenant-management",
  "maintenance",
  "inspections",
  "marketing",
  "buying-selling",
  "construction",
];

/* ---------------------------------------------------------------
   Trust bar
   --------------------------------------------------------------- */
export const trustPoints = [
  { icon: ShieldCheck, label: "Trusted Property Experts" },
  { icon: Eye, label: "Transparent Communication" },
  { icon: FileCheck2, label: "Fully Documented Process" },
  { icon: Building2, label: "Professional Management" },
];

/* ---------------------------------------------------------------
   Why choose us
   --------------------------------------------------------------- */
export const whyChooseUs: ValueItem[] = [
  {
    title: "Transparent Reporting",
    detail:
      "Monthly statements, photographs and receipts. You see everything we do — nothing is hidden, nothing is assumed.",
    icon: Eye,
  },
  {
    title: "Dedicated Property Managers",
    detail:
      "One named manager who knows your property and your goals. A real person who answers, not a call-centre queue.",
    icon: HeartHandshake,
  },
  {
    title: "Stress-Free Ownership",
    detail:
      "We carry the operational weight of your property so ownership feels effortless — even from an ocean away.",
    icon: Globe2,
  },
];

/* ---------------------------------------------------------------
   Process (home page timeline)
   --------------------------------------------------------------- */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Book a Consultation",
    detail:
      "A relaxed, no-obligation conversation about your property and your goals.",
    icon: CalendarCheck,
  },
  {
    step: "02",
    title: "Property Assessment",
    detail:
      "We audit your property's condition, compliance and income potential in full.",
    icon: Search,
  },
  {
    step: "03",
    title: "Management Strategy",
    detail:
      "A tailored plan designed around your objectives — presented clearly, in writing.",
    icon: Presentation,
  },
  {
    step: "04",
    title: "Monthly Reporting",
    detail:
      "Transparent statements, photographs and updates delivered straight to your inbox.",
    icon: ClipboardCheck,
  },
  {
    step: "05",
    title: "Maximise Returns",
    detail:
      "We continually optimise occupancy, rent and value so your investment works harder.",
    icon: Coins,
  },
];

/* ---------------------------------------------------------------
   Stats
   --------------------------------------------------------------- */
export const stats: Stat[] = [
  { value: 9, suffix: "+", label: "Years of Experience" },
  { value: 480, suffix: "+", label: "Properties Managed" },
  { value: 350, suffix: "+", label: "Happy Clients" },
  { value: 120, suffix: "+", label: "Projects Completed" },
];

/* ---------------------------------------------------------------
   Testimonials
   --------------------------------------------------------------- */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I live in London and hadn't seen my Lagos property in two years. Bevy Irie send me photographs and a statement every single month. For the first time, I actually feel in control of my investment.",
    name: "Adeola O.",
    role: "Absentee Landlord",
    location: "London, United Kingdom",
    rating: 5,
  },
  {
    quote:
      "What sold me was the documentation. Every expense, every repair, every payment — all recorded and explained. No surprises, no vague answers. This is how property should be managed.",
    name: "Chidi N.",
    role: "Portfolio Investor",
    location: "Houston, United States",
    rating: 5,
  },
  {
    quote:
      "They filled a flat that had sat empty for months, screened the tenant properly, and now remit my rent like clockwork. The peace of mind is genuinely worth every kobo.",
    name: "Funmilayo A.",
    role: "Landlord",
    location: "Toronto, Canada",
    rating: 5,
  },
  {
    quote:
      "Managing a refurbishment from abroad terrified me. Their weekly progress photos and honest budgeting made it feel like I was standing on site. Delivered on time and on budget.",
    name: "Ibrahim K.",
    role: "Developer",
    location: "Dubai, UAE",
    rating: 5,
  },
];

/* ---------------------------------------------------------------
   Compliance / assurances (placeholders for real memberships)
   --------------------------------------------------------------- */
export const compliance = [
  { label: "Fully Documented", detail: "Every action recorded in writing." },
  { label: "Transparent Process", detail: "Nothing happens without your sight." },
  { label: "Legitimate Title", detail: "Verified, defensible documentation." },
  { label: "Professional Service", detail: "Held to a UK-agency standard." },
];

/* ---------------------------------------------------------------
   FAQ
   --------------------------------------------------------------- */
export const faqs: Faq[] = [
  {
    question: "I live abroad. How will I know what's happening with my property?",
    answer:
      "That is precisely who we exist to serve. You receive a written monthly statement with photographs, receipts and a clear summary of everything that has happened. You also have a dedicated manager you can reach directly, and nothing significant happens without your prior approval.",
  },
  {
    question: "What types of property do you manage?",
    answer:
      "Both commercial and residential property — from single apartments and family homes to multi-unit blocks and commercial spaces across Lagos. If you are unsure whether your property is a fit, simply ask and we will tell you honestly.",
  },
  {
    question: "How and when do I receive my rent?",
    answer:
      "We invoice tenants on a clear cycle, follow up firmly and professionally, reconcile every payment, and remit your funds on a predictable, agreed schedule. Each remittance is accompanied by a reconciled statement so your income is never a mystery.",
  },
  {
    question: "What are your fees?",
    answer:
      "Our fees are transparent and depend on the services you need and the size of your portfolio. There are no hidden charges. We will give you a clear written proposal after an initial consultation so you know exactly what you are paying for.",
  },
  {
    question: "Do you handle maintenance and emergencies?",
    answer:
      "Yes. We maintain your property proactively and coordinate a vetted network of trusted tradespeople for repairs. We always seek your approval before any significant spend, and you receive photographic evidence on completion. Emergency response is coordinated 24/7.",
  },
  {
    question: "Is now a good time to invest in Lagos property?",
    answer:
      "We believe the best time is now — but only with the right guidance. Lagos offers strong long-term fundamentals, and with rigorous due diligence and proper management, property here can be a resilient, rewarding investment. We are happy to talk through your specific situation.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free, no-obligation consultation. We will discuss your property and goals, assess what is possible, and give you a clear written plan. There is no pressure and no commitment until you are ready.",
  },
];

/* ---------------------------------------------------------------
   About — values, mission, vision, timeline
   --------------------------------------------------------------- */
export const aboutValues: ValueItem[] = [
  {
    title: "Customer First",
    detail:
      "You are at the centre of everything we do — your goals define ours.",
    icon: HeartHandshake,
  },
  {
    title: "Transparency",
    detail: "Open books, plain language and no surprises. Ever.",
    icon: Eye,
  },
  {
    title: "Legitimate Documentation",
    detail: "Verified, defensible paperwork at every single stage.",
    icon: FileCheck2,
  },
  {
    title: "Professionalism",
    detail: "Held to the standard of the world's best agencies.",
    icon: ShieldCheck,
  },
  {
    title: "Trust",
    detail: "Earned through consistency, honesty and evidence.",
    icon: Handshake,
  },
  {
    title: "Satisfaction",
    detail: "Measured by your peace of mind, not our convenience.",
    icon: HeartHandshake,
  },
];

export const visionTimeline: TimelineItem[] = [
  {
    year: "2025",
    title: "A Trusted Lagos Name",
    detail:
      "Deliver innovative, sustainable projects that meet diverse needs and contribute to the city's growth.",
  },
  {
    year: "2030",
    title: "Market Leadership",
    detail:
      "Lead with affordable and luxury housing, sustainable communities and smart-technology living experiences.",
  },
  {
    year: "2040",
    title: "A Recognised Visionary",
    detail:
      "Transform Nigeria with mixed-use complexes, green buildings and smart cities that redefine urban living.",
  },
  {
    year: "2050",
    title: "A Lasting Legacy",
    detail:
      "Shape the city's skyline with iconic developments and set new standards for urban innovation and livability.",
  },
];

export const team = [
  {
    name: "Managing Director",
    role: "Founder & Principal",
    bio: "Two decades in Lagos property, driven by a belief that landlords deserve total transparency.",
    image: img("1560250097-0b93528c311a", 800),
  },
  {
    name: "Head of Management",
    role: "Client Relationships",
    bio: "Ensures every landlord has one dedicated, reachable point of contact who truly knows their property.",
    image: img("1573496359142-b8d87734a5a2", 800),
  },
  {
    name: "Head of Operations",
    role: "Maintenance & Compliance",
    bio: "Runs the vetted trades network and the documentation standard that underpins everything we do.",
    image: img("1519085360753-af0119f7cbe7", 800),
  },
];
