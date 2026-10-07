// Services, organised as Design · Develop · Grow.
// Copy is condensed from the previous site's service descriptions; nothing new is claimed.

export type PillarId = "design" | "develop" | "grow";

export type ServiceSlug =
  | "brand-identity"
  | "website-development"
  | "app-development"
  | "seo"
  | "social-media-management"
  | "digital-marketing";

export type Service = {
  slug: ServiceSlug;
  name: string;
  pillar: PillarId;
  /** One-line promise used in lists and as the page subtitle. */
  promise: string;
  /** Two or three sentences for the service page intro. */
  intro: string;
  deliverables: string[];
  /** Who it suits, from the old copy. */
  fit: string;
  /** Maps to the existing enquiry categories in Firestore. */
  enquiry: EnquiryType;
  seo: { title: string; description: string };
};

export const enquiryTypes = ["General Enquiry", "Development", "Digital Marketing"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const pillars: { id: PillarId; name: string; summary: string }[] = [
  {
    id: "design",
    name: "Design",
    summary: "Identity, strategy and interface design that make a brand recognisable.",
  },
  {
    id: "develop",
    name: "Develop",
    summary: "Websites, apps, dashboards and backends built to be fast, secure and scalable.",
  },
  {
    id: "grow",
    name: "Grow",
    summary: "SEO, social media and paid campaigns that bring the right audience to you.",
  },
];

export const services: Service[] = [
  {
    slug: "brand-identity",
    name: "Brand Identity & Strategy",
    pillar: "design",
    promise: "Brands with meaning, personality and purpose.",
    intro:
      "We help you define who you are and how your audience should see you, then turn that into an identity people recognise. Every element is rooted in strategy, so it stays relevant as you grow.",
    deliverables: [
      "Brand strategy and positioning",
      "Logo design",
      "Colour systems",
      "Tone of voice and brand messaging",
      "Rebrands for established businesses",
    ],
    fit: "For new businesses finding their voice, and for established ones ready to rebrand.",
    enquiry: "General Enquiry",
    seo: {
      title: "Brand Identity & Strategy",
      description:
        "Logo design, colour systems, tone of voice and brand strategy from Snap Infinity, a digital studio in Kerala working with brands across the GCC.",
    },
  },
  {
    slug: "website-development",
    name: "Website Design & Development",
    pillar: "develop",
    promise: "Websites that look sharp, load fast and keep working.",
    intro:
      "We design and build responsive websites tailored to your goals, from portfolios and service platforms to e-commerce stores. After launch we look after hosting, backups, security and updates, so the site keeps growing with your business.",
    deliverables: [
      "UI/UX design",
      "Responsive development, new builds or redesigns",
      "CMS setup",
      "E-commerce and service platforms",
      "Dashboards and backend development",
      "WhatsApp chatbot integration",
      "Hosting, backups, security and updates",
    ],
    fit: "Whether it's a new build or a redesign, we tailor every detail to your goals.",
    enquiry: "Development",
    seo: {
      title: "Website Design & Development",
      description:
        "Fast, responsive websites, CMS setup, dashboards and post-launch care from Snap Infinity, a web development studio in Kerala serving the GCC.",
    },
  },
  {
    slug: "app-development",
    name: "App Development",
    pillar: "develop",
    promise: "Mobile and web apps, from idea to launch and beyond.",
    intro:
      "We build scalable mobile and web apps that people enjoy using. Our team handles UI/UX design, development, testing and deployment with modern tech stacks and agile processes, then stays on for support and updates.",
    deliverables: [
      "UI/UX design",
      "iOS, Android and cross-platform apps",
      "Web apps and dashboards",
      "Testing and deployment",
      "Ongoing support and updates",
    ],
    fit: "For an idea that needs to become a product, or a product that needs to scale.",
    enquiry: "Development",
    seo: {
      title: "App Development",
      description:
        "iOS, Android and cross-platform app development, from UI/UX to launch and support, by Snap Infinity in Kerala.",
    },
  },
  {
    slug: "seo",
    name: "SEO",
    pillar: "grow",
    promise: "Sustainable search visibility that brings the right audience.",
    intro:
      "We start with keyword research and competitor analysis, then improve your site's structure, content and technical health. Constant performance tracking lets us refine the strategy for long-term visibility and traffic that converts.",
    deliverables: [
      "Keyword research and competitor analysis",
      "Technical SEO: crawl errors, site speed, structure",
      "Content and on-page optimisation",
      "Performance tracking and reporting",
      "Ongoing refinement",
    ],
    fit: "No gimmicks. Measurable growth that brings the right audience to you.",
    enquiry: "Digital Marketing",
    seo: {
      title: "SEO Services",
      description:
        "Keyword research, technical SEO and content optimisation for long-term search visibility. SEO services by Snap Infinity, Kerala and GCC.",
    },
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    pillar: "grow",
    promise: "A consistent presence that turns followers into customers.",
    intro:
      "We plan, create and manage content across platforms in your brand's voice: calendars, posting, community engagement and targeted ad campaigns, with regular performance tracking to keep improving results.",
    deliverables: [
      "Content creation: visuals and stories",
      "Content calendar planning",
      "Posting and community engagement",
      "Targeted ad campaigns",
      "Analytics and regular optimisation",
    ],
    fit: "Whether you're starting out or scaling up.",
    enquiry: "Digital Marketing",
    seo: {
      title: "Social Media Management",
      description:
        "Content creation, calendar planning, community management and social ads for brands in Kerala and the GCC, by Snap Infinity.",
    },
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing & Paid Ads",
    pillar: "grow",
    promise: "Performance-focused campaigns that reach the right people at the right time.",
    intro:
      "Getting noticed takes strategy. We combine SEO, content, PPC advertising and data analytics into targeted campaigns that drive traffic and conversions, with detailed reporting and ongoing optimisation.",
    deliverables: [
      "Campaign strategy",
      "PPC advertising",
      "Campaign content",
      "Data analytics and detailed reporting",
      "Ongoing optimisation",
    ],
    fit: "For brands that want visibility they can measure.",
    enquiry: "Digital Marketing",
    seo: {
      title: "Digital Marketing & Paid Ads",
      description:
        "Performance-focused digital marketing: PPC, content and analytics-led campaigns for businesses in Kerala and the GCC, by Snap Infinity.",
    },
  },
];

export const servicesByPillar = (pillar: PillarId) => services.filter((s) => s.pillar === pillar);
export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** How we work. Drawn from the process described across the old service copy. */
export const process = [
  {
    title: "Discover",
    body: "We learn your goals, your audience and your competitors before anything gets designed.",
  },
  {
    title: "Design",
    body: "Identity, interfaces and content shaped around those goals, with you in the loop at every step.",
  },
  {
    title: "Build",
    body: "Development, testing and deployment on modern tech stacks, using agile processes.",
  },
  {
    title: "Launch & grow",
    body: "Support, security and updates after launch, plus tracking and optimisation that keep results improving.",
  },
];

/** Why Snap Infinity. From the "Why choose us" section of the old site. */
export const reasons = [
  {
    title: "Under one roof",
    body: "Brand, website, app, SEO and marketing from one team, so nothing gets lost between agencies.",
  },
  {
    title: "A partner, not a vendor",
    body: "Personalised support, transparent communication and a long-term commitment. You're always in the loop.",
  },
  {
    title: "Built to grow",
    body: "Scalable design, performance optimisation and data-driven marketing, made to grow with you after launch.",
  },
  {
    title: "Kerala to the GCC",
    body: "We work with businesses across Kerala and the Gulf, with hands-on experience on international brands.",
  },
];

/** FAQ answers use only facts stated on the previous site. */
export const faqs = [
  {
    q: "Which regions do you work with?",
    a: "We work with businesses across Kerala and the GCC, and we've had hands-on experience with international brands.",
  },
  {
    q: "What can you help with?",
    a: "Brand identity and strategy, website design and development, app development, SEO, social media management, and digital marketing with paid ads. You can use one service or bring us the whole project.",
  },
  {
    q: "Do you build apps for iOS and Android?",
    a: "Yes. We build iOS, Android and cross-platform apps, as well as web apps and dashboards, covering UI/UX design, development, testing and deployment.",
  },
  {
    q: "Can you redesign our existing website?",
    a: "Yes. Whether it's a new build or a redesign, we tailor every detail to your goals.",
  },
  {
    q: "Do you look after the website after launch?",
    a: "Yes. We manage hosting, backups, security, updates and technical support after launch.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. Whether you're a startup in Kerala or a growing brand in the Gulf, we build strategies that work for your audience.",
  },
];
