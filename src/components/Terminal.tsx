import { Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Bienvenue sur le terminal root3301. Tapez "help" pour voir les commandes disponibles.'
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string> = {
    help: () => `Commandes disponibles:
  help      - Affiche ce message d'aide
  about     - En savoir plus sur root3301
  skills    - Voir les compétences techniques
  projects  - Parcourir les projets
  contact   - Obtenir les informations de contact
  clear     - Effacer le terminal
  ls        - Lister les répertoires
  whoami    - Afficher les informations utilisateur
  date      - Afficher la date et l'heure`,

    about: () => `root3301 - Spécialiste en Cybersécurité & Systèmes
Experte en hardening, OSINT, administration réseau et virtualisation.
Spécialisée dans la sécurité des applications web et la recherche de vulnérabilités.`,

    skills: () => `Compétences principales:
  • Cybersécurité: Hardening Windows/Linux, Vulnérabilités, Monitoring
  • OSINT & Analyse: Collecte, Automatisation, Reconnaissance
  • Réseau: Firewalling, VLAN, Analyse de trafic
  • Systèmes: Virtualisation ESXi/VMware, Sauvegardes, AD/GPO
  • Automatisation: PowerShell, Python, Scripts d'audit`,

    projects: () => `Projets notables:
  • Scanner de Vulnérabilités
  • Plateforme CTF
  • Boîte à Outils Sécurité
  • Framework Sécurité API`,

    contact: () => `Informations de contact:
Email: contact@root3301.fr
Website: https://root3301.fr`,

    clear: () => {
      setHistory([]);
      return '';
    },

    ls: () => `drwxr-xr-x  2 root3301 root3301  4096 Mar 15 10:30 about
drwxr-xr-x  2 root3301 root3301  4096 Mar 15 10:30 projects
drwxr-xr-x  2 root3301 root3301  4096 Mar 15 10:30 skills
drwxr-xr-x  2 root3301 root3301  4096 Mar 15 10:30 contact`,

    whoami: () => 'root3301',

    date: () => new Date().toString()
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    const newHistory = [...history, `$ ${cmd}`];

    if (trimmedCmd in commands) {
      const output = commands[trimmedCmd]();
      if (output) {
        newHistory.push(output);
      }
    } else {
      newHistory.push(`Commande introuvable: ${cmd}. Tapez 'help' pour voir les commandes disponibles.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <section id="terminal" className="py-20 px-4 bg-black border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <TerminalIcon className="w-5 h-5" />
          <span>/terminal</span>
        </div>

        <div className="section-content">
          <div className="border border-gray-800 rounded-lg p-4 bg-gray-900">
            <div
              ref={outputRef}
              id="terminal-output"
              className="h-64 overflow-y-auto mb-4 font-mono text-sm"
            >
              {history.map((line, index) => (
                <div
                  key={index}
                  className={line.startsWith('$') ? 'text-blue-400' : ''}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none terminal-cursor"
                placeholder="Tapez une commande..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
