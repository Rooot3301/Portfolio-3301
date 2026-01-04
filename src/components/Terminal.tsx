import { Terminal as TerminalIcon } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

interface GameState {
  active: boolean;
  target: string;
  attempts: number;
  maxAttempts: number;
}

interface CryptoChallenge {
  active: boolean;
  encrypted: string;
  decrypted: string;
  cipher: string;
}

interface MemoryGame {
  active: boolean;
  sequence: number[];
  userSequence: number[];
  round: number;
}

interface SecurityQuiz {
  active: boolean;
  currentQuestion: number;
  score: number;
  answered: boolean;
}

const formatDate = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const year = date.getFullYear();

  return `${day} ${month} ${String(dateNum).padStart(2, ' ')} ${hours}:${minutes}:${seconds} ${year}`;
};

const getShortDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, ' ');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month} ${day} ${hours}:${minutes}`;
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [currentPath] = useState('~');
  const loginTime = useMemo(() => new Date(), []);
  const [githubStats, setGithubStats] = useState<{ repos: number; stars: number; followers: number } | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([
    '╔═══════════════════════════════════════════════════════════════╗',
    '║                      Kali Linux 2026.1                       ║',
    '║                    root3301 Security Lab                     ║',
    '╚═══════════════════════════════════════════════════════════════╝',
    '',
    `Last login: ${formatDate(loginTime)} from 127.0.0.1`,
    'Type "help" to see available commands.',
    ''
  ]);
  const [gameState, setGameState] = useState<GameState>({
    active: false,
    target: '',
    attempts: 0,
    maxAttempts: 5
  });
  const [cryptoChallenge, setCryptoChallenge] = useState<CryptoChallenge>({
    active: false,
    encrypted: '',
    decrypted: '',
    cipher: ''
  });
  const [memoryGame, setMemoryGame] = useState<MemoryGame>({
    active: false,
    sequence: [],
    userSequence: [],
    round: 0
  });
  const [securityQuiz, setSecurityQuiz] = useState<SecurityQuiz>({
    active: false,
    currentQuestion: 0,
    score: 0,
    answered: false
  });
  const [matrixMode, setMatrixMode] = useState(false);
  const [suMode, setSuMode] = useState(false);
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

  const securityQuestions = [
    {
      question: "What does XSS stand for?",
      options: ["1) Extra Secure System", "2) Cross-Site Scripting", "3) XML Security Service", "4) eXtended SQL Syntax"],
      answer: 2
    },
    {
      question: "Which port is typically used for HTTPS?",
      options: ["1) 80", "2) 8080", "3) 443", "4) 22"],
      answer: 3
    },
    {
      question: "What does SQL injection exploit?",
      options: ["1) Network protocols", "2) Database queries", "3) File systems", "4) Memory buffers"],
      answer: 2
    },
    {
      question: "What is a common use of Metasploit?",
      options: ["1) Web browsing", "2) Penetration testing", "3) Email encryption", "4) Password storage"],
      answer: 2
    },
    {
      question: "What does OWASP stand for?",
      options: ["1) Open Web Application Security Project", "2) Online Wireless Access Security Protocol", "3) Operating Web Authentication System Protocol", "4) Organized Web Attack Security Program"],
      answer: 1
    }
  ];

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Rooot3301');
        if (response.ok) {
          const data = await response.json();
          setGithubStats({
            repos: data.public_repos,
            stars: 0,
            followers: data.followers
          });

          const reposResponse = await fetch('https://api.github.com/users/Rooot3301/repos?per_page=100');
          if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
            setGithubStats(prev => prev ? { ...prev, stars: totalStars } : null);
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

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
  │ crypto        Cryptography challenge                  │
  │ memory        Memory sequence game                    │
  │ quiz          Security knowledge quiz                 │
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

    github: () => {
      const stats = githubStats ? `
  ┌─ GitHub Stats ───────────────────────────────────────────┐
  │ Username:    Rooot3301                                   │
  │ Profile:     https://github.com/Rooot3301               │
  │ Public Repos: ${githubStats.repos.toString().padEnd(48)}│
  │ Total Stars:  ${githubStats.stars.toString().padEnd(48)}│
  │ Followers:    ${githubStats.followers.toString().padEnd(48)}│
  │ Focus:       Security Tools, CTF, Automation            │
  │                                                          │
  │ "Building tools for a more secure digital world"        │
  └──────────────────────────────────────────────────────────┘` : `
  ┌─ GitHub Stats ───────────────────────────────────────────┐
  │ Username:    Rooot3301                                   │
  │ Profile:     https://github.com/Rooot3301               │
  │ Focus:       Security Tools, CTF, Automation            │
  │                                                          │
  │ "Building tools for a more secure digital world"        │
  └──────────────────────────────────────────────────────────┘`;

      return `Opening GitHub profile...

  Profile: https://github.com/Rooot3301
