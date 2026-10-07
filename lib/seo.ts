import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the page title as-is instead of the "%s · Snap Infinity" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/**
 * Per-page metadata with canonical URL, Open Graph and X card.
 * Share images come from the nearest opengraph-image file convention.
 */
export function pageMetadata({ title, description, path, absoluteTitle, noIndex }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      // Fallback share image; a route's own opengraph-image file takes priority.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
