import { ScrollLitText } from "@/components/motion/ScrollLitText";
import { Eyebrow } from "@/components/ui/SectionHeading";

const facts = [
  { label: "Where", value: "Kerala & the GCC" },
  { label: "What", value: "Design · Develop · Grow" },
  { label: "How", value: "One team, under one roof" },
];

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="container-site section-y">
      <div data-reveal="fade" className="mb-10">
        <Eyebrow>Snap Infinity</Eyebrow>
      </div>
      <ScrollLitText
        as="h2"
        id="statement-title"
        className="font-wide max-w-[24ch] text-[clamp(2rem,1rem+4.2vw,5.25rem)] font-[620] leading-[1.02] tracking-[-0.03em]"
        text="Shaping the digital moments that move markets, trusted by forward-thinking brands to lead, scale and thrive."
      />
      <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 md:mt-24">
        {facts.map((f, i) => (
          <div
            key={f.label}
            data-reveal="up"
            style={{ "--reveal-delay": i * 90 } as React.CSSProperties}
            className="flex flex-col gap-2 bg-void p-6 md:p-8"
          >
            <dt className="text-label text-fg-3">{f.label}</dt>
            <dd className="text-h3">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
