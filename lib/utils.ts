import { site } from "@/content/site";

type ClassValue = string | number | bigint | boolean | null | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter((c) => typeof c === "string" && c).join(" ");
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
