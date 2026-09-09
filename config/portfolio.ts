/* ─────────────────────────────────────────────────────────────────────
   PORTFOLIO CONFIG — your personal content.
   Visual settings (colors, animations, section labels) → design.ts

   Edit these sections:
       ME               your name, email, GitHub/LinkedIn, resume path
       HERO             greeting, taglines, bio, photo, CTA buttons
       EDUCATION        school, degree, courses
       EXPERIENCE       jobs and internships
       CONTACT_BLURB    short paragraph above your contact links
       PROJECTS         things you've built
   ───────────────────────────────────────────────────────────────────── */

import { SECTIONS, LABELS } from './design';

// ── 1. Your info — fill this in first ────────────────────────────────
// Every URL, page title, and footer link is built from these values.
export const ME = {
  firstName: 'Your',
  lastName: 'Name',
  role: 'Software Engineer',  // shown in hero and page title
  email: 'you@example.com',
  github: 'yourusername',       // GitHub username only — no URL
  linkedin: 'yourusername',       // LinkedIn username only — no URL
  resumePath: '/resume.pdf',        // path under public/ — see README.md
};

// ─────────────────────────────────────────────────────────────────────
// Everything below is derived automatically — no need to edit.
// ─────────────────────────────────────────────────────────────────────

const GITHUB_URL = `https://github.com/${ME.github}`;
const LINKEDIN_URL = `https://linkedin.com/in/${ME.linkedin}`;
const EMAIL_HREF = `mailto:${ME.email}`;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

// ── Who you are ───────────────────────────────────────────────────────
export const PERSON = {
  firstName: ME.firstName,
  lastName: ME.lastName,
  fullName: `${ME.firstName} ${ME.lastName}`,
  role: ME.role,
};

// ── Site metadata ─────────────────────────────────────────────────────
export const SITE = {
  url: SITE_URL,
  title: `${PERSON.fullName} | ${PERSON.role}`,
  titleSuffix: `| ${PERSON.fullName}`,
  description: `Personal portfolio of ${PERSON.fullName}, a ${PERSON.role}.`,
};

// ── Navigation ────────────────────────────────────────────────────────
// Built automatically from SECTIONS in design.ts — hidden sections
// are excluded from the nav without any extra edits here.
export const NAV_LINKS = [
  SECTIONS.experience && { label: LABELS.experience.nav, href: '#experience' },
  SECTIONS.projects && { label: LABELS.projects.nav, href: '#projects' },
  SECTIONS.contact && { label: LABELS.contact.nav, href: '#contact' },
].filter(Boolean) as { label: string; href: string }[];

// ── 2. Hero ───────────────────────────────────────────────────────────
export const HERO = {
  greeting: "Hi, I'm",
  // Rotate through multiple taglines with a typing effect (configure in design.ts)
  taglines: [
    'Software Engineer',
    'Student at UCLA',
    'Builder of Things',
  ] as string[],
  bio: "I'm a software engineer who builds things for the web, from clean UIs to scalable backends. I care about craft, speed, and shipping work that lasts.",
  // Set to '/photo.jpg' to show your photo (place file at public/photo.jpg).
  // undefined shows your initials. To hide the frame entirely, set showPhoto: false in design.ts.
  photo: undefined as string | undefined,
  ctas: [
    { label: 'View my projects →', href: '#projects', primary: true },
    { label: 'Get in touch', href: '#contact', primary: false },
  ],
};

// ── 3. Education ──────────────────────────────────────────────────────
// Shown inside the Experience section (order/visibility in design.ts).
export interface EducationEntry {
  school: string;
  degree: string;
  minor?: string;
  gpa?: string;
  graduation: string;
  courses: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    school: 'University of California, Los Angeles',
    degree: 'B.S. Computer Science',
    minor: 'Statistics',
    gpa: '3.82',
    graduation: 'June 2026',
    courses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Machine Learning',
      'Probability and Statistics',
      'Software Engineering',
    ],
  },
];

