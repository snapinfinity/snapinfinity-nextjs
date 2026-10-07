import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn, pad } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
  className?: string;
  sizes?: string;
  /** Adds data-parallax to the image so the pinned gallery can drift it. */
  parallax?: boolean;
  headingLevel?: "h2" | "h3";
};

/**
 * Portfolio card. When a case study exists, the heading's link stretches over the
 * whole card, so the link's name is just the project name.
 */
export function ProjectCard({ project, index, className, sizes = "(min-width: 1024px) 28vw, 80vw", parallax, headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const href = project.caseStudy ? `/work/${project.slug}` : null;

  return (
    <article id={project.slug} className={cn("group relative", className)}>
      <div className="relative aspect-[430/626] overflow-hidden rounded-lg border border-line bg-abyss">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgb(55_173_157/0.28),transparent_70%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div data-parallax={parallax ? "" : undefined} className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.name}: ${project.scope.slice(0, 2).join(", ")} by Snap Infinity`}
            fill
            sizes={sizes}
            className="object-contain transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        </div>
        {href && (
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-teal text-void transition-all duration-500 ease-[var(--ease-out-expo)] lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ArrowUpRight className="size-5" />
          </span>
        )}
      </div>
      <div className="mt-5 flex items-start gap-4">
        <span className="text-num pt-1 text-sm text-teal">{pad(index + 1)}</span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <H className="text-h3">
            {href ? (
              <Link href={href} className="rounded-sm after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-teal-glow">
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </H>
          <p className="text-[0.95rem] text-fg-2">{project.sector ?? project.scope[0]}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Scope">
            {project.scope.slice(0, 3).map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-[0.78rem] text-fg-3">
                {s}
              </li>
            ))}
            {project.scope.length > 3 && (
              <li className="rounded-full px-1 py-0.5 text-[0.78rem] text-fg-3">+{project.scope.length - 3}</li>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
}
