// Slots for the AI-generated visuals described in the proposal (V1–V4).
// Each slot is null until the asset arrives; components fall back to code-drawn
// placeholders. Dropping a file into /public and setting its path here is all it takes.

export const media = {
  hero: {
    /** V1: 1920×1080 MP4 (H.264) under 4 MB */
    videoDesktop: null as string | null,
    /** V1: optional WebM (VP9) of the same loop */
    videoDesktopWebm: null as string | null,
    /** V1b: 1080×1920 MP4 under 2.5 MB */
    videoMobile: null as string | null,
    /** Poster. Until V1 arrives this is the dark 3D-bars image from the old hero. */
    poster: "/images/placeholders/hero-bars.jpg",
  },
  /** V2: 2400×3000 stills, one per service. */
  services: {
    "brand-identity": null as string | null,
    "website-development": null as string | null,
    "app-development": null as string | null,
    seo: null as string | null,
    "social-media-management": null as string | null,
    "digital-marketing": null as string | null,
  },
  /** V3: 3360×1440 still. Until it arrives, the dark silk image from the old About page. */
  aboutHero: "/images/placeholders/silk.jpg",
  aboutHeroIsPlaceholder: true,
  /** V4 (optional): ambient loop behind closing calls to action. */
  ctaLoop: null as string | null,
};
