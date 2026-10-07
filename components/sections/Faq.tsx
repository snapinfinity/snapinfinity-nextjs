import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus } from "@/components/ui/Icons";

/** Native details/summary: keyboard and screen-reader friendly without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-title" className="container-site section-y border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12">
        <SectionHeading id="faq-title" className="lg:col-span-4" eyebrow="FAQ" title="Questions, answered." />
        <div className="lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} data-reveal="up" className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] font-[600] leading-snug transition-colors hover:text-teal-glow md:py-8">
                {f.q}
                <span aria-hidden="true" className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:border-teal group-open:text-teal">
                  <Plus className="size-5" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-8 text-lead text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
