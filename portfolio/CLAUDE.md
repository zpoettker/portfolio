# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173 with HMR
npm run build    # production build to dist/
npm run lint     # ESLint across all .js/.jsx files
npm run preview  # serve the production build locally
```

No test suite is configured yet.

## Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** — `vite.config.js` only has the React plugin; no path aliases
- **Tailwind CSS v4** — utility classes in JSX; avoid writing custom CSS unless Tailwind can't cover it
- **No router** — single-page, scroll-based layout

## Architecture

Entry point: `src/main.jsx` mounts `<App />` into `#root`.

`src/App.jsx` is currently the entire app — all sections live here. As the portfolio grows, extract sections into `src/components/` (e.g. `Hero.jsx`, `Projects.jsx`, `About.jsx`, `Contact.jsx`) and import them into `App.jsx`.

Static assets (images, SVGs) go in `src/assets/` and are imported directly into JSX. Files in `public/` (e.g. `public/icons.svg`) are served as-is and referenced by root-relative path in markup.

## Design Inspiration

**Reference sites / URLs:**

<!-- Add URLs here, e.g.:
- https://example-portfolio.com — like the sticky nav and project card layout
-->

**Inspiration images:**

<!-- Drop screenshot paths or image descriptions here, e.g.:
- src/assets/inspo/hero-layout.png — minimal dark hero with centered name and subtitle
-->

**Design direction:**

<!-- Summarize the overall vibe once it's decided, e.g.:
- Dark background, high contrast, monospace font for code elements, subtle hover animations
-->