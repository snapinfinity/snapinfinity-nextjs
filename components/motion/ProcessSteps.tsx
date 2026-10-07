"use client";

import { useEffect, useRef, useState } from "react";
import { InfinityMark } from "@/components/brand/InfinityMark";
import { cn, pad } from "@/lib/utils";

type Step = { title: string; body: string };

// Each step lights up more of the mark until the whole loop is lit.
const litFor = (step: number) => Array.from({ length: Math.min(7, step * 2 + 2) }, (_, i) => i);

/** Sticky mark on the left, steps on the right; the step nearest the centre is active. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[22vh]">
          <InfinityMark id="process-mark" lit={litFor(active)} gradient={false} className="w-[min(32vw,440px)] text-teal-deep" />
          <p className="text-num mt-10 text-[5rem] leading-none text-fg-3">
            <span className="text-teal">{pad(active + 1)}</span>
            <span className="text-[2rem]"> / {pad(steps.length)}</span>
          </p>
        </div>
      </div>
      <ol className="flex flex-col gap-4 lg:col-span-7">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            data-reveal="up"
          >
            <div
              className={cn(
                "rounded-lg border p-7 transition-[border-color,background-color] duration-700 md:p-10 lg:min-h-[38vh]",
                active === i ? "border-teal/40 bg-teal/[0.05]" : "border-line bg-surface/40",
              )}
            >
              <span className={cn("text-num block text-5xl transition-colors duration-700", active === i ? "text-teal" : "text-fg-3")}>
                {pad(i + 1)}
              </span>
              <h3 className="font-wide mt-8 text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-[650] leading-none tracking-[-0.025em]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[42ch] text-lead text-fg-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
