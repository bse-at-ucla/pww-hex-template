import { CONTACT } from '@/config/portfolio';
import { LABELS } from '@/config/design';
import { ScrollReveal } from './ScrollReveal';

export function ContactSection() {
  return (
    <section id="contact" className="portfolio-section portfolio-section--last">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label">{LABELS.contact.heading}</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={80}>
      <div className="contact-layout">
        <div>
          <p className="contact-blurb">{CONTACT.blurb}</p>
          <a href={`mailto:${CONTACT.email}`} className="btn-primary">
            Send a message
          </a>
        </div>
        <div className="contact-links">
          {CONTACT.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="contact-link"
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            >
              <span className="contact-link-label">{link.label}</span>
              <span className="contact-link-value">{link.display}</span>
            </a>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
