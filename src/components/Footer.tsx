import { Terminal, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <Terminal className="w-4 h-4" />
            <span>© 2026 root3301.sh</span>
          </div>

          <div className="text-sm text-gray-400">
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