${stats}

  Opening in browser...`;
    },

    contact: () => `Contact Information:

  📧 Email:   contact@root3301.fr
  🌐 Website: https://root3301.fr
  💻 GitHub:  https://github.com/Rooot3301

  PGP Key: Available on request
  Response time: Usually within 24-48 hours`,

    neofetch: () => {
      const statsLine = githubStats
        ? `  GitHub: ${githubStats.repos} repos | ${githubStats.stars} stars | ${githubStats.followers} followers`
        : '  GitHub: Loading stats...';

      return `${kaliArt}
  root3301@kali-security
  ─────────────────────
  OS: Kali Linux 2026.1 x86_64
  Host: Security Lab
  Kernel: 5.15.0-root3301
  Uptime: ${Math.floor(Math.random() * 48)} hours
  Shell: bash 5.1.16
  Terminal: root3301-terminal
  CPU: Intel i7-9700K (8) @ 3.60GHz
  Memory: ${Math.floor(Math.random() * 4000 + 4000)}MiB / 16384MiB
${statsLine}`;
    },

    clear: () => {
      setHistory([]);
      return '';
    },

    ls: () => {
      const now = new Date();
      const dateStr = getShortDate(now);
      return `total 32
drwxr-xr-x  2 root3301 root3301  4096 ${dateStr} about
drwxr-xr-x  2 root3301 root3301  4096 ${dateStr} projects
drwxr-xr-x  2 root3301 root3301  4096 ${dateStr} skills
drwxr-xr-x  2 root3301 root3301  4096 ${dateStr} contact
-rw-r--r--  1 root3301 root3301  1337 ${dateStr} README.md
-rwxr-xr-x  1 root3301 root3301  2048 ${dateStr} security-scan.sh`;
    },

    pwd: () => `/home/root3301${currentPath === '~' ? '' : '/' + currentPath}`,

    whoami: () => 'root3301',

    date: () => formatDate(new Date()),

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

    'su admin': () => {
      setSuMode(true);
      return `[root3301@kali]$ su admin
