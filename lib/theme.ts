// Derives a full color palette from just bg, primary, and accent.
// Called by layout.tsx — never import this in client components.

export interface ColorInput {
  bg:      string; // page background
  primary: string; // brand color (links, hex photo border, glow)
  accent:  string; // highlight color (section labels, bullet markers)
}

export interface ColorTokens extends ColorInput {
  surface:    string;
  fg:         string;
  fgMuted:    string;
  fgFaint:    string;
  border:     string;
  pillBg:     string;
  pillBorder: string;
}

// ── Hex <-> RGB helpers ───────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map((c) => c + c).join('')
    : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

// Relative luminance per WCAG 2.1
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Mix bg toward white or black by `amount` (0–1)
function mix(hex: string, toward: 'white' | 'black', amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const target = toward === 'white' ? 255 : 0;
  return rgbToHex(
    r + (target - r) * amount,
    g + (target - g) * amount,
    b + (target - b) * amount,
  );
}

// Is this bg "dark" (luminance < 0.18)?
function isDark(hex: string): boolean {
  return luminance(hex) < 0.18;
}

// ── Derive full palette ───────────────────────────────────────────────

export function deriveTokens(input: ColorInput): ColorTokens {
  const dark = isDark(input.bg);

  const surface    = dark ? mix(input.bg, 'white', 0.055) : mix(input.bg, 'black', 0.04);
  const fg         = dark ? mix(input.bg, 'white', 0.94)  : mix(input.bg, 'black', 0.90);
  const fgMuted    = dark ? mix(input.bg, 'white', 0.69)  : mix(input.bg, 'black', 0.65);
  const fgFaint    = dark ? mix(input.bg, 'white', 0.36)  : mix(input.bg, 'black', 0.45);
  const border     = dark ? mix(input.bg, 'white', 0.14)  : mix(input.bg, 'black', 0.14);
  const pillBg     = dark ? mix(input.bg, 'white', 0.08)  : mix(input.bg, 'black', 0.06);
  const pillBorder = dark ? mix(input.bg, 'white', 0.20)  : mix(input.bg, 'black', 0.18);

  return {
    ...input,
    surface,
    fg,
    fgMuted,
    fgFaint,
    border,
    pillBg,
    pillBorder,
  };
}

// ── Contrast warnings ─────────────────────────────────────────────────

export function warnContrast(tokens: ColorTokens, modeName: string) {
  const checks: [string, string, string, number][] = [
    // [label, foreground, background, min ratio]
    ['fg on bg',       tokens.fg,      tokens.bg,      4.5],
    ['primary on bg',  tokens.primary, tokens.bg,      3.0],
    ['accent on bg',   tokens.accent,  tokens.bg,      3.0],
    ['fg on surface',  tokens.fg,      tokens.surface, 4.5],
  ];

  for (const [label, fg, bg, min] of checks) {
    const ratio = contrastRatio(fg, bg);
    if (ratio < min) {
      console.warn(
        `\x1b[33m[pww-hex-template] Low contrast in ${modeName} mode: ` +
        `${label} = ${ratio.toFixed(1)}:1 (min recommended: ${min}:1)\x1b[0m`
      );
    }
  }
}
