import { Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [currentPath] = useState('~');
  const [history, setHistory] = useState<string[]>([
    '╔═══════════════════════════════════════════════════════════════╗',
    '║                      Kali Linux 2026.1                       ║',
    '║                    root3301 Security Lab                     ║',
    '╚═══════════════════════════════════════════════════════════════╝',
    '',
    'Last login: Sat Jan  4 00:00:00 2026 from 127.0.0.1',
    'Type "help" to see available commands.',
    ''
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  const kaliArt = `
    ▄██▄                           ▄██▄
    ▀███                           ███▀
     ██████▄                   ▄██████
      █████████▄           ▄█████████
        ███████████▄   ▄███████████
          ██████████████████████
            ████████████████████
              ██████████████████
               █████████████████
              ██████████████████
             ████████████████████
            ██████████████████████
  `;

  const commands: Record<string, () => string> = {
    help: () => `Available commands:

  help          Display this help message
  about         Information about root3301
  skills        Technical skills and expertise
  projects      View projects and repositories
  github        Open GitHub profile
  contact       Contact information
  neofetch      Display system information
  clear         Clear the terminal
  ls            List directory contents
  pwd           Print working directory
  whoami        Display current user
  date          Display current date and time
  uname         Print system information
  cat           Display file contents`,

    about: () => `╭─ root3301 Security Profile ─────────────────────────────╮
│                                                          │
│  Role: Cybersecurity Specialist & Systems Administrator │
│  Focus: Penetration Testing, OSINT, Network Security    │
│                                                          │
│  Expertise:                                              │
│  • Advanced hardening (Windows/Linux)                    │
│  • Web application security & vulnerability research     │
│  • OSINT & reconnaissance automation                     │
│  • Network architecture & monitoring                     │
│  • Virtualization (ESXi/VMware)                          │
│                                                          │
╰──────────────────────────────────────────────────────────╯`,

    skills: () => `Technical Arsenal:

┌─ Cybersecurity ──────────────────────────────────────────┐
│ • Hardening: Windows/Linux system security              │
│ • Vulnerability Assessment & Exploitation               │
│ • Security Monitoring & Incident Response               │
│ • Penetration Testing & Red Team Operations             │
└──────────────────────────────────────────────────────────┘

┌─ OSINT & Intelligence ───────────────────────────────────┐
│ • Advanced OSINT collection techniques                   │
│ • Automated reconnaissance frameworks                    │
│ • Social engineering & information gathering            │
└──────────────────────────────────────────────────────────┘

┌─ Network & Infrastructure ───────────────────────────────┐
│ • Firewalling & Network Segmentation (VLAN)             │
│ • Traffic Analysis & IDS/IPS                            │
│ • ESXi/VMware Virtualization                            │
│ • Active Directory & Group Policy (AD/GPO)              │
└──────────────────────────────────────────────────────────┘

┌─ Automation & Development ───────────────────────────────┐
│ • PowerShell & Python Scripting                         │
│ • Security Audit Automation                             │
│ • Custom Tool Development                               │
└──────────────────────────────────────────────────────────┘`,

    projects: () => `Notable Projects:

  [1] Vulnerability Scanner Framework
      Advanced automated vulnerability detection system
      Technologies: Python, Nmap, Custom exploits

  [2] CTF Competition Platform
      Full-featured capture-the-flag environment
      Technologies: Docker, Node.js, MongoDB

  [3] Security Toolkit Collection
      Penetration testing and OSINT tools
      Technologies: Python, Bash, PowerShell

  [4] API Security Framework
      RESTful API security testing suite
      Technologies: Python, Burp Suite extensions

  View more on GitHub: https://github.com/Rooot3301`,

    github: () => `Opening GitHub profile...

  Profile: https://github.com/Rooot3301

  ┌─ GitHub Stats ───────────────────────────────────────────┐
  │ Username:    Rooot3301                                   │
  │ Profile:     https://github.com/Rooot3301               │
  │ Focus:       Security Tools, CTF, Automation            │
  │                                                          │
  │ "Building tools for a more secure digital world"        │
  └──────────────────────────────────────────────────────────┘

  Opening in browser...`,

    contact: () => `Contact Information:

  📧 Email:   contact@root3301.fr
  🌐 Website: https://root3301.fr
  💻 GitHub:  https://github.com/Rooot3301

  PGP Key: Available on request
  Response time: Usually within 24-48 hours`,

    neofetch: () => `${kaliArt}
  root3301@kali-security
  ─────────────────────
  OS: Kali Linux 2026.1 x86_64
  Host: Security Lab
  Kernel: 5.15.0-root3301
  Uptime: ${Math.floor(Math.random() * 48)} hours
  Shell: bash 5.1.16
  Terminal: root3301-terminal
  CPU: Intel i7-9700K (8) @ 3.60GHz
  Memory: ${Math.floor(Math.random() * 4000 + 4000)}MiB / 16384MiB`,

    clear: () => {
      setHistory([]);
      return '';
    },

    ls: () => `total 32
drwxr-xr-x  2 root3301 root3301  4096 Jan  4 00:00 about
drwxr-xr-x  2 root3301 root3301  4096 Jan  4 00:00 projects
drwxr-xr-x  2 root3301 root3301  4096 Jan  4 00:00 skills
drwxr-xr-x  2 root3301 root3301  4096 Jan  4 00:00 contact
-rw-r--r--  1 root3301 root3301  1337 Jan  4 00:00 README.md
-rwxr-xr-x  1 root3301 root3301  2048 Jan  4 00:00 security-scan.sh`,

    pwd: () => `/home/root3301${currentPath === '~' ? '' : '/' + currentPath}`,

    whoami: () => 'root3301',

    date: () => new Date().toString(),

    uname: () => 'Linux kali-security 5.15.0-root3301 #1 SMP x86_64 GNU/Linux',

    cat: () => `Usage: cat [file]
Try: cat README.md`,

    'cat README.md': () => `# root3301 Security Portfolio

## About
Cybersecurity specialist focusing on penetration testing,
vulnerability research, and system hardening.

## Connect
GitHub: https://github.com/Rooot3301
Website: https://root3301.fr

## Skills
- Penetration Testing
- OSINT & Reconnaissance
- Network Security
- System Administration

"Security is not a product, but a process."`
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    const newHistory = [...history, `┌──(root3301㉿kali)-[${currentPath}]`, `└─# ${cmd}`];

    if (trimmedCmd in commands) {
      const output = commands[trimmedCmd]();
      if (output) {
        newHistory.push(output);
        newHistory.push('');
      }

      if (trimmedCmd === 'github') {
        window.open('https://github.com/Rooot3301', '_blank');
      }
    } else {
      newHistory.push(`bash: ${cmd}: command not found`);
      newHistory.push('');
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
          <div className="border border-green-500/30 rounded-lg p-4 bg-black shadow-lg shadow-green-500/10">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">root3301@kali: ~</span>
            </div>

            <div
              ref={outputRef}
              id="terminal-output"
              className="h-96 overflow-y-auto mb-4 font-mono text-sm"
            >
              {history.map((line, index) => {
                const isPromptLine = line.startsWith('┌──');
                const isCommandLine = line.startsWith('└─#');
                const isError = line.includes('command not found');

                return (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      isPromptLine ? 'text-blue-400 mt-2' :
                      isCommandLine ? 'text-red-500' :
                      isError ? 'text-red-400' :
                      'text-gray-300'
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-0">
              <div className="text-blue-400 font-mono text-sm">
                ┌──(root3301㉿kali)-[{currentPath}]
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-mono text-sm">└─#</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none terminal-cursor text-gray-300 font-mono text-sm"
                  placeholder="Enter command..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
