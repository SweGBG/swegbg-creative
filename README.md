# SweGBG Creative

Next.js (App Router, TypeScript) landing page: sun/moon hero and CSS-animated sections.

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start   # test smoothness on the production build, not on `next dev`

Edit text, brand and links in `src/lib/site.ts`.
Photos are in `public/img/` (the hero layers are cut from your own sun and moon images).

Structure
- `src/components/Hero.tsx`  client component: eased scroll via refs and direct DOM writes (never useState for scroll values)
- `src/components/sections/` one file per animated section
- `src/styles/hero.css`, `sections.css`  all animation is plain CSS (@property, view timelines, conic borders, steps() typing)
- `src/components/Reveal.tsx`  adds `data-in` when a block scrolls into view, CSS does the rest