// ── 4. Experience ─────────────────────────────────────────────────────
// One entry per job/internship, most recent first.
export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Acme Corporation',
    role: 'Software Engineer Intern',
    location: 'San Francisco, CA',
    start: 'Jun 2025',
    end: 'Aug 2025',
    bullets: [
      'Built a real-time dashboard in React and TypeScript, reducing incident response time by 40%.',
      'Designed and deployed three REST API endpoints serving 50k requests per day.',
      'Collaborated with the design team to ship a redesigned onboarding flow that improved conversion by 18%.',
    ],
    tech: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'UCLA Engineering',
    role: 'Teaching Assistant, CS 33',
    location: 'Los Angeles, CA',
    start: 'Sep 2024',
    end: 'Dec 2024',
    bullets: [
      'Led weekly discussion sections for 40 students covering systems programming in C.',
      'Held office hours to assist students with debugging and conceptual questions.',
      'Wrote and graded three programming assignments and two midterms.',
    ],
    tech: ['C', 'x86 Assembly', 'Linux'],
  },
];

// ── 5. Contact blurb ──────────────────────────────────────────────────
// Short paragraph shown above your contact links.
export const CONTACT_BLURB = "I'm actively looking for internships and new grad roles. If you're working on something interesting or just want to chat, my inbox is always open.";

// ── 6. Projects ───────────────────────────────────────────────────────
// `featured: true` highlights the card with an accent-colored border.
export interface ProjectEntry {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export const PROJECTS: ProjectEntry[] = [
  {
    name: 'StudySync',
    description: 'A collaborative study-planning app that lets students share notes, schedule group sessions, and track progress in real time.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github: `${GITHUB_URL}/studysync`,
    live: 'https://studysync.app',
    featured: true,
  },
  {
    name: 'BruinBot',
    description: 'A Discord bot surfacing real-time UCLA dining menus, library room availability, and bus schedules for 2,000+ active users.',
    tech: ['Node.js', 'Discord.js', 'REST APIs', 'Cron'],
    github: `${GITHUB_URL}/bruinbot`,
    featured: true,
  },
  {
    name: 'PocketPortfolio',
    description: 'A mobile-first stock portfolio tracker with custom alerts and a clean chart-based UI, built during a 24-hour hackathon.',
    tech: ['React Native', 'Expo', 'Recharts', 'Firebase'],
    github: `${GITHUB_URL}/pocketportfolio`,
    live: 'https://pocketportfolio.dev',
    featured: false,
  },
  {
    name: 'AutoGrade',
    description: 'A CLI grading tool that runs student Python submissions against test suites in isolated Docker containers and produces structured reports.',
    tech: ['Python', 'Docker', 'Bash', 'SQLite'],
    github: `${GITHUB_URL}/autograde`,
    featured: false,
  },
];

// ── Social links ──────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Email', href: EMAIL_HREF },
];

// ── Contact ───────────────────────────────────────────────────────────
export const CONTACT = {
  email: ME.email,
  blurb: CONTACT_BLURB,
  links: [
    { label: 'Email', href: EMAIL_HREF, display: ME.email },
    { label: 'GitHub', href: GITHUB_URL, display: `github.com/${ME.github}` },
    { label: 'LinkedIn', href: LINKEDIN_URL, display: `linkedin.com/in/${ME.linkedin}` },
    { label: 'Resume', href: ME.resumePath, display: 'Download PDF' },
  ],
};

// ── Footer ────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: `${PERSON.role} building things for the web.`,
  columns: [
    {
      heading: 'Portfolio',
      links: [
        SECTIONS.experience && { label: LABELS.experience.nav, href: '#experience' },
        SECTIONS.projects && { label: LABELS.projects.nav, href: '#projects' },
        SECTIONS.contact && { label: LABELS.contact.nav, href: '#contact' },
      ].filter(Boolean) as { label: string; href: string }[],
    },
    {
      heading: 'Connect',
      links: [
        { label: 'GitHub', href: GITHUB_URL },
        { label: 'LinkedIn', href: LINKEDIN_URL },
        { label: 'Email', href: EMAIL_HREF },
        { label: 'Resume', href: ME.resumePath },
      ],
    },
  ],
};
