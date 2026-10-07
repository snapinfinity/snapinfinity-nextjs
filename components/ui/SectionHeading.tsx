import { cn } from "@/lib/utils";
import { SplitWords, type Segment } from "@/components/motion/SplitWords";

export function Eyebrow({ children, className, index }: { children: React.ReactNode; className?: string; index?: string }) {
  return (
    <p className={cn("text-label flex items-center gap-3 text-fg-2", className)}>
      <span aria-hidden="true" className="h-3 w-1.5 rounded-[2px] bg-teal" />
      {index && <span className="text-teal-glow">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

type Props = {
  id?: string;
  eyebrow?: string;
  index?: string;
  title: Segment[] | string;
  lead?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  lead,
  as: Tag = "h2",
  size = "h2",
  align = "left",
  className,
  titleClassName,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <div data-reveal="fade">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag id={id} data-reveal="words" className={cn(size === "h1" ? "text-h1" : "text-h2", "max-w-[18ch]", titleClassName)}>
        <SplitWords segments={title} />
      </Tag>
      {lead && (
        <div data-reveal="up" style={{ "--reveal-delay": 150 } as React.CSSProperties} className="text-lead max-w-[56ch] text-fg-2">
          {lead}
        </div>
      )}
    </div>
  );
}
