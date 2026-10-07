import { cn } from "@/lib/utils";

/**
 * Layered gradient lighting. Teal dominates; ember is a faint warm rim, the
 * "teal and orange" film grade. Only transform animates, so it stays on the compositor.
 * The top edge is anchored in viewport units so a section growing (e.g. on font swap)
 * never moves it, which would count as a layout shift.
 */
export function Aurora({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -inset-x-[20%] -top-[15vh] -bottom-[20%] md:animate-aurora motion-reduce:animate-none"
        style={{
          opacity: intensity,
          background:
            "radial-gradient(42% 48% at 72% 32%, rgb(55 173 157 / 0.32), transparent 70%), radial-gradient(30% 36% at 18% 12%, rgb(11 90 80 / 0.55), transparent 70%), radial-gradient(26% 30% at 92% 88%, rgb(255 138 87 / 0.14), transparent 70%)",
        }}
      />
    </div>
  );
}
