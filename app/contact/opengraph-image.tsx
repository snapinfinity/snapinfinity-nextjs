import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Snap Infinity";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Start a project", title: "Tell us about", accent: "your project." });
}
