import Link from "next/link";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { HoverPreview } from "@/components/motion/HoverPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";
import { pillars, servicesByPillar } from "@/content/services";
import { pad } from "@/lib/utils";

export function ServicesIndex() {
  const ordered = pillars.flatMap((p) => servicesByPillar(p.id));
  return (
    <section aria-labelledby="services-title" className="cv-auto container-site section-y border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <SectionHeading
          id="services-title"
          className="lg:col-span-7"
          eyebrow="Services"
          title={["Design.", "Develop.", { text: "Grow.", className: "text-teal" }]}
        />
        <p data-reveal="up" className="text-lead text-fg-2 lg:col-span-5 lg:pb-3">
          Brand, website, app and marketing from one team, all under one roof. Use one service or bring us the whole
          project.
        </p>
      </div>

      <HoverPreview className="mt-16 md:mt-24" previews={ordered.map((s) => <ServiceVisual key={s.slug} slug={s.slug} />)}>
        {pillars.map((pillar) => (
          <div key={pillar.id} className="grid border-t border-line lg:grid-cols-12">
            <div className="py-6 lg:col-span-3 lg:py-10" data-reveal="fade">
              <h3 className="text-label text-teal-glow">{pillar.name}</h3>
              <p className="mt-3 max-w-[30ch] text-[0.95rem] text-fg-3">{pillar.summary}</p>
            </div>
            <ul className="lg:col-span-9">
              {servicesByPillar(pillar.id).map((s) => {
                const i = ordered.findIndex((o) => o.slug === s.slug);
                return (
                  <li key={s.slug} data-preview={i} className="border-t border-line first:border-t-0 lg:first:border-t-0">
                    <Link
                      href={`/services/${s.slug}`}
                      data-reveal="up"
                      className="group flex items-center gap-5 py-6 md:gap-8 md:py-9"
                    >
                      <span className="text-num w-8 shrink-0 text-sm text-fg-3 transition-colors group-hover:text-teal">
                        {pad(i + 1)}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                        <span className="font-wide text-[clamp(1.6rem,1rem+2.6vw,3.25rem)] font-[640] leading-[1.02] tracking-[-0.025em] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-teal-glow">
                          {s.name}
                        </span>
                        <span className="max-w-[34ch] text-[0.98rem] text-fg-2 md:text-right">{s.promise}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-teal group-hover:bg-teal group-hover:text-void"
                      >
                        <ArrowUpRight className="size-5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </HoverPreview>
    </section>
  );
}
