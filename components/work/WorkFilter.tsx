"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Filter = { id: string; label: string; count: number };

/**
 * Filters the server-rendered project grid by service. Every card stays in the
 * HTML for search engines; filtering only toggles visibility.
 */
export function WorkFilter({ filters, children }: { filters: Filter[]; children: React.ReactNode }) {
  const [active, setActive] = useState("all");

  return (
    <div data-filter={active}>
      <div role="group" aria-label="Filter projects by service" className="mb-12 flex flex-wrap gap-2 md:mb-16">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={cn(
              "flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.95rem] transition-colors duration-300",
              active === f.id ? "border-teal bg-teal text-void" : "border-line-strong text-fg-2 hover:border-teal hover:text-fg",
            )}
          >
            {f.label}
            <span className={cn("text-num text-xs", active === f.id ? "text-void/70" : "text-fg-3")}>{f.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {filters.find((f) => f.id === active)?.count} projects
      </p>
      <style>{active === "all" ? "" : `[data-filter="${active}"] [data-services]:not([data-services~="${active}"]) { display: none; }`}</style>
      {children}
    </div>
  );
}
