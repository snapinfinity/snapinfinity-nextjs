import { getService, services } from "@/content/services";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Snap Infinity service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOg({ eyebrow: "Snap Infinity · Services", title: service?.name ?? "Services" });
}
