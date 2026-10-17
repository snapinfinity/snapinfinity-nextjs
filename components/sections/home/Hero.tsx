import Image from "next/image";
import { Aurora } from "@/components/brand/Aurora";
import { InfinityMark } from "@/components/brand/InfinityMark";
import { DockingMark } from "@/components/motion/DockingMark";
import { HeroVideo } from "@/components/media/HeroVideo";
import { ButtonLink } from "@/components/ui/Button";
import { media } from "@/content/media";

const lines = [
  ["Infinite", "ideas."],
  ["Powerful", "results."],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Backdrop: poster (the old hero's dark 3D bars, graded teal) until the V1 video arrives */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={media.hero.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-[70%_center]"
        />
        <HeroVideo
          desktop={media.hero.videoDesktop}
          desktopWebm={media.hero.videoDesktopWebm}
          mobile={media.hero.videoMobile}
          poster={media.hero.poster}
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-void)_8%,rgb(5_8_7/0.75)_45%,rgb(5_8_7/0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-void to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/80 to-transparent" />
      </div>
      <Aurora className="-z-10" />

      <div className="container-site relative flex flex-1 flex-col pb-10 pt-28 md:pt-32">
        {/* The mark: builds itself on load, then comes apart on scroll and rebuilds in the nav (desktop) */}
        <div className="hero-mark pointer-events-none flex justify-end lg:absolute">
          <DockingMark className="relative w-[46vw] max-w-[260px] lg:w-full lg:max-w-none">
            <div
              aria-hidden="true"
              className="mark-glow absolute -inset-[30%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(70_227_200/0.28),transparent)] blur-2xl"
            />
            <InfinityMark id="hero-mark" animate className="block w-full" />
          </DockingMark>
        </div>

        <div className="mt-auto flex flex-col gap-8 pt-12 lg:gap-10">
          <p className="hero-fade text-label flex items-center gap-3 text-fg-2" style={{ "--d": 100 } as React.CSSProperties}>
            <span aria-hidden="true" className="h-3 w-1.5 rounded-[2px] bg-teal" />
            Digital studio · Kerala &amp; GCC
          </p>

          <h1
            id="hero-title"
            className="hero-title font-wide font-[760] leading-[0.88] tracking-[-0.04em]"
          >
            {lines.map((line, li) => (
              <span key={li} className="block lg:flex lg:gap-[0.24em]">
                {line.map((word, wi) => (
                  <span key={word} className="hero-line block overflow-clip pb-[0.07em] -mb-[0.07em]">
                    <span
                      className={li === 1 ? "text-teal" : undefined}
                      style={{ "--i": li * 2 + wi } as React.CSSProperties}
                    >
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="hero-fade text-lead max-w-[44ch] text-fg-2" style={{ "--d": 650 } as React.CSSProperties}>
              We design brands, build websites and apps, and grow them with SEO and social, from the first sketch to the
              final click.
            </p>
            <div className="hero-fade flex flex-wrap gap-3" style={{ "--d": 800 } as React.CSSProperties}>
              <ButtonLink href="/contact" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink href="#work" variant="ghost" size="lg" icon={false}>
                See our work
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          className="hero-fade mt-12 hidden items-center justify-between border-t border-line pt-5 text-fg-3 md:flex hero-bar"
          style={{ "--d": 1000 } as React.CSSProperties}
        >
          <span className="text-label flex items-center gap-3">
            <span aria-hidden="true" className="relative h-6 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-2 animate-[scroll-cue_2.2s_var(--ease-in-out-quart)_4] bg-teal-glow motion-reduce:animate-none" />
            </span>
            Scroll to explore
          </span>
          <span className="text-label">Design · Develop · Grow</span>
        </div>
      </div>
    </section>
  );
}
