import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-[0.8rem] leading-5 text-fg-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
