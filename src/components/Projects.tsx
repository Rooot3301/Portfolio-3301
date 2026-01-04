import { Terminal, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Vulnerability Scanner',
      description: 'Custom web application vulnerability scanner built with Python. Scans for common OWASP vulnerabilities including XSS, SQLi, and CSRF.',
      tags: ['Python', 'Security', 'OWASP'],
      link: '#'
    },
    {
      title: 'CTF Platform',
      description: 'Capture The Flag platform for cybersecurity training and competitions. Includes challenges for various skill levels.',
      tags: ['Node.js', 'React', 'Docker'],
      link: '#'
    },
    {
      title: 'Security Toolkit',
      description: 'Collection of penetration testing scripts and tools for reconnaissance, enumeration, and exploitation.',
      tags: ['Bash', 'Python', 'Security'],
      link: '#'
    },
    {
      title: 'API Security Framework',
      description: 'Framework for testing and securing REST APIs. Includes automated testing for authentication, authorization, and injection vulnerabilities.',
      tags: ['TypeScript', 'Security', 'API'],
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
