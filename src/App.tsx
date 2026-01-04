import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubProjects from './components/GitHubProjects';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import HoneypotLogs from './components/HoneypotLogs';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import AdminDashboard from './components/AdminDashboard';
import AnnouncementBanner from './components/AnnouncementBanner';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  useAnalytics();
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

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
      <AdminDashboard />
    </div>
  );
}

export default App;
