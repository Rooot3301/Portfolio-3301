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
import VisitorStats from './VisitorStats';
import DiscordProfileCard from './DiscordProfileCard';
import DiscordServerWidget from './DiscordServerWidget';

export default function HomePage() {
  const [konamiMode, setKonamiMode] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        <section className="py-20 bg-gradient-to-b from-black to-slate-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Discord</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <DiscordProfileCard />
              <DiscordServerWidget />
            </div>
          </div>
        </section>

        <Contact />
        <HoneypotLogs />
        <Terminal />
      </main>
      <Footer />
      <VisitorStats />
    </div>
  );
}
