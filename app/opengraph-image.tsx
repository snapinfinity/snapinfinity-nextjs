import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Snap Infinity: infinite ideas, powerful results";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Digital studio · Kerala & GCC", title: "Infinite ideas.", accent: "Powerful results." });
}
