import { Terminal, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-lg font-bold hover:text-red-500 transition-colors"
          >
            <Terminal className="w-5 h-5" />
            <span>root3301</span>
          </button>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('about')}
              className="command-link text-sm"
            >
              /about
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="command-link text-sm"
            >
              /skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="command-link text-sm"
            >
              /projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="command-link text-sm"
            >
              /contact
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
