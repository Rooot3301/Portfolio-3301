import { Terminal, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/about</span>
        </div>

        <div className="section-content">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                <span className="glitch-text" data-text="root3301">
                  root3301
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Technicien passionné en cybersécurité, je suis spécialisé
                dans la protection et la sécurisation des infrastructures
                informatiques. Mon expertise couvre l'aspect défensif
                de la sécurité avec une préférence marquée pour le Red Team.
              </p>
            </div>

            <div className="border-l-2 border-red-500 pl-3 overflow-x-auto">
              <p className="text-xs md:text-sm text-gray-400 whitespace-pre-wrap">
                {`$ cat /usr/experience
> Virtualisation (VMware, Proxmox)
> Audit de sécurité
> Forensics & Investigation
> Administration système Linux/Windows
> Sécurité réseau & Monitoring
> Gestion des incidents de sécurité

$ ls /tools/
> Wireshark, Nmap
> Snort, Suricata
> Kali Linux, ParrotOS
> SIEM & Log Analysis
> Vulnerability Assessment Tools

$ cat /certifications
> Veille technologique active
> Participation à des CTF
> Labs & Environnements de test`}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
