import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About Snap Infinity";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About the studio", title: "That’s", accent: "Snap Infinity." });
}
