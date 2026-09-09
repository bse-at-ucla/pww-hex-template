'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PERSON, HERO } from '@/config/portfolio';
import { HERO_DESIGN } from '@/config/design';

const initials = `${PERSON.firstName[0]}${PERSON.lastName[0]}`.toUpperCase();


// Positions along the axis perpendicular to travel direction
const SPREAD = ['5%','12%','20%','28%','35%','42%','50%','57%','64%','71%','78%','85%','91%','8%','58%'];
const DELAYS  = ['0s','2.1s','0.5s','3.8s','1.2s','4.5s','0.9s','2.7s','5.1s','1.6s','3.3s','0.3s','4.0s','6.2s','2.4s'];
const DURATIONS = ['14s','18s','12s','20s','16s','13s','19s','15s','11s','17s','21s','14s','16s','18s','22s'];
const SIZES = [28,18,36,14,22,32,16,26,20,38,12,30,24,16,34];

function hexPoints(size: number): string {
  const r = size / 2;
  const h = r * (Math.sqrt(3) / 2);
  const cx = size / 2;
  const cy = size / 2;
  return [
    [cx,     cy - r],
    [cx + h, cy - r / 2],
    [cx + h, cy + r / 2],
    [cx,     cy + r],
    [cx - h, cy + r / 2],
    [cx - h, cy - r / 2],
  ].map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}


export function HeroSection() {
  const taglines  = HERO.taglines;
  const { typing, particles, showPhoto } = HERO_DESIGN;
  const dir = particles.direction;

  const [displayed, setDisplayed] = useState(typing.enabled ? '' : taglines[0]);
  const [index, setIndex]         = useState(0);
  const [phase, setPhase]         = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    if (!typing.enabled) return;
    const target = taglines[index];
    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const id = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), typing.typeSpeed);
        return () => clearTimeout(id);
      } else {
        if (taglines.length === 1) return;
        const id = setTimeout(() => setPhase('pausing'), typing.pauseAfter);
        return () => clearTimeout(id);
      }
    }
    if (phase === 'pausing') {
      const id = setTimeout(() => setPhase('deleting'), 0);
      return () => clearTimeout(id);
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const id = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), typing.deleteSpeed);
        return () => clearTimeout(id);
      } else {
        setIndex((i) => (i + 1) % taglines.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, taglines, typing]);

  // Map direction to CSS animation name and which axis to spread across
  const animName = `hexDrift-${dir}`;
  const isVertical = dir === 'up' || dir === 'down';

  return (
    <section className="hero" aria-label="Introduction">

      {/* Floating hex particles */}
      {particles.enabled && (
        <div className="hex-particles" aria-hidden="true">
          {SIZES.map((size, i) => (
            <svg
              key={i}
              className="hex-particle"
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                // Spread perpendicular to direction of travel
                ...(isVertical
                  ? { left: SPREAD[i] }
                  : { top: SPREAD[i] }),
                // Start position: opposite edge from travel direction
                ...(dir === 'up'    && { bottom: '-80px' }),
                ...(dir === 'down'  && { top: '-80px' }),
                ...(dir === 'left'  && { right: '-80px' }),
                ...(dir === 'right' && { left: '-80px' }),
                animationName:     animName,
                animationDelay:    DELAYS[i],
                animationDuration: DURATIONS[i],
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              <polygon points={hexPoints(size)} stroke="currentColor" strokeWidth="1" />
            </svg>
          ))}
        </div>
      )}

      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-heading">
            {HERO.greeting}{' '}
            <span className="hero-name">{PERSON.fullName}</span>
          </h1>
          <p className="hero-role">
            {displayed}
            {typing.enabled && <span className="hero-cursor" aria-hidden="true">|</span>}
          </p>
          <p className="hero-sub">{HERO.bio}</p>
          <div className="hero-ctas">
            {HERO.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={cta.primary ? 'btn-primary' : 'btn-secondary'}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>

        {showPhoto && (
          <div className="hero-photo" aria-hidden="true">
            <div className="hex-photo-wrapper">
              <div className="hex-photo-inner">
                {HERO.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={HERO.photo} alt="" className="hex-photo-img" />
                ) : (
                  <span className="hex-photo-initials">{initials}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
