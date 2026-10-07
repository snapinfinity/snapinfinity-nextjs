import Link from "next/link";
import { Aurora } from "@/components/brand/Aurora";
import { SplitWords, type Segment } from "@/components/motion/SplitWords";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" data-reveal="fade">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-3">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-fg-2">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-fg">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Props = {
  eyebrow: string;
  title: Segment[] | string;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

/** Opening block for inner pages: breadcrumbs, eyebrow, one H1, lead, optional aside. */
export function PageHero({ eyebrow, title, lead, crumbs, aside, children, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <Aurora className="-z-10" intensity={0.75} />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-void to-transparent" />
      <div className="container-site pb-16 pt-32 md:pb-24 md:pt-44">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cn("mt-10 grid gap-12", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn("flex flex-col gap-7", aside && "lg:col-span-7")}>
            <div data-reveal="fade">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 data-reveal="words" className="text-h1 max-w-[16ch]">
              <SplitWords segments={title} />
            </h1>
            {lead && (
              <div data-reveal="up" style={{ "--reveal-delay": 160 } as React.CSSProperties} className="text-lead max-w-[54ch] text-fg-2">
                {lead}
              </div>
            )}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
