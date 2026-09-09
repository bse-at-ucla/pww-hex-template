/* ─────────────────────────────────────────────────────────────────────
   DESIGN CONFIG — Visual settings for the website.
   Edit this file to change colors, layout, animations, and section
   labels. Personal content (name, projects, experience) lives in
   portfolio.ts.

   Fonts: change them in app/layout.tsx (search "Fonts — change them here").
   Next.js requires font names to be compile-time string literals, so they
   can't live here — but a step-by-step guide is waiting for you there.
   ───────────────────────────────────────────────────────────────────── */

// ── Theme ─────────────────────────────────────────────────────────────
// Only set bg, primary, and accent — all other colors (surface, text,
// borders, pills) are derived automatically. A warning is printed at
// build time if any color combination has poor contrast.
export const THEME = {
  // Change to 'light' to default to light mode on first visit
  defaultMode: 'dark' as 'dark' | 'light',
  // Set to true to hide the theme toggle and lock the site to defaultMode
  disableToggle: false,
  // Browser-level zoom for the whole site (1 = default, 1.25 = 25% bigger)
  scale: 1.25,
  colors: {
    light: {
      bg: '#f5f5f0',
      primary: '#2d2dff',
      accent: '#ff4000',
    },
    dark: {
      bg: '#0d0d0d',
      primary: '#00e5ff',
      accent: '#ff4d6d',
    },
  },
};

// ── Hero design ───────────────────────────────────────────────────────
export const HERO_DESIGN = {
  // showPhoto: false removes the hex frame entirely (no initials, no image)
  showPhoto: true,
  // Typing animation for the tagline.
  //   enabled:     false shows the first tagline as plain static text
  //   typeSpeed:   ms per character typed   (lower = faster, default 65)
  //   deleteSpeed: ms per character deleted (lower = faster, default 35)
  //   pauseAfter:  ms to hold before deleting (default 1800)
  typing: {
    enabled: true,
    typeSpeed: 65,
    deleteSpeed: 35,
    pauseAfter: 1800,
  },
  // Floating hex particle animation in the hero background.
  //   enabled:   false to turn off entirely
  //   direction: 'up' | 'down' | 'left' | 'right'
  particles: {
    enabled: true,
    direction: 'down' as 'up' | 'down' | 'left' | 'right',
  },
};

// ── Section visibility ────────────────────────────────────────────────
// Set any key to false to hide that section from the page and nav.
// Your data in EDUCATION, EXPERIENCE, etc. is preserved — just hidden.
export const SECTIONS = {
  experience: true,
  projects: true,
  contact: true,
  showEducation: true,   // show education block inside the Experience section
  educationFirst: false,  // set true to show education above work experience
};

// ── Section labels ────────────────────────────────────────────────────
// Each section has a `nav` label (shown in the header nav) and a
// `heading` label (shown as the large section title on the page).
// Set them to the same string if you want them to match.
export const LABELS = {
  experience: {
    nav: 'Experience',
    heading: "Where I've been",
  },
  work: "Where I've worked",   // sub-label inside the Experience section
  education: "Where I've studied",  // sub-label inside the Experience section
  projects: {
    nav: 'Projects',
    heading: "What I've built",
  },
  contact: {
    nav: 'Contact',
    heading: 'Get in touch',
  },
};
