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
                Spécialiste en cybersécurité et systèmes, chercheur en sécurité et pentester.
                Experte en hardening de systèmes Windows/Linux, monitoring, analyse OSINT,
                administration réseau et virtualisation. Passionnée par la découverte de vulnérabilités,
                le cassage de systèmes (légalement) et l'aide aux organisations pour améliorer
                leur posture de sécurité.
              </p>
            </div>

            <div className="border-l-2 border-red-500 pl-3">
              <p className="text-sm text-gray-400 whitespace-pre-wrap">
                {`$ whoami
> Spécialiste en cybersécurité spécialisée dans le hardening de systèmes,
  les tests de pénétration, l'analyse OSINT et l'administration d'infrastructures.

$ cat /etc/specialties
> Hardening Windows/Linux, Vulnérabilités, Monitoring
> OSINT & Analyse, Collecte automatisée, Reconnaissance
> Firewalling, VLAN, Analyse de trafic réseau
> Virtualisation ESXi/VMware, Sauvegardes, AD/GPO
> Automatisation PowerShell/Python, Scripts d'audit

$ cat /etc/interests
> Sécurité web, compétitions CTF, développement d'exploits,
  rétro-ingénierie et enseignement de la cybersécurité.`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-red-500" />
              <span>Toujours en apprentissage, toujours en train de hacker (éthiquement)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
