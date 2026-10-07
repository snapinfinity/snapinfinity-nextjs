"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const selector = "[data-reveal]:not([data-in]):not([data-observed])";

/**
 * Drives every [data-reveal] element on the page (see globals.css).
 *
 * First load: an IntersectionObserver pass marks whatever is already on screen as
 * revealed, and only then is .reveal-ready added to <html>, so content above the fold
 * never blinks. No layout is read on the main thread. Later elements (client
 * navigation, sections that mount late) are picked up by a MutationObserver.
 *
 * State lives in data attributes rather than classes, so a client component
 * re-rendering its className can't undo a reveal.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const main = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.in = "";
            main.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const take = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
      els.forEach((el) => (el.dataset.observed = ""));
      return els;
    };

    let initial: IntersectionObserver | undefined;
    if (root.classList.contains("reveal-ready")) {
      take().forEach((el) => main.observe(el));
    } else {
      initial = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.dataset.in = "";
          else main.observe(el);
        }
        initial?.disconnect();
        root.classList.add("reveal-ready");
      });
      const els = take();
      if (els.length) els.forEach((el) => initial!.observe(el));
      else root.classList.add("reveal-ready");
    }

    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (root.classList.contains("reveal-ready")) take().forEach((el) => main.observe(el));
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      main.disconnect();
      initial?.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      document.querySelectorAll<HTMLElement>("[data-observed]").forEach((el) => delete el.dataset.observed);
    };
  }, [pathname]);

  return null;
}
