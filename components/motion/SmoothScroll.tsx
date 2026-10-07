"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { loadGsap, MQ } from "@/lib/gsap";

type LenisRef = { current: Lenis | null };
const LenisContext = createContext<LenisRef>({ current: null });

/** Returns a ref to the Lenis instance (null on touch devices and with reduced motion). */
export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scrolling on desktop pointers only, driven by GSAP's ticker so
 * ScrollTrigger scenes stay in sync. Both load lazily, after the page is interactive.
 * Touch devices and reduced-motion users keep native scrolling and never download them.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!window.matchMedia(MQ.finePointer).matches) return;
    let cancelled = false;
    let teardown: (() => void) | undefined;

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const instance = new LenisCtor({ lerp: 0.1, anchors: { offset: -96 } });
      instance.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.current = instance;
      teardown = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
        lenis.current = null;
      };
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  // Start every new page at the top, without a smooth scroll back up.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    if (lenis.current) loadGsap().then(({ ScrollTrigger }) => requestAnimationFrame(() => ScrollTrigger.refresh()));
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
