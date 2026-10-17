"use client";

import { useRef, useState } from "react";
import { MQ, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * A floating card that follows the pointer over rows marked data-preview="<index>"
 * and shows the matching visual. It floats behind the rows so it never covers their text.
 * Fine pointers only; purely decorative.
 */
export function HoverPreview({ previews, children, className }: { previews: React.ReactNode[]; children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  // `shown` keeps the last visual mounted while the card fades out.
  const [shown, setShown] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useGsap(
    ({ gsap }) => {
      const el = root.current;
      const c = card.current;
      if (!el || !c) return;
      gsap.set(c, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(c, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(c, "y", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
        if (row) setShown(Number(row.dataset.preview));
        setVisible(Boolean(row));
      };
      const leave = () => setVisible(false);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root, media: MQ.finePointer },
  );

  return (
    <div ref={root} className={cn("relative isolate", className)}>
      <div className="relative z-10">{children}</div>
      <div
        ref={card}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 hidden aspect-[4/5] w-[min(22vw,320px)] overflow-hidden rounded-lg border border-line-strong shadow-[0_40px_120px_-40px_rgb(70_227_200/0.45)] transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] [@media(hover:hover)_and_(pointer:fine)]:block",
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        {/* Only the active visual is mounted, so the hidden glyphs cost nothing */}
        {shown !== null && previews[shown]}
      </div>
    </div>
  );
}
