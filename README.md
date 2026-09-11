# AI Product Engineer website

Masai's AI Product Engineer landing page, built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and React Three Fiber.

## Run locally

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The build is written to `dist/` for static hosting.

## Project structure

- `Hero.tsx`: page composition and curriculum scroll behavior.
- `components/ui/`: hero animation, admissions timeline, faculty, fees, and FAQ.
- `FoundryScene.tsx`: interactive 3D curriculum illustration.
- `public/`: local image and video assets.
- `preview/main.tsx`: application entry point.

## Application destination

Application CTAs currently point to the local `#application` preview section. Set `applyHref` in `preview/main.tsx` to the real application URL before launch. This website does not collect payments.

The current hero uses a still image with animated SVG nodes, camera transforms, and atmospheric layers; the person is not video-animated. Earlier visual explorations are retained in the repository.
