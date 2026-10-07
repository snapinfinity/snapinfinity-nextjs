@AGENTS.md

# Project notes

- Copy and data live in `content/*.ts`. Don't hard-code business facts in components, and
  don't invent claims, numbers, clients or testimonials: fields that are unknown stay `null`.
- Style through the tokens in `app/globals.css` (`void`, `surface`, `fg-2`, `teal`, `ember`...)
  and the type utilities (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-label`,
  `text-num`, `font-wide`). Anek Latin is the only typeface.
- Server components by default. Animate with `data-reveal` attributes first; reach for GSAP
  only through `useGsap` in `lib/gsap.ts` (lazy-loaded, gated by a media query).
- Reveal state uses data attributes (`data-in`), never classes, so client re-renders can't undo it.
- Unlayered CSS in `globals.css` beats Tailwind utilities; keep custom rules there minimal.
- Run `npx tsc --noEmit`, `npx eslint .` and `npm run build` before handing work back.
