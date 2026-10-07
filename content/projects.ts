import type { ServiceSlug } from "./services";

// Portfolio. Scope tags come from the previous site. `sector` labels were read from
// each client's own logo or mockup and should be confirmed by Snap Infinity.
// Add a `caseStudy` to any project to generate its /work/[slug] page automatically.

export type Project = {
  slug: string;
  name: string;
  sector?: string;
  image: string;
  /** Display tags, as listed on the previous site. */
  scope: string[];
  /** Service pages this project appears on. */
  services: ServiceSlug[];
  featured?: boolean;
  summary?: string;
  caseStudy?: {
    intro: string;
    goal?: string;
    delivered: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "poogo",
    name: "Poogo Sales App",
    sector: "Sales and order management",
    image: "/images/work/poogo.png",
    scope: ["App Development", "UI/UX Design", "Firebase"],
    services: ["app-development"],
    featured: true,
    summary: "A mobile app that helps small and medium businesses manage sales and orders in real time.",
    caseStudy: {
      intro:
        "Poogo is a mobile app for small and medium businesses that need to run sales and orders without the paperwork. We designed and developed it end to end.",
      goal: "Give businesses a reliable, easy-to-use sales tool that delivers value in real time and scales as they grow.",
      delivered: [
        "Quick order creation",
        "Real-time delivery tracking with live status updates",
        "Simple daily sales overviews",
        "Secure data handling on Firebase",
        "A clean, focused UI/UX that reduces manual work",
      ],
    },
  },
  {
    slug: "shaastec",
    name: "Shaastec International",
    sector: "Construction and building materials",
    image: "/images/work/shaastec.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Dashboard App", "Backend Development"],
    services: ["website-development", "app-development", "seo"],
    featured: true,
    summary: "A responsive website and dashboard for a construction and building materials company.",
    caseStudy: {
      intro:
        "Shaastec International is a construction and building materials company. They needed a digital presence as professional as their work, one that makes it easy to explore services, browse products and get in touch.",
      goal: "Reflect the company's industry expertise and service excellence, on desktop and mobile.",
      delivered: [
        "A clean, intuitive interface optimised for desktop and mobile",
        "Service and product showcases",
        "A WhatsApp chatbot for real-time enquiries straight from the site",
        "A dashboard app and backend development",
        "Basic SEO setup",
      ],
    },
  },
  {
    slug: "cscplay",
    name: "CSCPlay",
    sector: "Sports",
    image: "/images/work/csc.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Dashboard App", "Backend Development"],
    services: ["website-development", "app-development", "seo"],
    featured: true,
  },
  {
    slug: "insource-360-banking",
    name: "Insource 360 Banking",
    sector: "Banking consultancy",
    image: "/images/work/insource-banking.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Dashboard App"],
    services: ["website-development", "app-development", "seo"],
    featured: true,
  },
  {
    slug: "laurel-garden",
    name: "Laurel Garden",
    sector: "Events venue",
    image: "/images/work/laurel-garden.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Digital Marketing", "Social Media Marketing"],
    services: ["website-development", "seo", "digital-marketing", "social-media-management"],
    featured: true,
  },
  {
    slug: "grb-foods",
    name: "GRB Foods Middle East",
    sector: "Food",
    image: "/images/work/grb.png",
    scope: ["Digital Marketing", "Social Media Marketing"],
    services: ["digital-marketing", "social-media-management"],
    featured: true,
  },
  {
    slug: "insource-real-estate",
    name: "Insource Real Estate",
    sector: "Real estate",
    image: "/images/work/insource-properties.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Dashboard (Web)", "Backend Development"],
    services: ["website-development", "seo"],
  },
  {
    slug: "western-sayal",
    name: "Western Sayal",
    image: "/images/work/western-sayal.png",
    scope: ["Website", "UI/UX Design", "Digital Marketing", "Social Media Marketing", "SEO"],
    services: ["website-development", "seo", "digital-marketing", "social-media-management"],
  },
  {
    slug: "early-learning-centre",
    // The previous site listed this as "ELC Learning Centre ME"; the mockup reads "Early Learning Centre ME".
    name: "Early Learning Centre ME",
    sector: "Early learning",
    image: "/images/work/elc.png",
    scope: ["Digital Marketing", "Social Media Marketing"],
    services: ["digital-marketing", "social-media-management"],
  },
  {
    slug: "techbiz",
    name: "Techbiz Solutions",
    sector: "IT solutions",
    image: "/images/work/techbiz.png",
    scope: ["Website", "UI/UX Design", "Basic SEO", "Digital Marketing", "Social Media Marketing", "WhatsApp Bot"],
    services: ["website-development", "seo", "digital-marketing", "social-media-management"],
  },
  {
    slug: "rias-engineering",
    name: "Rias Engineering",
    sector: "Engineering",
    image: "/images/work/rias.png",
    scope: ["Digital Marketing", "Social Media Marketing", "SEO"],
    services: ["digital-marketing", "social-media-management", "seo"],
  },
  {
    slug: "foster",
    name: "Foster",
    image: "/images/work/foster.png",
    scope: ["Digital Marketing", "Social Media Marketing"],
    services: ["digital-marketing", "social-media-management"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const caseStudies = projects.filter((p) => p.caseStudy);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsForService = (slug: ServiceSlug) => projects.filter((p) => p.services.includes(slug));
export const hasCaseStudy = (p: Project) => Boolean(p.caseStudy);