Password:`;
    },

    erase: () => {
      const eraseSite = () => {
        document.body.style.transition = 'all 2s ease-out';
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.8)';

        setTimeout(() => {
          document.body.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background: #000;
              color: #0f0;
              font-family: monospace;
              font-size: 24px;
              flex-direction: column;
              gap: 20px;
            ">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">SYSTEM ERASED</div>
                <div style="font-size: 18px; color: #0a0;">All data has been wiped...</div>
                <div style="font-size: 14px; color: #070; margin-top: 40px;">Just kidding! Rebooting in 3 seconds...</div>
              </div>
            </div>
          `;

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, 2000);
      };

      eraseSite();
      return `[!] WARNING: EXECUTING DESTRUCTIVE COMMAND
[*] Initiating system wipe...
[*] Deleting all files...
[*] Removing databases...
[*] Wiping memory...`;
    },

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

    crypto: () => {
      const challenges = [
        { cipher: 'ROT13', text: 'pelorefrphevgl', answer: 'cybersecurity' },
        { cipher: 'Base64', text: 'aGFja2Vy', answer: 'hacker' },
        { cipher: 'Caesar+5', text: 'ujwfqy', answer: 'pentax' }
      ];
      const challenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCryptoChallenge({
        active: true,
        encrypted: challenge.text,
        decrypted: challenge.answer,
        cipher: challenge.cipher
      });
      return `╔═══════════════════════════════════════════════════════════╗
║                  🔐 CRYPTO CHALLENGE 🔐                  ║
╠═══════════════════════════════════════════════════════════╣
║  Cipher: ${challenge.cipher.padEnd(50)}║
║  Encrypted: ${challenge.text.padEnd(46)}║
║                                                           ║
║  Decrypt the message and type your answer                ║
║  Type 'quit' to exit                                      ║
╚═══════════════════════════════════════════════════════════╝`;
    },

    memory: () => {
      const sequence = [Math.floor(Math.random() * 4) + 1];
      setMemoryGame({
        active: true,
        sequence,
        userSequence: [],
        round: 1
      });
      return `╔═══════════════════════════════════════════════════════════╗
║                  🧠 MEMORY CHALLENGE 🧠                  ║
╠═══════════════════════════════════════════════════════════╣
║  Remember the sequence and type it back!                 ║
║  Round 1                                                  ║
║                                                           ║
║  Sequence: ${sequence.join(' ')}                                             ║
║                                                           ║
║  Type the numbers separated by spaces                    ║
║  Type 'quit' to exit                                      ║
╚═══════════════════════════════════════════════════════════╝`;
    },

    quiz: () => {
      setSecurityQuiz({
        active: true,
        currentQuestion: 0,
        score: 0,
        answered: false
      });
      const q = securityQuestions[0];
      return `╔═══════════════════════════════════════════════════════════╗
║               🎯 SECURITY QUIZ CHALLENGE 🎯              ║
╠═══════════════════════════════════════════════════════════╣
║  Test your cybersecurity knowledge!                      ║
║  Question 1/${securityQuestions.length}                                            ║
║                                                           ║
║  ${q.question.padEnd(56)}║
║                                                           ║
${q.options.map(opt => `║  ${opt.padEnd(56)}║`).join('\n')}
║                                                           ║
║  Type the number of your answer (1-4)                    ║
║  Type 'quit' to exit                                      ║
╚═══════════════════════════════════════════════════════════╝`;
    },

    rickroll: () => `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿⡇⠀

Never gonna give you up, never gonna let you down!
You just got rickrolled! 🎵

Opening YouTube...`,

    secret: () => `*** HIDDEN COMMAND DISCOVERED ***

You found a secret! Here are some hidden gems:

Hidden Commands:
  - rickroll      Get rickrolled
  - theansweris42 Find the meaning of life
  - iamgroot      Become Groot
  - sudo make me a sandwich (try it!)
  - tree          ASCII tree structure

"In a world of 1s and 0s, be a wildcard."`,

    theansweris42: () => `Deep Thought has spoken...

After 7.5 million years of computation:
The Answer to the Ultimate Question of Life,
The Universe, and Everything is...

██╗  ██╗██████╗
██║  ██║╚════██╗
███████║ █████╔╝
╚════██║██╔═══╝
     ██║███████╗
     ╚═╝╚══════╝

But... what was the question?`,

    iamgroot: () => `I am Groot.
I am Groot!
I am Groot?
I am Groot...

Translation: "Thank you for visiting root3301's portfolio!"`,

    'sudo make me a sandwich': () => `OKAY.

[█████████████████████] 100%

Here's your sandwich:

    _____________________
   /                     \\
  /  🥬 🧀 🍅 🥓 🥬  \\
 /________________________\\

Enjoy your sudo sandwich!`,

    tree: () => `root3301/
├── skills/
│   ├── cybersecurity/
│   │   ├── penetration-testing
│   │   ├── vulnerability-assessment
│   │   └── security-monitoring
│   ├── osint/
│   │   ├── reconnaissance
│   │   └── information-gathering
│   └── infrastructure/
│       ├── network-security
│       └── system-administration
├── projects/
│   ├── Syffer
│   ├── NetTrace
│   ├── Sentinelize
│   └── Ninjaa
└── contact/
    ├── email: contact@root3301.fr
    └── github: Rooot3301

8 directories, 12 files`,

    cowsay: () => `
 _____________________
< Welcome to root3301 >
 ---------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,

    fortune: () => {
      const fortunes = [
        "A security expert is someone who hasn't been hacked... yet.",
        "The best firewall is the one you don't know is there.",
        "In cybersecurity, paranoia is just good planning.",
        "There are two types of companies: those that have been hacked, and those that don't know it yet.",
        "The most secure password is the one you can't remember.",
        "A backdoor today keeps the hackers away... wait, that's not right!",
        "Trust, but verify. Then verify again. And maybe once more."
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    whoisthere: () => `Knock knock.
Who's there?
root3301.
root3301 who?
root3301 is watching your IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}

