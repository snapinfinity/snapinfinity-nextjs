import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/home/Process";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, pillars, services } from "@/content/services";
import { projectsForService } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pillar = pillars.find((p) => p.id === service.pillar)!;
  const related = projectsForService(service.slug).slice(0, 6);
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={pillar.name}
        title={service.name}
        lead={
          <>
            <p className="text-fg">{service.promise}</p>
            <p className="mt-4">{service.intro}</p>
          </>
        }
        aside={
          <div data-reveal="clip" className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-lg border border-line-strong shadow-[0_60px_140px_-60px_rgb(70_227_200/0.5)]">
            <ServiceVisual slug={service.slug} sizes="(min-width: 1024px) 420px, 90vw" priority />
          </div>
        }
      >
        <div data-reveal="up" style={{ "--reveal-delay": 240 } as React.CSSProperties} className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
            Start a project
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="included-title" className="container-site section-y border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="included-title" className="lg:col-span-5" eyebrow="What’s included" title="What we deliver" lead={service.fit} />
          <ul className="lg:col-span-7">
            {service.deliverables.map((d, i) => (
              <li
                key={d}
                data-reveal="up"
                style={{ "--reveal-delay": i * 60 } as React.CSSProperties}
                className="flex items-baseline gap-5 border-t border-line py-6 last:border-b"
              >
                <span aria-hidden="true" className="mt-1 h-3.5 w-1.5 shrink-0 rounded-[2px] bg-teal" />
                <span className="text-[clamp(1.25rem,1rem+0.9vw,1.875rem)] font-[560] leading-tight tracking-[-0.01em]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-site section-y border-t border-line">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="related-title" eyebrow="Related work" title={`${service.name} in practice`} />
            <ButtonLink href="/work" variant="ghost">
              All work
            </ButtonLink>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <div key={p.slug} data-reveal="up" style={{ "--reveal-delay": (i % 3) * 90 } as React.CSSProperties}>
                <ProjectCard project={p} index={i} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
              </div>
            ))}
          </div>
        </section>
      )}

      <Process title="How we’ll work together" />

      <section aria-labelledby="other-title" className="container-site section-y border-t border-line">
        <SectionHeading id="other-title" className="mb-12" eyebrow="More services" title="Often paired with" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} data-reveal="up">
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full items-center justify-between gap-6 rounded-lg border border-line bg-surface/40 p-6 transition-colors hover:border-teal/50 hover:bg-teal/[0.04]"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-label text-fg-3">{pillars.find((p) => p.id === s.pillar)?.name}</span>
                  <span className="text-h3">{s.name}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-fg-3 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta href={`/contact?service=${service.slug}`} />

      <JsonLd data={[serviceSchema(service), breadcrumbSchema(crumbs)]} />
    </>
  );
}
