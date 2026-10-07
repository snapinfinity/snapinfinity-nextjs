"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import type { gsap as GsapInstance } from "gsap";
import type { ScrollTrigger as ScrollTriggerClass } from "gsap/ScrollTrigger";

export type Gsap = typeof GsapInstance;
export type ScrollTriggerType = typeof ScrollTriggerClass;
export type MotionApi = { gsap: Gsap; ScrollTrigger: ScrollTriggerType };

/** Shared media queries. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

let loader: Promise<MotionApi> | null = null;

/**
 * GSAP is loaded on demand, only on devices where a scene actually runs, so it
 * never sits on the critical path (and phones usually never download it).
 */
export function loadGsap(): Promise<MotionApi> {
  loader ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    g.gsap.defaults({ ease: "power3.out" });
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return loader;
}

/**
 * Runs a GSAP scene while `media` matches. Everything created inside is reverted
 * on unmount or when the query stops matching (gsap.matchMedia handles both).
 */
export function useGsap(
  setup: (api: MotionApi) => void | (() => void),
  { scope, media, deps = [] }: { scope: RefObject<Element | null>; media: string; deps?: DependencyList },
) {
  useEffect(() => {
    let cancelled = false;
    let mm: ReturnType<Gsap["matchMedia"]> | undefined;
    const mql = window.matchMedia(media);

    const start = () => {
      mql.removeEventListener("change", start);
      loadGsap().then((api) => {
        if (cancelled || !scope.current) return;
        mm = api.gsap.matchMedia(scope.current);
        mm.add(media, () => setup(api));
      });
    };

    if (mql.matches) start();
    else mql.addEventListener("change", start);

    return () => {
      cancelled = true;
      mql.removeEventListener("change", start);
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
