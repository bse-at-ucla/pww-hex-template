import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { PERSON, SITE } from '@/config/portfolio';
import { THEME } from '@/config/design';
import { deriveTokens, warnContrast } from '@/lib/theme';

// ── Fonts — change them here ──────────────────────────────────────────
// next/font/google requires a compile-time string literal, so fonts can't
// live in the config file. To swap typefaces:
//   1. Find your font at fonts.google.com
//   2. Replace `DM_Sans` with your body font import (e.g. `Inter`)
//   3. Replace `JetBrains_Mono` with your mono font import (e.g. `Fira_Code`)
// Keep the variable names as-is — the rest of the site picks them up automatically.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Derive full palettes from the 3 user-supplied colors per mode,
// then emit CSS custom properties. Warns at build time on low contrast.
function buildThemeStyles() {
  const l = deriveTokens(THEME.colors.light);
  const d = deriveTokens(THEME.colors.dark);
  warnContrast(l, 'light');
  warnContrast(d, 'dark');
  return `
    :root {
      --bg:          ${l.bg};
      --surface:     ${l.surface};
      --fg:          ${l.fg};
      --fg-muted:    ${l.fgMuted};
      --fg-faint:    ${l.fgFaint};
      --border:      ${l.border};
      --primary:     ${l.primary};
      --accent:      ${l.accent};
      --pill-bg:     ${l.pillBg};
      --pill-border: ${l.pillBorder};
    }
    [data-theme="dark"] {
      --bg:          ${d.bg};
      --surface:     ${d.surface};
      --fg:          ${d.fg};
      --fg-muted:    ${d.fgMuted};
      --fg-faint:    ${d.fgFaint};
      --border:      ${d.border};
      --primary:     ${d.primary};
      --accent:      ${d.accent};
      --pill-bg:     ${d.pillBg};
      --pill-border: ${d.pillBorder};
    }
  `.trim();
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s ${SITE.titleSuffix}`,
    default:  SITE.title,
  },
  description: SITE.description,
  openGraph: {
    title:       SITE.title,
    description: SITE.description,
    url:         SITE.url,
    siteName:    PERSON.fullName,
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={THEME.defaultMode}
      className={`${dmSans.variable} ${jetbrainsMono.variable}`}
      style={THEME.scale !== 1 ? { zoom: THEME.scale } : undefined}
      suppressHydrationWarning
    >
      <head>
        {/* Inject color tokens from config/portfolio.ts as CSS custom properties */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeStyles() }} />
        {/* Prevent flash of wrong theme — reads localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME.disableToggle
              ? `document.documentElement.setAttribute('data-theme','${THEME.defaultMode}');`
              : `(function(){try{var t=localStorage.getItem('jwc-theme');document.documentElement.setAttribute('data-theme',t||'${THEME.defaultMode}');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
