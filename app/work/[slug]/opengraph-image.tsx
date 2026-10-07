import { caseStudies, getProject } from "@/content/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Snap Infinity case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({ eyebrow: "Case study", title: project?.name ?? "Case study", accent: project?.sector });
}
