import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/home/Process";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Spotlight } from "@/components/motion/Spotlight";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs, pillars, services, servicesByPillar } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, servicesListSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Services: Branding, Web, Apps, SEO & Marketing",
  description:
    "Brand identity, website and app development, SEO, social media management and paid ads from one team in Kerala, working with businesses across the GCC.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={["Expertly built", { text: "solutions.", className: "text-teal" }]}
        lead="Scalable, high-performance websites and apps, joined up with branding, SEO and digital marketing for lasting impact. Organised around three things we do: design, develop and grow."
      />

      {pillars.map((pillar, i) => (
        <section key={pillar.id} aria-labelledby={`pillar-${pillar.id}`} className="container-site border-t border-line py-20 md:py-28">
          <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div data-reveal="fade">
                <Eyebrow index={`0${i + 1}`}>Pillar</Eyebrow>
              </div>
              <h2 id={`pillar-${pillar.id}`} data-reveal="up" className="font-wide mt-6 text-[clamp(3rem,1.5rem+6vw,7.5rem)] font-[760] leading-[0.9] tracking-[-0.04em]">
                {pillar.name}
                <span className="text-teal">.</span>
              </h2>
            </div>
            <p data-reveal="up" className="text-lead text-fg-2 lg:col-span-5 lg:pb-3">
              {pillar.summary}
            </p>
          </div>
          <Spotlight
            className={
              servicesByPillar(pillar.id).length === 1
                ? "grid"
                : servicesByPillar(pillar.id).length === 2
                  ? "grid gap-4 md:grid-cols-2"
                  : "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            }
          >
            {servicesByPillar(pillar.id).map((s, si, all) => (
              <div key={s.slug} data-reveal="up" style={{ "--reveal-delay": si * 90 } as React.CSSProperties} className="flex">
                <ServiceCard service={s} wide={all.length === 1} />
              </div>
            ))}
          </Spotlight>
        </section>
      ))}

      <Process />
      <Faq items={faqs} />
      <ClosingCta />

      <JsonLd data={[breadcrumbSchema([{ name: "Services", path: "/services" }]), servicesListSchema(services), faqSchema(faqs)]} />
    </>
  );
}
