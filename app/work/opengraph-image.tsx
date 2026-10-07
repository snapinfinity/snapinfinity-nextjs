import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Snap Infinity work: websites, apps and campaigns";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Selected work", title: "Brands, apps and platforms", accent: "we’ve built." });
}
