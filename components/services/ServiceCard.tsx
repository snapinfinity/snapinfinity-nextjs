import Link from "next/link";
import { ServiceVisual } from "@/components/brand/ServiceVisual";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

/** Service summary card. `wide` lays it out horizontally for pillars with a single service. */
export function ServiceCard({ service, wide }: { service: Service; wide?: boolean }) {
  return (
    <article className={cn("spotlight glass group relative flex w-full flex-col overflow-hidden rounded-lg", wide && "md:grid md:grid-cols-12")}>
      <div className={cn("relative overflow-hidden border-line", wide ? "aspect-[5/4] border-b md:col-span-5 md:aspect-auto md:min-h-[420px] md:border-b-0 md:border-r" : "aspect-[5/4] border-b")}>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
          <ServiceVisual slug={service.slug} sizes={wide ? "(min-width: 768px) 40vw, 90vw" : "(min-width: 1024px) 30vw, 90vw"} />
        </div>
      </div>
      <div className={cn("flex flex-1 flex-col gap-4 p-7", wide && "md:col-span-7 md:justify-center md:gap-6 md:p-12")}>
        <h3 className={wide ? "font-wide text-[clamp(1.75rem,1.2rem+1.8vw,3rem)] font-[650] leading-none tracking-[-0.025em]" : "text-h3"}>
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {service.name}
          </Link>
        </h3>
        <p className={cn("text-fg-2", wide && "text-lead")}>{service.promise}</p>
        <ul className={cn("bar-list mt-2 flex flex-col gap-2 text-[0.95rem] text-fg-2", wide && "sm:grid sm:grid-cols-2 sm:gap-x-8")}>
          {service.deliverables.slice(0, wide ? 6 : 3).map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-teal-glow md:mt-4">
          View service
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
