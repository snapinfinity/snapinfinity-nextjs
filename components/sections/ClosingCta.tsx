import { Aurora } from "@/components/brand/Aurora";
import { InfinityMark } from "@/components/brand/InfinityMark";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitWords } from "@/components/motion/SplitWords";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function ClosingCta({
  title = "Ready to go beyond digital boundaries?",
  lead = "Tell us about your brand, product or campaign. We’ll take it from the first sketch to the final click.",
  href = "/contact",
}: {
  title?: string;
  lead?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="cv-auto relative isolate overflow-hidden border-t border-line">
      <Aurora intensity={0.9} />
      <InfinityMark
        id="cta-mark"
        className="pointer-events-none absolute -right-[12%] top-1/2 -z-10 w-[min(70vw,900px)] -translate-y-1/2 opacity-[0.07]"
      />
      <div className="container-site section-y relative flex flex-col items-start gap-10">
        <div data-reveal="fade">
          <Eyebrow>Start a project</Eyebrow>
        </div>
        <h2 id="cta-title" data-reveal="words" className="text-h1 max-w-[14ch]">
          <SplitWords segments={title} />
        </h2>
        <p data-reveal="up" className="text-lead max-w-[48ch] text-fg-2">
          {lead}
        </p>
        <div data-reveal="up" style={{ "--reveal-delay": 120 } as React.CSSProperties} className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic>
            <ButtonLink href={href} size="lg">
              Start a project
            </ButtonLink>
          </Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="text-lg text-fg-2 underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg hover:decoration-teal"
          >
            or email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
