import { Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface GameState {
  active: boolean;
  target: string;
  attempts: number;
  maxAttempts: number;
}

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
  const [gameState, setGameState] = useState<GameState>({
    active: false,
    target: '',
    attempts: 0,
    maxAttempts: 5
  });
  const [matrixMode, setMatrixMode] = useState(false);
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

  const wordList = ['password', 'admin', 'root', 'secret', 'exploit', 'backdoor', 'shell', 'access'];

  const startGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setGameState({
      active: true,
      target: randomWord,
      attempts: 0,
      maxAttempts: 5
    });
    return `╔════════════════════════════════════════════════════════════╗
║              🎯 PASSWORD CRACKER CHALLENGE 🎯             ║
╠════════════════════════════════════════════════════════════╣
║  A secured system detected! Crack the password to gain    ║
║  access. You have ${5} attempts.                          ║
║                                                            ║
║  Hint: ${randomWord.length} characters, common security word          ║
║                                                            ║
║  Type your guess or 'quit' to exit                        ║
╚════════════════════════════════════════════════════════════╝`;
  };

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
  cat           Display file contents

  ┌─ Fun & Games ─────────────────────────────────────────┐
  │ hack          Start password cracker game             │
  │ matrix        Enter the matrix                        │
  │ nmap          Simulate network scan                   │
  │ exploit       Try to exploit the system               │
  │ sudo su       Escalate privileges                     │
  │ decode        Decode secret messages                  │
  └────────────────────────────────────────────────────────┘`,

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

"Security is not a product, but a process."`,

    hack: () => startGame(),

    matrix: () => {
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 3000);
      return `
    M   M  AAA  TTTTT RRRR  III X   X
    MM MM A   A   T   R   R  I   X X
    M M M AAAAA   T   RRRR   I    X
    M   M A   A   T   R  R   I   X X
    M   M A   A   T   R   R III X   X

Wake up, Neo... The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.`;
    },

    nmap: () => `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for root3301.fr (192.168.1.1)
Host is up (0.00042s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3301/tcp open  mystery

Nmap done: 1 IP address (1 host up) scanned in 0.33 seconds`,

    exploit: () => `[*] Initializing exploit framework...
[*] Loading payload: reverse_tcp
[*] Target: 127.0.0.1:3301
[*] Checking vulnerabilities...
[+] Found: CVE-2026-3301 (Buffer Overflow)
[*] Generating shellcode...
[*] Sending exploit...
[!] ERROR: Access Denied - Nice try, but this is a portfolio site!
[*] Tip: Try 'hack' command for a real challenge ;)`,

    'sudo su': () => `[sudo] password for root3301:
Sorry, try again.
[sudo] password for root3301:
sudo: 3 incorrect password attempts
Just kidding! You already have root access here.`,

    decode: () => {
      const secrets = [
        'VGhlIGJlc3QgcGFzc3dvcmQgaXMgdGhlIG9uZSB5b3UgY2FuJ3QgcmVtZW1iZXI=',
        'MHhERUFEQkVFRiAtIFRoZSBtYWdpYyBudW1iZXI=',
        'cm9vdDMzMDEgd2FzIGhlcmU='
      ];
      const secret = secrets[Math.floor(Math.random() * secrets.length)];
      const decoded = atob(secret);
      return `Decoding secret message...
Encrypted: ${secret}
Decrypted: ${decoded}`;
    },

    ping: () => `PING root3301.fr (192.168.1.1) 56(84) bytes of data.
64 bytes from root3301.fr: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from root3301.fr: icmp_seq=2 ttl=64 time=0.038 ms
64 bytes from root3301.fr: icmp_seq=3 ttl=64 time=0.041 ms
--- root3301.fr ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`,

    '0xdeadbeef': () => `*** Easter Egg Found! ***

You've discovered the magic number!
0xDEADBEEF = 3735928559

"In memory allocation, some programmers just want to watch the world burn"`,

    '3301': () => `WARNING: CICADA 3301 PROTOCOL DETECTED

Good luck.
3301

THE PUZZLE

"We are looking for highly intelligent individuals"`,

    konami: () => `UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

KONAMI CODE ACTIVATED!

+30 Lives
+Infinite Ammo
+God Mode

Just kidding... but you got the reference!`,

    whoisthere: () => `Knock knock.
Who's there?
A cybersecurity specialist who knows you typed this command.
I see you.`,

    'rm -rf': () => `WARNING: CRITICAL OPERATION
You are about to delete EVERYTHING!
Just kidding, this is a safe terminal simulation.
Please don't try this on a real system.`,

    coffee: () => `
      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|
( C|/\\/\\/\\/\\/|
 '-./\\/\\/\\/\\/|
   '_________'
    '-------'

Here's your coffee! You look like you need it.
Error 418: I'm a teapot (RFC 2324)`,

    '42': () => `The Answer to the Ultimate Question of Life,
The Universe, and Everything is...

42

But what is the question?`,
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

    // Game logic
    if (gameState.active) {
      if (trimmedCmd === 'quit') {
        setGameState({ ...gameState, active: false });
        newHistory.push('Game terminated. Better luck next time!');
        newHistory.push('');
      } else {
        const newAttempts = gameState.attempts + 1;

        if (trimmedCmd === gameState.target) {
          newHistory.push(`
╔════════════════════════════════════════════════════════════╗
║                   🎉 ACCESS GRANTED! 🎉                   ║
╠════════════════════════════════════════════════════════════╣
║  Password cracked in ${newAttempts} attempt${newAttempts > 1 ? 's' : ''}!                        ║
║  The password was: ${gameState.target}                             ║
║                                                            ║
║  You've successfully breached the system!                 ║
║  Type 'hack' to play again.                               ║
╚════════════════════════════════════════════════════════════╝`);
          setGameState({ ...gameState, active: false });
          newHistory.push('');
        } else if (newAttempts >= gameState.maxAttempts) {
          newHistory.push(`
╔════════════════════════════════════════════════════════════╗
║                    ❌ ACCESS DENIED! ❌                    ║
╠════════════════════════════════════════════════════════════╣
║  Maximum attempts reached!                                 ║
║  The password was: ${gameState.target}                             ║
║                                                            ║
║  System locked. Type 'hack' to try again.                 ║
╚════════════════════════════════════════════════════════════╝`);
          setGameState({ ...gameState, active: false });
          newHistory.push('');
        } else {
          // Give hints based on closeness
          let hint = '';
          if (trimmedCmd.length === gameState.target.length) {
            let correctPositions = 0;
            for (let i = 0; i < trimmedCmd.length; i++) {
              if (trimmedCmd[i] === gameState.target[i]) correctPositions++;
            }
            hint = `${correctPositions} character${correctPositions !== 1 ? 's' : ''} in correct position!`;
          } else {
            hint = `Wrong length! Target is ${gameState.target.length} characters.`;
          }

          newHistory.push(`[${newAttempts}/${gameState.maxAttempts}] ❌ Incorrect! Hint: ${hint}`);
          newHistory.push(`Attempts remaining: ${gameState.maxAttempts - newAttempts}`);
          newHistory.push('');
          setGameState({ ...gameState, attempts: newAttempts });
        }
      }
    } else if (trimmedCmd in commands) {
      const output = commands[trimmedCmd]();
      if (output) {
        newHistory.push(output);
        newHistory.push('');
      }

      if (trimmedCmd === 'github') {
        window.open('https://github.com/Rooot3301', '_blank');
      }
    } else {
      // Easter egg for unknown commands
      const responses = [
        `bash: ${cmd}: command not found`,
        `zsh: command not found: ${cmd}`,
        `${cmd}: command not found. Did you mean something else?`,
        `-bash: ${cmd}: command not found (Try 'help' for available commands)`,
      ];
      newHistory.push(responses[Math.floor(Math.random() * responses.length)]);
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
          <div className={`border ${matrixMode ? 'border-green-500 animate-pulse' : 'border-green-500/30'} rounded-lg p-4 bg-black shadow-lg shadow-green-500/10 transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {gameState.active ? '🎮 GAME MODE' : 'root3301@kali: ~'}
              </span>
            </div>

            <div
              ref={outputRef}
              id="terminal-output"
              className={`h-96 overflow-y-auto mb-4 font-mono text-sm ${matrixMode ? 'text-green-400' : ''}`}
            >
              {history.map((line, index) => {
                const isPromptLine = line.startsWith('┌──');
                const isCommandLine = line.startsWith('└─#');
                const isError = line.includes('command not found');
                const isSuccess = line.includes('ACCESS GRANTED');
                const isDenied = line.includes('ACCESS DENIED');

                return (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      matrixMode ? 'text-green-400' :
                      isSuccess ? 'text-green-400' :
                      isDenied ? 'text-red-400' :
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
