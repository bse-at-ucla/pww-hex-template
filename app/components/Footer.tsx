import Link from 'next/link';
import { PERSON, FOOTER, SOCIAL_LINKS } from '@/config/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link href="#top" className="footer-logo" aria-label={`${PERSON.fullName} — scroll to top`}>
              <span style={{ color: 'var(--accent)', marginRight: '0.35em' }}>&gt;</span>
              {PERSON.fullName}
            </Link>
            <p className="footer-tagline">{FOOTER.tagline}</p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="social-link"
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.heading}>
              <p className="footer-col-title">{col.heading}</p>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link"
                      target={link.href.startsWith('#') || link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('#') || link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {year} {PERSON.fullName}. Designed by{' '}
            <a
              href="https://bseatucla.com"
              className="footer-credit-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bruin Software Engineers
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
