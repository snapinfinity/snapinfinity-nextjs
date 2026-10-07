"use client";

import { useRef } from "react";

/** Sets --mx/--my on hovered .spotlight children so their glow follows the pointer. */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spotlight");
    if (!card || !ref.current?.contains(card)) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={className}>
      {children}
    </div>
  );
}
