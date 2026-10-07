// Single source of truth for business details. Everything here comes from the
// previous site; fields set to null are still to be provided by Snap Infinity.

export const site = {
  name: "Snap Infinity",
  alternateName: "SnapInfinity",
  legalName: "Snap Infinity Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.snapinfinity.com",
  tagline: "Infinite ideas. Powerful results.",
  motto: "Beyond Digital Boundaries",
  description:
    "Snap Infinity is a digital studio in Kerala designing brands, building websites and apps, and growing them with SEO, social media and digital marketing for businesses across Kerala and the GCC.",
  email: "info@snapinfinity.com",
  // TODO: provide a phone / WhatsApp number to show on Contact and in structured data.
  phone: null as string | null,
  // TODO: provide the office address to enable LocalBusiness structured data.
  address: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  },
  regions: ["Kerala", "GCC"],
  areaServed: [
    "Kerala, India",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/snap_infinity_/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/snap-infinity/" },
    { label: "Facebook", href: "https://www.facebook.com/snapinfinityofficial" },
  ],
  privacyEffectiveDate: "1 August 2023",
} as const;

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
