import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Aurora } from "@/components/brand/Aurora";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ArrowUpRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudies, getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  return pageMetadata({
    title: `${project.name} Case Study`,
    description: project.summary ?? project.caseStudy.intro,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const { caseStudy } = project;

  const crumbs = [
    { name: "Work", path: "/work" },
    { name: project.name, path: `/work/${project.slug}` },
  ];
  const usedServices = project.services.map(getService).filter((s) => s !== undefined);
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={project.sector ?? "Case study"} title={project.name} lead={caseStudy.intro}>
        <ul data-reveal="up" className="flex flex-wrap gap-2 pt-2" aria-label="Scope">
          {project.scope.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-label={`${project.name} visuals`} className="container-site">
        <div data-reveal="clip" className="relative isolate grid min-h-[60vh] place-items-center overflow-hidden rounded-xl border border-line bg-abyss px-6 py-14 md:py-20">
          <Aurora className="-z-10" />
          <Image
            src={project.image}
            alt=""
            aria-hidden="true"
            fill
            sizes="10vw"
            className="-z-10 scale-125 object-cover opacity-25 blur-3xl"
          />
          <Image
            src={project.image}
            alt={`${project.name} designed and built by Snap Infinity`}
            width={430}
            height={626}
            priority
            sizes="(min-width: 768px) 430px, 80vw"
            className="h-auto w-[min(80vw,430px)] drop-shadow-[0_40px_80px_rgb(0_0_0/0.6)]"
          />
        </div>
      </section>

      <section aria-labelledby="delivered-title" className="container-site section-y">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            {caseStudy.goal && (
              <div>
                <p data-reveal="fade" className="text-label text-fg-3">
                  The goal
                </p>
                <p data-reveal="up" className="font-wide mt-5 text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-[600] leading-[1.12] tracking-[-0.02em]">
                  {caseStudy.goal}
                </p>
              </div>
            )}
            {usedServices.length > 0 && (
              <div data-reveal="up">
                <p className="text-label mb-4 text-fg-3">Services</p>
                <ul className="flex flex-col">
                  {usedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between border-t border-line py-4 text-fg-2 transition-colors hover:text-fg"
                      >
                        {s.name}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <SectionHeading id="delivered-title" title="What we delivered" />
            <ul className="mt-10">
              {caseStudy.delivered.map((d, i) => (
                <li
                  key={d}
                  data-reveal="up"
                  style={{ "--reveal-delay": i * 60 } as React.CSSProperties}
                  className="flex items-baseline gap-5 border-t border-line py-6 last:border-b"
                >
                  <span aria-hidden="true" className="h-3.5 w-1.5 shrink-0 rounded-[2px] bg-teal" />
                  <span className="text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="container-site section-y border-t border-line">
        <SectionHeading id="more-title" className="mb-14" eyebrow="More work" title="Keep exploring" />
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <div key={p.slug} data-reveal="up" style={{ "--reveal-delay": i * 90 } as React.CSSProperties}>
              <ProjectCard project={p} index={projects.indexOf(p)} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
            </div>
          ))}
        </div>
      </section>

      <ClosingCta />
      <JsonLd data={[caseStudySchema(project), breadcrumbSchema(crumbs)]} />
    </>
  );
}
