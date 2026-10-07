# Snap Infinity website

The rebuilt snapinfinity.com: Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
It replaces the Vite/React site in `../snapinfinity-react`, which was used only as a
source of content, assets and brand.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Node 20.9+ is required.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, `https://www.snapinfinity.com` |
| `NEXT_PUBLIC_FIREBASE_*` | Contact form: saves enquiries to the Firestore `request` collection |
| `NEXT_PUBLIC_EMAILJS_*` | Contact form: email notification via EmailJS |

The contact form keeps the old site's pipeline and document shape
(`name, phone, email, message, connectWith, createdOn, isSolved, isViewed, docId`),
so the existing inbox keeps working. Firebase and EmailJS load only when someone
submits. A submission counts as delivered if either channel succeeds.

Set the same variables in Vercel (Project → Settings → Environment Variables).

## Where things live

```
app/                 routes, metadata, sitemap, robots, manifest, share images
components/
  brand/             Logo, InfinityMark (animated SVG), Aurora, ServiceGlyph/ServiceVisual
  layout/            SiteHeader, MobileMenu, SiteFooter
  motion/            RevealObserver, SplitWords, ScrollLitText, DockingMark, PinnedGallery, ...
  sections/          page sections (home/*, PageHero, ClosingCta, Faq, LegalPage)
  ui/ forms/ work/ services/ about/ seo/
content/             all copy and data: site, services, projects, clients, team, media
lib/                 seo (metadata), schema (JSON-LD), og (share images), gsap (lazy loader)
scripts/             prepare-assets.mjs: rebuilds /public images from the old repo
assets/fonts/        Anek Latin TTFs used only for generated share images
```

### Editing content

Everything a visitor reads comes from `content/*.ts`. Pages, the sitemap, structured
data and share images all read from the same files:

- **New project**: add it to `content/projects.ts` with its image in `public/images/work/`.
  Give it a `caseStudy` and a `/work/[slug]` page is generated automatically.
- **Business details**: `content/site.ts`. Setting `phone` shows it on Contact; setting
  `address` switches the structured data to a local `ProfessionalService`.
- **Team**: `content/team.ts`. Members with `photo: null` show a monogram.

### Replacing placeholder visuals (AI assets)

Every AI-generated visual from the proposal has one slot in `content/media.ts`:

| Slot | Asset | Until it arrives |
| --- | --- | --- |
| `hero.videoDesktop` / `hero.videoMobile` | V1 / V1b hero loops | the old site's dark 3D-bars image, teal-graded |
| `services[slug]` | V2 service stills (4:5) | code-drawn glyphs (`ServiceGlyph`) |
| `aboutHero` | V3 About still | the old site's dark silk image, teal-graded |
| `ctaLoop` | V4 ambient loop (optional) | CSS aurora |

Drop the file into `public/`, put its path in the slot, done. The hero video only plays
on screens with motion allowed and data saver off, and pauses when off screen.

## Design system

Tokens live in `app/globals.css` (`@theme`): teal-leaning neutrals (`void`, `abyss`,
`surface`), brand `teal` from the logo, `teal-glow` for light and focus, and `ember` as a
rare warm counter-light. One typeface, Anek Latin, using its width axis: wide and heavy
for display (`text-display`, `text-h1`, `text-h2`, `font-wide`), light and spaced for
labels (`text-label`), condensed for numerals (`text-num`).

## Motion

- **Reveals** are CSS. Server components opt in with `data-reveal="up|fade|clip|words"`;
  `RevealObserver` marks what's on screen. Without JavaScript everything stays visible.
- **Scroll scenes** (logo docking into the nav, pinned work gallery, magnetic buttons,
  hover previews, Lenis smooth scroll) use GSAP, loaded lazily through `lib/gsap.ts` and
  only on desktop pointers. Phones never download it.
- `prefers-reduced-motion` turns every animation off and unpins scenes.

## SEO

Server-rendered pages with per-page titles, descriptions, canonicals, Open Graph and X
cards (`lib/seo.ts`); JSON-LD for Organization, WebSite, Service, BreadcrumbList,
CreativeWork, FAQPage and ContactPage (`lib/schema.ts`); generated sitemap, robots and
manifest; a branded share image for every route. `/clients` and `/tnc` redirect
permanently to `/work` and `/terms`.

## Assets

`scripts/prepare-assets.mjs` regenerates `public/images`, the app icons and the favicon
from the old repo (`LEGACY_DIR`, default `../snapinfinity-react/public/images`): client
logos converted to white marks, portraits cropped to 4:5, studio photos resized, and the
backdrops graded. The logo SVG paths in `components/brand/logo-paths.ts` were traced from
the original PNGs; swap in the official vector files when available.
