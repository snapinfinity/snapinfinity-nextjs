"use client";

import { useRef } from "react";
import { MQ, useGsap } from "@/lib/gsap";

/**
 * As the hero scrolls away, the big mark shrinks and flies into the navbar logo,
 * then hands over to it. A rebuilt version of the old site's signature moment.
 * Desktop with motion only; everywhere else the nav logo is simply visible.
 */
export function DockingMark({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(
    ({ gsap }) => {
      const el = ref.current;
      const hero = el?.closest("section");
      const navMark = document.querySelector<SVGElement>("[data-nav-mark]");
      if (!el || !hero || !navMark) return;

      const distance = () => hero.offsetHeight * 0.55;
      // Measured with transforms cleared so values stay correct on resize.
      const geometry = () => {
        const t = el.style.transform;
        el.style.transform = "none";
        const from = el.getBoundingClientRect();
        el.style.transform = t;
        return { from, to: navMark.getBoundingClientRect(), top: from.top + window.scrollY };
      };
      let g = geometry();

      gsap.set(navMark, { opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              g = geometry();
            },
          },
        })
        .to(el, {
          x: () => g.to.left - g.from.left,
          // The page scrolls `distance` while we travel, so add it back to land on the fixed nav.
          y: () => g.to.top - (g.top - distance()),
          scale: () => g.to.width / g.from.width,
          transformOrigin: "0 0",
          ease: "power2.inOut",
          duration: 1,
        })
        .to(el, { opacity: 0, duration: 0.12, ease: "none" }, 0.88)
        .to(navMark, { opacity: 1, duration: 0.12, ease: "none" }, 0.86);

      return () => gsap.set(navMark, { clearProps: "opacity" });
    },
    { scope: ref, media: MQ.desktop },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
