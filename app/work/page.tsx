import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkFilter } from "@/components/work/WorkFilter";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Work: Websites, Apps & Digital Campaigns",
  description:
    "Selected projects by Snap Infinity: websites, dashboards, mobile apps and social media campaigns for businesses in Kerala and the GCC.",
  path: "/work",
});

const shortLabel: Record<string, string> = {
  "website-development": "Websites",
  "app-development": "Apps",
  seo: "SEO",
  "social-media-management": "Social media",
  "digital-marketing": "Digital marketing",
};

export default function WorkPage() {
  const filters = [
    { id: "all", label: "All", count: projects.length },
    ...services
      .map((s) => ({ id: s.slug, label: shortLabel[s.slug] ?? s.name, count: projects.filter((p) => p.services.includes(s.slug)).length }))
      .filter((f) => f.count > 0),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        title={["Brands, apps and platforms", { text: "we’ve built.", className: "text-teal" }]}
        lead="Websites, dashboards, mobile apps and social campaigns for businesses across Kerala and the GCC."
      />
      <section aria-label="Projects" className="container-site pb-28 md:pb-40">
        <WorkFilter filters={filters}>
          <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.slug} data-services={p.services.join(" ")} data-reveal="up" style={{ "--reveal-delay": (i % 3) * 90 } as React.CSSProperties}>
                <ProjectCard project={p} index={i} headingLevel="h2" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
              </li>
            ))}
          </ul>
        </WorkFilter>
      </section>
      <ClosingCta />
      <JsonLd data={breadcrumbSchema([{ name: "Work", path: "/work" }])} />
    </>
  );
}
