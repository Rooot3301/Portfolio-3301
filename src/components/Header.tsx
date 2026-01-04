import { Terminal, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
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
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-900 dark:hover:bg-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
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
