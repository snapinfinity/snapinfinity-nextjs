import { cn } from "@/lib/utils";
import { MARK_VIEWBOX, WORDMARK_VIEWBOX, markArcs, markBars, wordmarkInfinity, wordmarkSnap } from "./logo-paths";

type SvgProps = React.SVGProps<SVGSVGElement>;

export function Mark({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {markArcs.map((d, i) => (
        <path key={`a${i}`} d={d} />
      ))}
      {markBars.map((b, i) => (
        <path key={`b${i}`} d={b.d} />
      ))}
    </svg>
  );
}

export function Wordmark({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={wordmarkSnap} />
      <path d={wordmarkInfinity} />
    </svg>
  );
}

/** Horizontal lockup: teal mark + light wordmark, sized by height (e.g. h-7). */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.32em]", className)}>
      <Mark data-nav-mark="" className={cn("h-full w-auto text-teal transition-opacity duration-300", markClassName)} />
      <Wordmark className="h-[92%] w-auto text-fg" />
      <span className="sr-only">Snap Infinity</span>
    </span>
  );
}
