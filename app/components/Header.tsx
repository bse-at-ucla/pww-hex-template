'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PERSON, NAV_LINKS } from '@/config/portfolio';
import { THEME } from '@/config/design';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="content-container">
        <Link href="#top" className="site-logo" aria-label={`${PERSON.fullName} — scroll to top`}>
          <span className="logo-prefix" aria-hidden="true">&gt;</span>
          {PERSON.fullName}
        </Link>

        <nav aria-label="Site navigation">
          <ul className="site-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-icons">
          {!THEME.disableToggle && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
