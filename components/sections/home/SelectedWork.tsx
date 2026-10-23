import { PinnedGallery } from "@/components/motion/PinnedGallery";
import { SplitWords, type Segment } from "@/components/motion/SplitWords";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { featuredProjects, projects } from "@/content/projects";

const title: Segment[] = ["Brands, apps and platforms", { text: "we’ve built.", className: "text-teal" }];

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-line py-20 lg:py-0">
      <div className="container-site mb-14 md:hidden">
        <SectionHeading eyebrow="Selected work" title={title} />
      </div>
      <PinnedGallery count={featuredProjects.length}>
        <div className="flex w-[60vw] shrink-0 snap-start flex-col justify-center gap-8 max-md:hidden lg:w-[34vw] lg:pr-8">
          <div data-reveal="fade">
            <Eyebrow>Selected work</Eyebrow>
          </div>
          <h2 id="work-title" data-reveal="words" className="text-h2 max-w-[12ch]">
            <SplitWords segments={title} />
          </h2>
          <p data-reveal="up" className="max-w-[38ch] text-fg-2">
            Websites, dashboards, mobile apps and social campaigns. A few favourites from the portfolio.
          </p>
          <div data-reveal="up">
            <ButtonLink href="/work" variant="ghost">
              All {projects.length} projects
            </ButtonLink>
          </div>
        </div>
        {featuredProjects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            parallax
            className="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(26vw,calc((100svh-15rem)*0.687))]"
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 72vw"
          />
        ))}
        <div aria-hidden="true" className="w-px shrink-0 lg:w-[8vw]" />
      </PinnedGallery>
    </section>
  );
}
