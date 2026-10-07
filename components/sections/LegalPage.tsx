import { Breadcrumbs } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** Long-form legal text with comfortable measure and quiet hierarchy. */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated?: string; children: React.ReactNode }) {
  const crumbs = [{ name: title, path }];
  return (
    <article className="container-site pb-28 pt-32 md:pb-40 md:pt-44">
      <Breadcrumbs items={crumbs} />
      <header className="mt-10 flex flex-col gap-6 border-b border-line pb-12">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-h1 max-w-[14ch]">{title}</h1>
        {updated && <p className="text-fg-3">Effective {updated}</p>}
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="legal flex max-w-[68ch] flex-col gap-5 text-[1.0625rem] leading-[1.75] text-fg-2 lg:col-span-8 lg:col-start-3 [&_a]:text-teal-glow [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-h3 [&_h2]:text-fg [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-fg [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2">
          {children}
        </div>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </article>
  );
}
