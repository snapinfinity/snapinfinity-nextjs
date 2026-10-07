import Image from "next/image";
import { media } from "@/content/media";
import type { ServiceSlug } from "@/content/services";
import { ServiceGlyph } from "./ServiceGlyph";

/** The V2 still for a service when supplied, otherwise its code-drawn glyph. Fills its parent. */
export function ServiceVisual({ slug, sizes = "320px", priority }: { slug: ServiceSlug; sizes?: string; priority?: boolean }) {
  const src = media.services[slug];
  return src ? (
    <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
  ) : (
    <ServiceGlyph slug={slug} />
  );
}
