import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Snap Infinity services: design, develop, grow";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Services", title: "Design. Develop.", accent: "Grow." });
}
