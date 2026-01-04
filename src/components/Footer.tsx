import { Terminal, Mail } from 'lucide-react';
import DiscordActivityBadge from './DiscordActivityBadge';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Terminal className="w-4 h-4" />
            <span>© 2026 root3301.sh</span>
          </div>

          <DiscordActivityBadge />

          <div className="text-sm text-gray-400 hidden md:block">
            Appuyez sur Ctrl + [1-5] pour naviguer
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:contact@root3301.fr"
              className="text-sm hover:underline hover:text-red-500 transition-colors"
            >
              contact@root3301.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
