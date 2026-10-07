"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Props = { desktop: string | null; desktopWebm?: string | null; mobile: string | null; poster: string };
type Mode = "none" | "mobile" | "desktop";

const queries = ["(prefers-reduced-motion: reduce)", "(max-width: 767px)"];

function subscribe(onChange: () => void) {
  const lists = queries.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getMode(): Mode {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData || window.matchMedia(queries[0]).matches) return "none";
  return window.matchMedia(queries[1]).matches ? "mobile" : "desktop";
}

/**
 * Plays the hero loop only when there is a file for this screen size, the user
 * allows motion, and data saver is off. Otherwise the poster image beneath shows.
 * Pauses when scrolled out of view.
 */
export function HeroVideo({ desktop, desktopWebm, mobile, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const mode = useSyncExternalStore(subscribe, getMode, () => "none" as Mode);
  const mp4 = mode === "desktop" ? desktop : mode === "mobile" ? mobile : null;
  const webm = mode === "desktop" ? desktopWebm : null;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [mp4]);

  if (!mp4) return null;
  return (
    <video
      key={mp4}
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
