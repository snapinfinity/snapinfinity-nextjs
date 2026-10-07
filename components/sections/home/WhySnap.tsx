import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons, services } from "@/content/services";
import { cn } from "@/lib/utils";

const card = "spotlight glass flex flex-col gap-5 overflow-hidden rounded-lg p-7 md:p-9";

export function WhySnap() {
  const [roof, partner, grow, region] = reasons;
  return (
    <section aria-labelledby="why-title" className="cv-auto container-site section-y border-t border-line">
      <SectionHeading id="why-title" className="mb-14 md:mb-20" eyebrow="Why Snap Infinity" title={["Four reasons", { text: "to talk to us.", className: "text-teal" }]} />

      <Spotlight className="grid gap-4 md:grid-cols-6">
        <article data-reveal="up" className={cn(card, "md:col-span-4")}>
          <h3 className="text-h3">{roof.title}</h3>
          <p className="max-w-[46ch] text-fg-2">{roof.body}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-4" aria-label="Services">
            {services.map((s) => (
              <li key={s.slug} className="rounded-full border border-line-strong bg-void/40 px-3.5 py-1.5 text-sm text-fg-2">
                {s.name}
              </li>
            ))}
          </ul>
        </article>

        <article data-reveal="up" style={{ "--reveal-delay": 80 } as React.CSSProperties} className={cn(card, "md:col-span-2")}>
          <h3 className="text-h3">{partner.title}</h3>
          <p className="text-fg-2">{partner.body}</p>
        </article>

        <article data-reveal="up" className={cn(card, "md:col-span-3")}>
          <h3 className="text-h3">{grow.title}</h3>
          <p className="max-w-[40ch] text-fg-2">{grow.body}</p>
          {/* Rising bars, borrowed from the mark */}
          <div aria-hidden="true" className="mt-auto flex h-24 items-end gap-2 pt-4">
            {[28, 40, 34, 52, 64, 78, 100].map((h, i) => (
              <span
                key={i}
                className="w-full rounded-[6px] bg-gradient-to-t from-teal-deep/30 to-teal"
                style={{ height: `${h}%`, opacity: 0.35 + i * 0.1 }}
              />
            ))}
          </div>
        </article>

        <article data-reveal="up" style={{ "--reveal-delay": 80 } as React.CSSProperties} className={cn(card, "md:col-span-3")}>
          <h3 className="text-h3">{region.title}</h3>
          <p className="max-w-[40ch] text-fg-2">{region.body}</p>
          <div aria-hidden="true" className="mt-auto flex items-center gap-4 pt-4 text-label text-fg-2">
            <span className="rounded-full border border-line-strong px-4 py-2">Kerala</span>
            <span className="relative h-px flex-1 bg-gradient-to-r from-teal via-teal-glow to-ember/70">
              <span className="absolute -top-[3px] right-0 size-[7px] rounded-full bg-ember" />
            </span>
            <span className="rounded-full border border-line-strong px-4 py-2">GCC</span>
          </div>
        </article>
      </Spotlight>
    </section>
  );
}
