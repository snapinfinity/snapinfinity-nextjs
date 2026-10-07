import { site } from "@/content/site";
import type { Service } from "@/content/services";
import type { Project } from "@/content/projects";
import { absoluteUrl } from "./utils";

// JSON-LD builders. Rendered with <JsonLd> in layouts and pages.

const orgId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export function organizationSchema() {
  const address = site.address;
  return {
    "@context": "https://schema.org",
    "@type": address ? "ProfessionalService" : "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.alternateName,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.locality,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.country,
          },
        }
      : {}),
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    sameAs: site.socials.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      areaServed: ["IN", "AE", "SA", "QA", "KW", "BH", "OM"],
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    alternateName: site.alternateName,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.intro,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

export function servicesListSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/services/${s.slug}`),
      name: s.name,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function caseStudySchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.caseStudy?.intro ?? project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(project.image),
    creator: { "@id": orgId },
    keywords: project.scope.join(", "),
  };
}
