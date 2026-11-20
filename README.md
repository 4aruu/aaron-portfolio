# The Systems Atlas

The portfolio of **Aaron Jacob Sunil**, a cloud and AI engineer based in Kuwait, built as an editorial atlas rather than a template. Each project is a *plate*, a drawing of a real system with notes in the margin. You can read it in order or jump straight to any plate from the index.

## What's inside

| Plate | Title | What it shows |
|---|---|---|
| 00 | Frontispiece | A cube that comes apart into the page as you scroll |
| I | The four territories | AI systems, cloud architecture, software engineering, experiments |
| II | A web tier that survives | The AWS internship: ALB and Auto Scaling across two Availability Zones |
| III | The route of a question | Lumira, a voice assistant that answers only from an exhibitor's documents |
| IV | 231, a specimen sheet | NutriSwap and its fail-closed allergen rule |
| V | Under two minutes | InfoBot's timetable generator, two weeks of scheduling cut to under two minutes |
| VI | The route | Everything from school to SAA-C03, in order |
| VII | Gazetteer | An index of tools, each linked to the plates that use it |
| VIII | Colophon | Contact, and how the atlas was made |

Lumira, NutriSwap, InfoBot, TaskIT and the pharmacy system each have a case study at `/projects/<id>`. The first three start with why the project exists and what's different about it, then cover how it works.

## Principles

- **Every claim is true.** Projects, figures and dates come from the repositories and the résumé. No invented metrics.
- **The page works without the motion.** All content is rendered on the server. With reduced motion turned on, or with JavaScript off, there's no cube and no animation, and nothing is missing.
- **Accessible by default.** Skip links, a keyboard-operable index dialog, visible focus, 44px touch targets and AA contrast in both themes.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript and Tailwind CSS 3, with design tokens as CSS variables
- [GSAP](https://gsap.com) with ScrollTrigger, loaded only in small client components
- Type: Young Serif, Schibsted Grotesk and Martian Mono, self-hosted through Fontsource
- A CSS 3D cube for the opening; no WebGL

## Running it

Requires Node.js 20 or later.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Where things live

```
src/
  app/                    routes, layout and globals.css (tokens, Day and Night themes)
  components/atlas/
    plates/               Plate00 to Plate08, one per homepage section
    figures/              the drawings: territory map, AWS diagram, week grid
    intro/                the opening cube (geometry and scroll timeline)
    motion/               scroll-driven reveals
    gazetteer/, colophon/ the tool index, copy-address and replay controls
  components/ProjectDetail.tsx   the case-study layout
  data/                   projects, profile, plates, territories, gazetteer
```

The content lives in `src/data/`. To change a project, edit `projects.ts`: the plates and the case studies both read from it.

## Contact

aaronjacobsunil@gmail.com · [GitHub](https://github.com/4aruu) · [LinkedIn](https://www.linkedin.com/in/aaron-jacob-sunil)

© 2026 Aaron Jacob Sunil
