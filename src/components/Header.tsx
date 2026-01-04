import { Terminal, Moon, Sun, Github, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { navigate } from './Router';
import DiscordBadge from './DiscordBadge';

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
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 text-lg font-bold hover:text-red-500 transition-colors"
            >
              <Terminal className="w-5 h-5" />
              <span>root3301</span>
            </button>

            <div className="hidden md:block">
              <DiscordBadge />
            </div>
          </div>

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

            <div className="h-4 w-px bg-gray-700"></div>

            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-gray-900 rounded-lg transition-colors hover:text-red-500"
              aria-label="Admin"
            >
              <Shield className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/Rooot3301"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-900 rounded-lg transition-colors hover:text-green-500"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://discord.gg/3GyAtWktBm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-900 rounded-lg transition-colors hover:text-blue-500"
              aria-label="Discord Server"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>

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
