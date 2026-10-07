"use client";

import { useEffect, useRef } from "react";

const DIM = 0.4; // keeps unlit words above 3:1 contrast for large text

/**
 * Words light up one by one as the passage scrolls through the viewport.
 * Plain scroll + rAF (no animation library), active only while on screen.
 */
export function ScrollLitText({
  text,
  className,
  id,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  id?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top reaches 78% of the viewport, 1 when the bottom reaches 42%.
      const start = vh * 0.78;
      const end = vh * 0.42;
      const progress = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = progress * spans.length;
      spans.forEach((s, i) => {
        const o = DIM + (1 - DIM) * Math.min(1, Math.max(0, lit - i));
        s.style.opacity = o.toFixed(3);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      spans.forEach((s) => (s.style.opacity = ""));
    };
  }, []);

  return (
    <Tag ref={ref} id={id} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w="">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
