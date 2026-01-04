import { Terminal, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Scanner de Vulnérabilités',
      description: 'Scanner de vulnérabilités d\'applications web personnalisé développé en Python. Détecte les vulnérabilités OWASP courantes incluant XSS, SQLi et CSRF.',
      tags: ['Python', 'Sécurité', 'OWASP'],
      link: '#'
    },
    {
      title: 'Plateforme CTF',
      description: 'Plateforme Capture The Flag pour l\'entraînement et les compétitions en cybersécurité. Inclut des défis pour tous les niveaux.',
      tags: ['Node.js', 'React', 'Docker'],
      link: '#'
    },
    {
      title: 'Boîte à Outils Sécurité',
      description: 'Collection de scripts et outils de tests de pénétration pour la reconnaissance, l\'énumération et l\'exploitation.',
      tags: ['Bash', 'Python', 'Sécurité'],
      link: '#'
    },
    {
      title: 'Framework Sécurité API',
      description: 'Framework pour tester et sécuriser les API REST. Inclut des tests automatisés pour l\'authentification, l\'autorisation et les vulnérabilités d\'injection.',
      tags: ['TypeScript', 'Sécurité', 'API'],
      link: '#'
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
