import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import GitHubProjects from './GitHubProjects';
import Contact from './Contact';
import Terminal from './Terminal';
import HoneypotLogs from './HoneypotLogs';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import AnnouncementBanner from './AnnouncementBanner';
import StatusIndicator from './StatusIndicator';
import VisitorStats from './VisitorStats';

export default function HomePage() {
  const [konamiMode, setKonamiMode] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setKonamiMode(!konamiMode);
        setKonamiSequence([]);
      }

      if (e.ctrlKey) {
        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
        const key = parseInt(e.key);
        if (key >= 1 && key <= sections.length) {
          e.preventDefault();
          const element = document.getElementById(sections[key - 1]);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiSequence, konamiMode]);

  return (
    <div className={`min-h-screen ${konamiMode ? 'konami-mode' : ''}`}>
      <ScrollProgress />
      <Header />
      <AnnouncementBanner />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubProjects />
        <Contact />
        <HoneypotLogs />
        <Terminal />
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        <StatusIndicator />
        <VisitorStats />
      </div>
    </div>
  );
}
