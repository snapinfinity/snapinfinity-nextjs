import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Code-drawn stand-ins for the V2 service visuals: one abstract composition per
 * service, built from the logo's rounded bars and arcs. 4:5 like the final stills.
 */
export function ServiceGlyph({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const id = `g-${slug}`;
  return (
    <svg viewBox="0 0 400 500" className={cn("h-full w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46E3C8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0B5A50" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ECF4F1" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ECF4F1" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#46E3C8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#46E3C8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-bg`} cx="0.65" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#123A34" />
          <stop offset="0.55" stopColor="#0A100F" />
          <stop offset="1" stopColor="#050807" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      <circle cx="380" cy="470" r="120" fill="#FF8A57" opacity="0.06" />
      {glyphs[slug](id)}
    </svg>
  );
}

const stroke = { stroke: "#46E3C8", strokeOpacity: 0.35, strokeWidth: 1.5 } as const;

const glyphs: Record<ServiceSlug, (id: string) => React.ReactNode> = {
  "brand-identity": (id) => (
    <g>
      <ellipse cx="200" cy="250" rx="150" ry="150" fill={`url(#${id}-glow)`} />
      <rect x="125" y="95" width="150" height="310" rx="40" fill={`url(#${id}-glass)`} {...stroke} />
      <path d="M172 240a40 40 0 1 1 28 38" fill="none" stroke="#46E3C8" strokeWidth="16" strokeLinecap="round" />
      <path d="M228 262a40 40 0 1 1-28-38" fill="none" stroke="#37AD9D" strokeWidth="16" strokeLinecap="round" />
      <rect x="300" y="150" width="18" height="60" rx="6" fill="#37AD9D" />
      <rect x="300" y="222" width="18" height="44" rx="6" fill="#16201E" stroke="#ECF4F1" strokeOpacity="0.2" />
      <rect x="300" y="278" width="18" height="30" rx="6" fill="#FF8A57" opacity="0.85" />
    </g>
  ),
  "website-development": (id) => (
    <g>
      <ellipse cx="220" cy="230" rx="170" ry="140" fill={`url(#${id}-glow)`} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 34} ${120 + i * 52})`}>
          <rect width="220" height="170" rx="18" fill={`url(#${id}-glass)`} {...stroke} />
          <rect x="16" y="16" width="56" height="8" rx="4" fill="#46E3C8" opacity={0.4 + i * 0.25} />
          <rect x="16" y="40" width="120" height="44" rx="10" fill={`url(#${id}-t)`} opacity={0.25 + i * 0.25} />
          <rect x="16" y="98" width="58" height="52" rx="10" fill="#ECF4F1" opacity="0.05" />
          <rect x="82" y="98" width="58" height="52" rx="10" fill="#ECF4F1" opacity="0.05" />
          <rect x="148" y="98" width="56" height="52" rx="10" fill="#ECF4F1" opacity="0.05" />
        </g>
      ))}
    </g>
  ),
  "app-development": (id) => (
    <g>
      <ellipse cx="200" cy="260" rx="150" ry="170" fill={`url(#${id}-glow)`} />
      <rect x="120" y="70" width="160" height="340" rx="36" fill={`url(#${id}-glass)`} {...stroke} />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}${c}`}
            x={140 + c * 64 + (r === 1 ? 14 : 0)}
            y={120 + r * 78 - (c === 1 ? 10 : 0)}
            width="54"
            height="62"
            rx="16"
            fill={`url(#${id}-t)`}
            opacity={0.35 + (r + c) * 0.15}
          />
        )),
      )}
      <rect x="176" y="380" width="48" height="6" rx="3" fill="#ECF4F1" opacity="0.25" />
    </g>
  ),
  seo: (id) => (
    <g>
      <ellipse cx="300" cy="150" rx="120" ry="150" fill={`url(#${id}-glow)`} />
      {[0, 1, 2, 3, 4].map((i) => {
        const h = 70 + i * 52;
        return (
          <rect
            key={i}
            x={70 + i * 54}
            y={420 - h}
            width="40"
            height={h}
            rx="14"
            fill={i === 4 ? "#46E3C8" : `url(#${id}-t)`}
            opacity={i === 4 ? 1 : 0.35 + i * 0.12}
          />
        );
      })}
      <rect x="305" y="40" width="2" height="150" fill="#46E3C8" opacity="0.6" />
    </g>
  ),
  "social-media-management": (id) => (
    <g>
      <ellipse cx="200" cy="250" rx="80" ry="80" fill={`url(#${id}-glow)`} />
      <ellipse cx="200" cy="250" rx="150" ry="70" fill="none" {...stroke} transform="rotate(-24 200 250)" />
      <ellipse cx="200" cy="250" rx="110" ry="160" fill="none" {...stroke} strokeOpacity="0.2" transform="rotate(18 200 250)" />
      <circle cx="200" cy="250" r="34" fill="#46E3C8" />
      <circle cx="78" cy="300" r="22" fill={`url(#${id}-glass)`} {...stroke} />
      <circle cx="320" cy="196" r="16" fill="#37AD9D" opacity="0.8" />
      <rect x="230" y="96" width="70" height="30" rx="15" fill={`url(#${id}-glass)`} {...stroke} />
      <rect x="110" y="380" width="56" height="26" rx="13" fill="#FF8A57" opacity="0.7" />
    </g>
  ),
  "digital-marketing": (id) => (
    <g>
      <ellipse cx="200" cy="250" rx="160" ry="160" fill={`url(#${id}-glow)`} />
      {[130, 96, 62].map((r, i) => (
        <circle key={r} cx="200" cy="250" r={r} fill="none" stroke="#46E3C8" strokeOpacity={0.2 + i * 0.25} strokeWidth={10 - i * 2} />
      ))}
      <circle cx="200" cy="250" r="20" fill="#46E3C8" />
      <rect x="0" y="248" width="400" height="4" fill="#46E3C8" opacity="0.5" />
      {[-14, 0, 14].map((a) => (
        <rect key={a} x="220" y="249" width="180" height="2" fill="#46E3C8" opacity="0.4" transform={`rotate(${a} 220 250)`} />
      ))}
    </g>
  ),
};
