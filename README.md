# pww-hex-template

A config-driven personal portfolio with a hexagon/geometric aesthetic, dark neon palette, and zero repeated values — built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- All content, colors, and toggles live in one file: `config/portfolio.ts`
- Dark neon default (configurable) with animated hex-grid hero background
- Hex-clipped profile photo with neon border, or monogram placeholder
- Staggered honeycomb project grid
- Neon glow hover effects on cards, buttons, and links
- Show/hide any section without deleting data — nav updates automatically
- Configurable color palette (both light and dark mode tokens)
- Light/dark theme toggle with localStorage persistence and no flash on load
- Boxy geometric UI: sharp corners, monospace labels, angular hero cut
- Responsive — collapses gracefully to mobile

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm

## Requirements

- Node.js 20.9 or newer
- pnpm

## Quick Start

```bash
pnpm install
pnpm dev
```

Open the URL printed in your terminal (usually `http://localhost:3000`).

```bash
pnpm build   # production build
pnpm start   # run the production server
```

## Customization

Everything is in [`config/portfolio.ts`](config/portfolio.ts). You never need to edit component files.

### Identity

```ts
export const ME = {
  firstName:  'Your',
  lastName:   'Name',
  role:       'Software Engineer',
  email:      'you@example.com',
  github:     'yourusername',   // username only
  linkedin:   'yourusername',   // username only
  resumePath: '/resume.pdf',
};
```

Every URL, page title, footer link, and contact entry is derived from these fields automatically.

### Colors

```ts
export const THEME = {
  defaultMode: 'dark',  // or 'light'
  colors: {
    dark:  { bg: '#0d0d0d', primary: '#00e5ff', accent: '#ff4d6d', ... },
    light: { bg: '#f5f5f0', primary: '#2d2dff', accent: '#ff4000', ... },
  },
};
```

Changing any color token updates every element that uses it: cards, glow effects, hex photo border, nav, footer, and the OG image.

### Show/Hide Sections

```ts
export const SECTIONS = {
  experience: true,
  projects:   true,
  education:  false,  // hides section and removes it from the nav
  contact:    true,
};
```

### Section Heading Labels

```ts
export const LABELS = {
  experience: "Where I've worked",
  projects:   "Things I've built",
  education:  "Where I studied",
  contact:    "Get in touch",
};
```

### Hero Photo

Set `HERO.photo` to a path under `public/` to display your photo in a hex-clipped frame. Leave it `undefined` to show your initials as a placeholder.

```ts
export const HERO = {
  photo: '/images/photo.jpg',   // place the file at public/images/photo.jpg
  // or leave as: photo: undefined,
};
```

### Adding Your Resume

Place a PDF at `public/resume.pdf` (or the path you set in `ME.resumePath`). The "Download PDF" link in the contact section and the footer Resume link will point to it automatically.

### Experience, Projects, Education

Add or remove array entries in `EXPERIENCE`, `PROJECTS`, and `EDUCATION`. Each section renders however many items you provide.

```ts
export const PROJECTS: ProjectEntry[] = [
  {
    name:        'My Project',
    description: 'What it does.',
    tech:        ['Next.js', 'TypeScript'],
    github:      'https://github.com/you/project',  // optional
    live:        'https://project.com',              // optional
    featured:    true,   // adds accent-colored border to the card
  },
];
```

### Fonts

Fonts are hardcoded in [`app/layout.tsx`](app/layout.tsx) (a Next.js constraint — font names must be compile-time strings). The template uses **DM Sans** (body) and **JetBrains Mono** (mono). To change them, swap the `DM_Sans` / `JetBrains_Mono` imports in that file.

## Project Structure

```
app/
  components/
    Header.tsx          Fixed nav with logo and theme toggle
    HeroSection.tsx     Hex grid background, name, bio, CTAs, hex photo
    ExperienceSection.tsx
    ProjectsSection.tsx Staggered honeycomb grid
    EducationSection.tsx
    ContactSection.tsx
    Footer.tsx
    ThemeToggle.tsx     Sun/moon button
  providers/
    ThemeProvider.tsx   Client-side theme context
  globals.css           All component styles (no hardcoded colors)
  layout.tsx            Injects color tokens from config; font setup; metadata
  page.tsx              Composes all sections
  opengraph-image.tsx   Auto-generated OG image
config/
  portfolio.ts          THE ONLY FILE TO EDIT
public/
  resume.pdf            Add your resume here
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |

## Deployment

Vercel is the easiest target:

1. Push to GitHub.
2. Import into Vercel.
3. Keep the default Next.js settings.
4. Deploy.

The site URL is detected automatically on Vercel — no environment variables needed. For other hosts, set `NEXT_PUBLIC_SITE_URL` in your environment.
