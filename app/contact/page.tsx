import type { Metadata } from "next";
import { Suspense } from "react";
import { Aurora } from "@/components/brand/Aurora";
import { ContactForm } from "@/components/forms/ContactForm";
import { CopyEmail } from "@/components/forms/CopyEmail";
import { Breadcrumbs } from "@/components/sections/PageHero";
import { SplitWords } from "@/components/motion/SplitWords";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { socialIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Contact: Start a Project",
  description:
    "Tell Snap Infinity about your brand, website, app or marketing project. We work with businesses across Kerala and the GCC. Email info@snapinfinity.com.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = [{ name: "Contact", path: "/contact" }];
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora className="-z-10" intensity={0.8} />
      <div className="container-site pb-28 pt-32 md:pb-40 md:pt-44">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div data-reveal="fade">
              <Eyebrow>Contact</Eyebrow>
            </div>
            <h1 data-reveal="words" className="text-h1 max-w-[12ch]">
              <SplitWords segments={["Tell us about", { text: "your project.", className: "text-teal" }]} />
            </h1>
            <p data-reveal="up" className="text-lead max-w-[42ch] text-fg-2">
              Whether you have a project in mind, want to collaborate, or just have a question, reach out. Our team is
              ready to help.
            </p>

            <dl data-reveal="up" className="mt-4 flex flex-col gap-8 border-t border-line pt-8">
              <div className="flex flex-col gap-2">
                <dt className="text-label text-fg-3">Email</dt>
                <dd>
                  <CopyEmail email={site.email} />
                </dd>
              </div>
              {site.phone && (
                <div className="flex flex-col gap-2">
                  <dt className="text-label text-fg-3">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone}`} className="text-h3 hover:text-teal-glow">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <dt className="text-label text-fg-3">Where we work</dt>
                <dd className="text-h3">Kerala &amp; the GCC</dd>
              </div>
              <div className="flex flex-col gap-3">
                <dt className="text-label text-fg-3">Follow</dt>
                <dd>
                  <ul className="flex gap-2">
                    {site.socials.map((s) => {
                      const Icon = socialIcon[s.label as keyof typeof socialIcon];
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${s.label} (opens in a new tab)`}
                            className="grid size-12 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:border-teal hover:text-fg"
                          >
                            <Icon />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div data-reveal="up" style={{ "--reveal-delay": 120 } as React.CSSProperties} className="glass relative rounded-xl p-6 sm:p-10 md:p-12">
              <Suspense fallback={<div className="min-h-[620px]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Snap Infinity",
            url: `${site.url}/contact`,
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
    </section>
  );
}
