"use client";

import { useRef } from "react";
import { MARK_VIEWBOX } from "@/components/brand/logo-paths";
import { MQ, useGsap } from "@/lib/gsap";

// The two states of each piece. Bars sink into their base; arcs swing about the
// centre of the mark, as in the load entrance.
const CENTER = `${MARK_VIEWBOX.width / 2} ${MARK_VIEWBOX.height / 2}`;
const barUp = () => ({ scaleY: 1, opacity: 1, transformOrigin: "50% 100%" });
const barDown = () => ({ scaleY: 0.08, opacity: 0, transformOrigin: "50% 100%" });
const arcIn = () => ({ rotation: 0, scale: 1, opacity: 1, svgOrigin: CENTER });
const arcOut = () => ({ rotation: (i: number) => (i ? 38 : -38), scale: 0.92, opacity: 0, svgOrigin: CENTER });

/**
 * As the hero scrolls away, the big mark takes itself apart (bars sink right to left,
 * arcs swing open) and the nav mark builds itself with the same moves, left to right.
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

      const distance = () => hero.offsetHeight * 0.5;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // Lag the page a little so the mark stays in view while it comes apart.
        .to(el, { y: () => distance() * 0.6, ease: "none", duration: 1 }, 0)
        .to(el.querySelector(".mark-glow"), { opacity: 0, ease: "none", duration: 0.3 }, 0)
        .fromTo(
          el.querySelectorAll("[data-bar]"),
          barUp(),
          { ...barDown(), ease: "power2.in", duration: 0.3, stagger: { each: 0.04, from: "end" } },
          0,
        )
        .fromTo(el.querySelectorAll("[data-arc]"), arcIn(), { ...arcOut(), ease: "power2.in", duration: 0.35 }, 0.15)
        // The nav pieces start hidden by CSS (globals.css), not by an immediate render here:
        // GSAP would restore that hidden state on teardown and blank the logo on the next page.
        .fromTo(
          navMark.querySelectorAll("[data-arc]"),
          arcOut(),
          { ...arcIn(), immediateRender: false, ease: "power3.out", duration: 0.4 },
          0.45,
        )
        .fromTo(
          navMark.querySelectorAll("[data-bar]"),
          barDown(),
          { ...barUp(), immediateRender: false, ease: "power3.out", duration: 0.28, stagger: 0.04 },
          0.5,
        );
    },
    { scope: ref, media: MQ.desktop },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
