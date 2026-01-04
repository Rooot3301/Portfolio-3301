import { Terminal, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Syffer',
      description: 'Outil de Capture de Paquets et de Scan Réseau en ligne de commande. Permet de capturer des paquets réseau et de scanner les appareils connectés au réseau local avec des fonctionnalités OSINT.',
      tags: ['Python', 'Réseau', 'Sécurité'],
      link: 'https://github.com/Rooot3301/SYFFER'
    },
    {
      title: 'NetTrace',
      description: 'Outil OSINT complet d\'analyse de domaines développé en Python pur sans dépendance à des APIs payantes. Permet une reconnaissance passive approfondie sur n\'importe quel domaine.',
      tags: ['Python', 'OSINT', 'Reconnaissance'],
      link: 'https://github.com/Rooot3301/NETTRACE'
    },
    {
      title: 'Sentinelize',
      description: 'SentinelOne Agent Manager v2.0 - Script Bash avancé pour la gestion complète de l\'agent SentinelOne sur Linux avec une interface organisée en sous-menus.',
      tags: ['Bash', 'Linux', 'SentinelOne'],
      link: 'https://github.com/Rooot3301/Sentinelize'
    },
    {
      title: 'Ninjaa',
      description: 'RMM Agent Manager v2.0 - Script shell avancé pour gérer l\'installation, la mise à jour, la vérification et la désinstallation d\'agents RMM sur des machines Linux (RPM et DEB).',
      tags: ['Bash', 'Linux', 'RMM'],
      link: 'https://github.com/Rooot3301/Ninjaa'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card p-6 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <a
                  href={project.link}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="View project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-900 text-gray-300 rounded border border-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
