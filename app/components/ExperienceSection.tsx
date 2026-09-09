import { EXPERIENCE, EDUCATION } from '@/config/portfolio';
import { LABELS, SECTIONS } from '@/config/design';
import { ScrollReveal } from './ScrollReveal';

function WorkBlock() {
  return (
    <div>
      <p className="exp-sub-label">{LABELS.work}</p>
      <div className="exp-list">
        {EXPERIENCE.map((entry, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="exp-card">
              <div className="exp-meta">
                <div className="exp-meta-left">
                  <p className="exp-role">{entry.role}</p>
                  <p className="exp-company">{entry.company} &middot; {entry.location}</p>
                </div>
                <span className="exp-dates">{entry.start} – {entry.end}</span>
              </div>
              {entry.bullets.length > 0 && (
                <ul className="exp-bullets">
                  {entry.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
              {entry.tech.length > 0 && (
                <div className="tech-pill-row">
                  {entry.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function EducationBlock() {
  return (
    <div>
      <p className="exp-sub-label">{LABELS.education}</p>
      <div className="exp-list">
        {EDUCATION.map((entry, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="exp-card">
              <div className="exp-meta">
                <div className="exp-meta-left">
                  <p className="exp-role">{entry.school}</p>
                  <p className="exp-company">{entry.degree}{entry.minor && ` · Minor in ${entry.minor}`}</p>
                </div>
                <span className="exp-dates">
                  {entry.gpa && <>GPA {entry.gpa} &middot; </>}Graduating {entry.graduation}
                </span>
              </div>
              {entry.courses.length > 0 && (
                <div className="tech-pill-row">
                  {entry.courses.map((c) => (
                    <span key={c} className="tech-pill">{c}</span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const showEdu = SECTIONS.showEducation;
  const eduFirst = SECTIONS.educationFirst;

  return (
    <section id="experience" className="portfolio-section">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-label">{LABELS.experience.heading}</span>
        </div>
      </ScrollReveal>
      <div className="exp-blocks">
        {eduFirst && showEdu ? (
          <>
            <EducationBlock />
            <WorkBlock />
          </>
        ) : (
          <>
            <WorkBlock />
            {showEdu && <EducationBlock />}
          </>
        )}
      </div>
    </section>
  );
}
