"use client";

import { useRef } from "react";
import { MQ, useGsap } from "@/lib/gsap";
import { cn, pad } from "@/lib/utils";

/**
 * Desktop: pins the section and scrolls the track sideways, drifting each image
 * inside its frame. Touch and reduced motion: a native scroll-snap row.
 */
export function PinnedGallery({ children, count, className }: { children: React.ReactNode; count: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGsap(
    ({ gsap }) => {
      const section = root.current;
      const t = track.current;
      if (!section || !t) return;

      section.classList.add("is-pinned");
      const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(count, Math.max(1, Math.round(self.progress * (count - 1)) + 1));
            if (counter.current) counter.current.textContent = pad(i);
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      t.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 4, scale: 1.1 },
          {
            xPercent: -4,
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });

      return () => section.classList.remove("is-pinned");
    },
    { scope: root, media: MQ.desktop },
  );

  return (
    <div ref={root} className={cn("group/gallery relative overflow-hidden lg:flex lg:h-[100svh] lg:items-center", className)}>
      <div
        ref={track}
        className="scroll-x flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-[clamp(1rem,0.4rem+3vw,3.5rem)] px-[clamp(1rem,0.4rem+3vw,3.5rem)] pb-4 group-[.is-pinned]/gallery:snap-none group-[.is-pinned]/gallery:overflow-visible lg:gap-10"
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-6 px-[clamp(1rem,0.4rem+3vw,3.5rem)] group-[.is-pinned]/gallery:flex"
      >
        <span className="text-num text-sm text-fg-2">
          <span ref={counter}>01</span> / {pad(count)}
        </span>
        <span className="relative h-px flex-1 bg-line-strong">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-teal" />
        </span>
      </div>
    </div>
  );
}
