import type { Metadata } from "next";
import Image from "next/image";
import { InfinityMark } from "@/components/brand/InfinityMark";
import { Breadcrumbs } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ScrollLitText } from "@/components/motion/ScrollLitText";
import { SplitWords } from "@/components/motion/SplitWords";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { reasons } from "@/content/services";
import { studioPhotos } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "About the Studio",
  description:
    "Meet Snap Infinity: a team of designers, developers and marketers in Kerala creating digital brands, products and campaigns for businesses across the GCC.",
  path: "/about",
});

// Mosaic for the seven studio photos; each breakpoint tiles without gaps.
// lg (12 cols): rows 1–2 = 5 + 4 + 3, row 3 = 3 + 4 + 5.
const mosaic = [
  "col-span-2 md:col-span-2 md:row-span-2 lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "col-span-2 md:col-span-1 lg:col-span-4",
  "col-span-2 md:col-span-3 lg:col-span-5",
];

export default function AboutPage() {
  const crumbs = [{ name: "About", path: "/about" }];
  return (
    <>
      <section className="relative isolate min-h-[92svh] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src={media.aboutHero} alt="" fill priority sizes="100vw" quality={70} className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_10%,rgb(5_8_7/0.5)_60%,rgb(5_8_7/0.2))]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
        </div>
        <InfinityMark id="about-mark" animate className="pointer-events-none absolute -right-[8%] top-[18%] -z-10 hidden w-[52vw] max-w-[820px] opacity-30 md:block" />
        <div className="container-site flex min-h-[92svh] flex-col pb-16 pt-32 md:pt-44">
          <Breadcrumbs items={crumbs} />
          <div className="mt-auto flex flex-col gap-8 pt-16">
            <div data-reveal="fade">
              <Eyebrow>About Snap Infinity</Eyebrow>
            </div>
            <h1 data-reveal="words" className="about-title font-wide whitespace-nowrap font-[760] leading-[0.9] tracking-[-0.04em]">
              {/* Fixed line breaks (5 lines on phones, 3 above) so the font swap can't reflow it */}
              <SplitWords
                segments={[
                  "Infinite ideas.",
                  { br: true },
                  "Powerful",
                  { br: true, className: "sm:hidden" },
                  "results.",
                  { br: true },
                  { text: "That’s Snap", className: "text-teal" },
                  { br: true, className: "sm:hidden" },
                  { text: "Infinity.", className: "text-teal" },
                ]}
              />
            </h1>
            <p data-reveal="up" className="text-lead max-w-[46ch] text-fg-2">
              We’re a passionate team of experts dedicated to creating your digital value: ideas, products and
              experiences that help brands grow.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="who-title" className="container-site section-y border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal="fade">
            <Eyebrow>Who we are</Eyebrow>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-8">
            <ScrollLitText
              as="h2"
              id="who-title"
              className="font-wide text-[clamp(1.9rem,1rem+3.4vw,4.25rem)] font-[620] leading-[1.04] tracking-[-0.03em]"
              text="An enthusiastic team sharing creativity and efficiency, passion and expertise."
            />
            <div className="grid gap-6 text-lead text-fg-2 md:grid-cols-2">
              <p data-reveal="up">
                Snap Infinity helps businesses grow their digital presence across Kerala and the GCC, from social media
                marketing to web and app development, with a focus on real results that match your goals.
              </p>
              <p data-reveal="up" style={{ "--reveal-delay": 100 } as React.CSSProperties}>
                Hands-on work with international brands gives us a feel for global standards. We blend creative thinking
                with technical skill, and keep things simple, clear and focused so you’re always in the loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="container-site section-y border-t border-line">
        <SectionHeading id="values-title" className="mb-14 md:mb-20" eyebrow="What we stand for" title={["How we", { text: "work with you.", className: "text-teal" }]} />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {reasons.map((r, i) => (
            <div key={r.title} data-reveal="fade" style={{ "--reveal-delay": i * 80 } as React.CSSProperties} className="flex flex-col gap-4 bg-void p-8 md:p-12">
              <span aria-hidden="true" className="h-4 w-1.5 rounded-[2px] bg-teal" />
              <h3 className="text-h3">{r.title}</h3>
              <p className="max-w-[44ch] text-fg-2">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="studio-title" className="section-y border-t border-line">
        <div className="container-site">
          <SectionHeading id="studio-title" className="mb-14 md:mb-20" eyebrow="The studio" title="Inside the studio." lead="Be bold or italic, but never regular. It says so on the shelf." />
          <ul className="grid grid-flow-dense auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[32vw] md:auto-rows-[26vw] md:grid-cols-3 lg:auto-rows-[15vw] lg:grid-cols-12">
            {studioPhotos.map((p, i) => (
              <li key={p.src} data-reveal="clip" style={{ "--reveal-delay": (i % 4) * 80 } as React.CSSProperties} className={cn("group relative overflow-hidden rounded-lg", mosaic[i])}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover saturate-[0.55] transition-[filter,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:saturate-100"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-void/20 transition-opacity duration-700 group-hover:opacity-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-title" className="container-site section-y border-t border-line">
        <SectionHeading id="team-title" className="mb-14 md:mb-20" eyebrow="Team" title={["The people", { text: "behind the work.", className: "text-teal" }]} lead="United by vision, powered by collaboration." />
        <TeamGrid />
      </section>

      <ClosingCta title="Let’s make something infinite together." />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
