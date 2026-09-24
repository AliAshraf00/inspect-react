# Inspection — React Rebuild

React + Vite + Tailwind rebuild of the "انسبكشن / Inspection" landing page.
Only the Home page exists for now — folder structure is ready for more pages/routes.

## Stack

- **Vite + React** (JSX, no TypeScript)
- **Tailwind CSS** — all styling, except the handful of rules that need real CSS
  (3D flip-card perspective/backface-visibility) in `src/index.css`
- **react-router-dom** — routing shell (`/` → Home for now)
- **react-i18next / i18next** — full AR/EN translations, auto RTL↔LTR switching
  (toggle button in the header)
- **framer-motion** — replaces all the original vanilla-JS animation (scroll reveals,
  hero crossfade, tilt-on-hover, FAQ accordion, mobile drawer)
- **react-fast-marquee** — the top ticker bar
- **react-countup** — the animated stats counters
- **lucide-react** — icon set (service/pillar icons are still hand-drawn custom SVGs
  to match the original exactly — see `src/components/icons/`)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
```

## Replacing the images

**No real images were available when this was built** — every image path is filled
with a placeholder (solid color + label) generated locally. Drop your real files
into `public/images/` using these exact names and everything picks them up
automatically:

| File                          | Used for                                   |
|--------------------------------|---------------------------------------------|
| `logo.png`                    | Header + footer logo                        |
| `hero-1.jpeg` … `hero-6.jpeg`  | Rotating hero background (Ken Burns slides)  |
| `sector-residential.jpeg`     | Sectors grid — Residential                   |
| `sector-commercial.jpeg`      | Sectors grid — Commercial                    |
| `sector-industrial.jpeg`      | Sectors grid — Industrial                    |
| `sector-government.jpeg`      | Sectors grid — Government                    |
| `blog-featured.jpeg`          | Featured blog article thumbnail              |
| `faq-visual.jpeg`             | FAQ section side image                       |

## i18n

Translation strings live in `src/i18n/locales/ar.json` and `en.json`. Add a new
language by dropping another `xx.json` file there and registering it in
`src/i18n/index.js`.

## Folder structure

```
src/
  components/
    icons/       custom hand-drawn SVG icons (services, pillars, blueprint art)
    layout/      Header, MobileDrawer, Footer, Ticker, ScrollProgress
    sections/    one component per homepage section
    ui/          Button, Reveal (scroll-in wrapper), TiltCard, SectionHead
  hooks/         useScrollSpy
  i18n/          i18next setup + locale JSON files
  pages/         Home.jsx (add more page files + routes in App.jsx as needed)
  App.jsx        layout shell + <Routes>
  main.jsx       entry point
```
