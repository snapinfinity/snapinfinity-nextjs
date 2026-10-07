import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "./Icons";

type Variant = "primary" | "ghost" | "quiet";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-void hover:bg-teal-glow hover:shadow-[0_0_56px_-12px_rgb(70_227_200/0.75)] focus-visible:bg-teal-glow",
  ghost: "border border-line-strong text-fg hover:border-teal hover:bg-teal/5",
  quiet: "text-fg hover:text-teal-glow",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[0.98rem] gap-3",
  lg: "min-h-14 px-7 text-lg gap-4",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className, icon = true, external }: Props) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.005em] transition-[background,box-shadow,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)] select-none",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "relative grid size-6 place-items-center overflow-hidden rounded-full",
            variant === "primary" ? "bg-void/10" : "bg-fg/5",
          )}
        >
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5" />
          <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