Just kidding! Your privacy is important. 😉`,
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, `┌──(root3301㉿kali)-[${currentPath}]`, `└─# ${cmd}`];

    // SU admin mode
    if (suMode) {
      if (cmd === 'admin') {
        newHistory.push(`
╔════════════════════════════════════════════════════════════╗
║                  ACCESS GRANTED - ADMIN                   ║
╠════════════════════════════════════════════════════════════╣
║  You now have administrative privileges!                  ║
║  Type 'erase' to wipe the system (destructive!)           ║
║  Type 'exit' to return to normal mode                     ║
╚════════════════════════════════════════════════════════════╝`);
        newHistory.push('');
        setSuMode(false);
      } else {
        newHistory.push('su: Authentication failure');
        newHistory.push('');
        setSuMode(false);
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

    // Crypto challenge logic
    if (cryptoChallenge.active) {
      if (trimmedCmd === 'quit') {
        setCryptoChallenge({ ...cryptoChallenge, active: false });
        newHistory.push('Challenge terminated.');
        newHistory.push('');
      } else if (trimmedCmd === cryptoChallenge.decrypted) {
        newHistory.push(`
╔═══════════════════════════════════════════════════════════╗
║                   🎉 CORRECT! 🎉                         ║
╠═══════════════════════════════════════════════════════════╣
║  You successfully decrypted the message!                 ║
║  Answer: ${cryptoChallenge.decrypted.padEnd(48)}║
║                                                           ║
║  Type 'crypto' to play again.                            ║
╚═══════════════════════════════════════════════════════════╝`);
        setCryptoChallenge({ ...cryptoChallenge, active: false });
        newHistory.push('');
      } else {
        newHistory.push(`❌ Incorrect! Try again or type 'quit' to exit.`);
        newHistory.push('');
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

    // Memory game logic
    if (memoryGame.active) {
      if (trimmedCmd === 'quit') {
        setMemoryGame({ ...memoryGame, active: false });
        newHistory.push('Game terminated.');
        newHistory.push('');
      } else {
        const userSeq = cmd.trim().split(' ').map(n => parseInt(n));
        if (JSON.stringify(userSeq) === JSON.stringify(memoryGame.sequence)) {
          const nextRound = memoryGame.round + 1;
          const newSequence = [...memoryGame.sequence, Math.floor(Math.random() * 4) + 1];
          setMemoryGame({
            active: true,
            sequence: newSequence,
            userSequence: [],
            round: nextRound
          });
          newHistory.push(`✅ Correct! Round ${nextRound}`);
          newHistory.push(`Sequence: ${newSequence.join(' ')}`);
          newHistory.push('');
        } else {
          newHistory.push(`
╔═══════════════════════════════════════════════════════════╗
║                   ❌ GAME OVER! ❌                        ║
╠═══════════════════════════════════════════════════════════╣
║  You reached Round ${memoryGame.round}                                    ║
║  The sequence was: ${memoryGame.sequence.join(' ').padEnd(33)}║
║                                                           ║
║  Type 'memory' to play again.                            ║
╚═══════════════════════════════════════════════════════════╝`);
          setMemoryGame({ ...memoryGame, active: false });
          newHistory.push('');
        }
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

    // Security quiz logic
    if (securityQuiz.active) {
      if (trimmedCmd === 'quit') {
        setSecurityQuiz({ ...securityQuiz, active: false });
        newHistory.push(`Quiz terminated. Final score: ${securityQuiz.score}/${securityQuestions.length}`);
        newHistory.push('');
      } else {
        const answer = parseInt(trimmedCmd);
        const currentQ = securityQuestions[securityQuiz.currentQuestion];
        const isCorrect = answer === currentQ.answer;
        const newScore = isCorrect ? securityQuiz.score + 1 : securityQuiz.score;
        const nextQuestion = securityQuiz.currentQuestion + 1;

        if (isCorrect) {
          newHistory.push(`✅ Correct!`);
        } else {
          newHistory.push(`❌ Wrong! The correct answer was ${currentQ.answer}`);
        }
        newHistory.push('');

        if (nextQuestion >= securityQuestions.length) {
          newHistory.push(`
╔═══════════════════════════════════════════════════════════╗
║                   🎉 QUIZ COMPLETED! 🎉                  ║
╠═══════════════════════════════════════════════════════════╣
║  Final Score: ${newScore}/${securityQuestions.length}                                       ║
║                                                           ║
║  ${newScore === securityQuestions.length ? 'Perfect score! You are a security expert!' : newScore >= 3 ? 'Good job! Keep learning!' : 'Keep studying security concepts!'.padEnd(56)}║
║                                                           ║
║  Type 'quiz' to play again.                              ║
╚═══════════════════════════════════════════════════════════╝`);
          setSecurityQuiz({ ...securityQuiz, active: false });
          newHistory.push('');
        } else {
          const nextQ = securityQuestions[nextQuestion];
          newHistory.push(`Question ${nextQuestion + 1}/${securityQuestions.length}: ${nextQ.question}`);
          nextQ.options.forEach(opt => newHistory.push(opt));
          newHistory.push('');
          setSecurityQuiz({
            ...securityQuiz,
            currentQuestion: nextQuestion,
            score: newScore
          });
        }
      }
      setHistory(newHistory);
      setInput('');
      return;
    }

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
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const newHistory = [...history, `┌──(root3301㉿kali)-[${currentPath}]`, `└─# ${input}`, '', matches.join('  '), ''];
        setHistory(newHistory);
      }
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
          <div className={`border ${matrixMode ? 'border-green-500 animate-pulse' : 'border-green-500/30'} rounded-lg p-4 bg-black shadow-lg shadow-green-500/10 transition-all duration-300 hover:border-green-500/50 hover:shadow-green-500/20`}>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {gameState.active ? 'GAME MODE' : suMode ? 'PASSWORD MODE' : 'root3301@kali: ~'}
              </span>
            </div>

            <div
              ref={outputRef}
              id="terminal-output"
              className={`h-96 overflow-y-auto mb-4 font-mono text-sm scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent ${matrixMode ? 'text-green-400' : ''}`}
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
                  className="flex-1 bg-transparent border-none outline-none terminal-cursor text-gray-300 font-mono text-sm placeholder:text-gray-600"
                  placeholder="Type 'help' for commands..."
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
