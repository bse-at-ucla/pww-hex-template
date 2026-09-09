import { ImageResponse } from 'next/og';
import { PERSON, SITE } from '@/config/portfolio';
import { THEME } from '@/config/design';
import { deriveTokens } from '@/lib/theme';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const { bg, fg, primary, accent } = deriveTokens(THEME.colors.dark);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: bg,
          color: fg,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent rule above role — geometric motif */}
        <div
          style={{
            display: 'flex',
            width: 48,
            height: 4,
            background: accent,
            marginBottom: 20,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: accent,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          {PERSON.role}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 800,
            color: primary,
            letterSpacing: -2,
          }}
        >
          {PERSON.fullName}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: fg,
            opacity: 0.6,
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          {SITE.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
