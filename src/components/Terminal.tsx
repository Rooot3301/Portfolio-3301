import { Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to root3301 terminal. Type "help" for available commands.'
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
  help      - Show this help message
  about     - Learn more about root3301
  skills    - View technical skills
  projects  - Browse projects
  contact   - Get contact information
  clear     - Clear terminal
  ls        - List directories
  whoami    - Display user information
  date      - Show current date and time`,

    about: () => `root3301 - Security Researcher & Penetration Tester
Specializing in web application security and vulnerability research.`,

    skills: () => `Core Skills:
  • Penetration Testing
  • Web Application Security
  • Python, JavaScript, Go
  • Linux/Unix Systems
  • Network Security`,

    projects: () => `Notable Projects:
  • Vulnerability Scanner
  • CTF Platform
  • Security Toolkit
  • API Security Framework`,

    contact: () => `Contact Information:
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
      newHistory.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
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
    <section id="terminal" className="py-20 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <TerminalIcon className="w-5 h-5" />
          <span>/terminal</span>
        </div>

        <div className="section-content">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <div
              ref={outputRef}
              id="terminal-output"
              className="h-64 overflow-y-auto mb-4 font-mono text-sm"
            >
              {history.map((line, index) => (
                <div
                  key={index}
                  className={line.startsWith('$') ? 'text-blue-600 dark:text-blue-400' : ''}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none terminal-cursor"
                placeholder="Type a command..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
