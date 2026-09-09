import { Header }            from './components/Header';
import { HeroSection }       from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection }   from './components/ProjectsSection';
import { ContactSection }    from './components/ContactSection';
import { Footer }            from './components/Footer';
import { SECTIONS } from '@/config/design';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <HeroSection />
      <main className="main-content">
        <div className="content-container">
          {SECTIONS.experience && <ExperienceSection />}
          {SECTIONS.projects   && <ProjectsSection />}
          {SECTIONS.contact    && <ContactSection />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
