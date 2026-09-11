# Supplied hero integration

The supplied component is in `components/ui/prisma-hero.tsx`. `components/demo.tsx` preserves the requested standalone demo. `Hero.tsx` renders the component above the existing curriculum.

The original JSX layout, Tailwind classes, remote video URL, asterisk, gradient, and animation timings are unchanged. Text replacements are:

- Prisma → Drydock
- Navigation → Sri Lanka / Curriculum / Hackathon / Fees / Apply
- Description → Drydock is an eight-week AI foundry by Masai. Build one working product from a Sri Lanka residency, through six weeks online, to a 36-hour hackathon and demo day in Bengaluru.
- Join the lab → Apply to Drydock

Integration-only additions: the Next.js client directive, an optional `applyHref` prop, real section links, and a button handler pointing to the configured application destination. The existing Plus Jakarta Sans / Manrope / IBM Plex Mono typography configuration continues to apply.

TypeScript, Tailwind 3, Lucide React, and Framer Motion were already installed. No dependency installation was needed. The `@/*` import alias is configured in TypeScript and Vite. Shared components live under `components/ui`, keeping imports compatible with the requested shadcn folder convention. This particular component does not depend on a shadcn primitive or provider, so a separate shadcn CLI initialization is unnecessary for it.

Global preview styles are in `preview/style.css`, font variables in `Typography.css`, and Tailwind configuration in `tailwind.config.js`. Tailwind scans `components/**/*.{ts,tsx}` and defines the previously missing `primary` color as `#E1E0CC`, matching the component's explicit color values. The snippet references a `noise-overlay` class but supplies no definition; no new texture has been invented.

The application target remains the local preview destination until the real form URL is supplied. The original video remains remote, as provided in the component.

## Updated site palette

The subsequent color-reference request replaces the cream/slate theme with electric blue `#174BFF`, navy `#080F2D`, black `#000000`, cool white `#E9EDFF`, and body text `#C5CCE3`. `Palette.css` holds the site tokens and blue-to-black backgrounds. The original video is visually tinted with grayscale and a blue overlay; its source and the hero layout remain unchanged. The curriculum's four chapter/layer colors and 3D materials remain preserved.
