import { Terminal, Code2, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/about</span>
        </div>

        <div className="section-content">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-red-500" />
                <span className="glitch-text" data-text="root3301">
                  root3301
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Security researcher, penetration tester, and cybersecurity enthusiast.
                Passionate about finding vulnerabilities, breaking systems (legally), and
                helping organizations improve their security posture.
              </p>
            </div>

            <div className="border-l-2 border-red-500 pl-3">
              <p className="text-sm text-gray-400 whitespace-pre-wrap">
                {`$ whoami
> Security researcher specializing in web application security,
  network penetration testing, and vulnerability research.

$ cat /etc/interests
> Web security, CTF competitions, exploit development,
  reverse engineering, and teaching others about cybersecurity.`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-red-500" />
              <span>Always learning, always hacking (ethically)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
