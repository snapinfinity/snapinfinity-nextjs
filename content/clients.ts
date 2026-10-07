// Client logos, converted to white marks by scripts/prepare-assets.mjs.
// `scale` balances optical size between wide wordmarks and compact badges.
// The source PNGs are small; replace with SVG or larger transparent PNGs when available.

export type Client = { name: string; logo: string; width: number; height: number; scale: number };

export const clients: Client[] = [
  { name: "Laurel Garden", logo: "/images/clients/laurel-garden.png", width: 252, height: 39, scale: 0.85 },
  { name: "Early Learning Centre", logo: "/images/clients/elc.png", width: 136, height: 110, scale: 1.25 },
  { name: "Rias Engineering", logo: "/images/clients/rias-engineering.png", width: 120, height: 107, scale: 1.2 },
  { name: "Techbiz Solutions", logo: "/images/clients/techbiz.png", width: 78, height: 84, scale: 1.2 },
  { name: "Foster", logo: "/images/clients/foster.png", width: 133, height: 122, scale: 1.2 },
  { name: "Western Sayal", logo: "/images/clients/western-sayal.png", width: 220, height: 82, scale: 0.85 },
  { name: "Shaastec International", logo: "/images/clients/shaastec.png", width: 259, height: 92, scale: 1.2 },
  { name: "CSCPlay", logo: "/images/clients/cscplay.png", width: 50, height: 58, scale: 1.2 },
  { name: "Freshmills", logo: "/images/clients/freshmills.png", width: 218, height: 31, scale: 0.75 },
  { name: "Insource 360 Banking", logo: "/images/clients/insource-360-banking.png", width: 256, height: 56, scale: 0.9 },
  { name: "Insource Real Estate", logo: "/images/clients/insource-real-estate.png", width: 216, height: 62, scale: 0.95 },
];
