import { cn } from "@/lib/utils";
import { MARK_VIEWBOX, markArcs, markBars } from "./logo-paths";

type Props = {
  id: string;
  className?: string;
  /** Plays the CSS entrance: bars rise, arcs swing into the loop. */
  animate?: boolean;
  /** Paint with the Infinity gradient instead of flat teal. */
  gradient?: boolean;
  /** Indices of bars to highlight (used by the process section). */
  lit?: number[];
};

/**
 * The logo mark as separate shapes so each bar and arc can move on its own.
 * Bars are numbered left to right, 0–6. Each shape sits in its own group so a
 * scroll scene can move the group without fighting the CSS entrance on the path.
 */
export function InfinityMark({ id, className, animate, gradient = true, lit }: Props) {
  const fill = gradient ? `url(#${id}-fill)` : "currentColor";
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      className={cn("overflow-visible", animate && "mark-animate", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1386" y2="953" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#46E3C8" />
          <stop offset="0.5" stopColor="#37AD9D" />
          <stop offset="1" stopColor="#0B5A50" />
        </linearGradient>
      </defs>
      <g>
        {markArcs.map((d, i) => (
          <g key={`a${i}`} data-arc={i}>
            <path className="mark-arc" d={d} fill={fill} />
          </g>
        ))}
        {markBars.map((b, i) => (
          <g key={`b${i}`} data-bar={i}>
            <path
              className={cn("mark-bar transition-[fill,opacity] duration-700", lit && !lit.includes(i) && "opacity-25")}
              d={b.d}
              fill={lit?.includes(i) ? "#46E3C8" : fill}
              style={{ "--i": i } as React.CSSProperties}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
