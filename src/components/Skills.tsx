import { Terminal, Code2, Shield, Server, Database, Globe } from 'lucide-react';

export default function Skills() {
  const skills = [
    {
      icon: Shield,
      category: 'Security',
      items: ['Penetration Testing', 'Web App Security', 'Network Security', 'Exploit Development']
    },
    {
      icon: Code2,
      category: 'Development',
      items: ['Python', 'JavaScript/TypeScript', 'Go', 'Bash/Shell Scripting']
    },
    {
      icon: Server,
      category: 'Infrastructure',
      items: ['Linux/Unix', 'Docker', 'CI/CD', 'Cloud Security']
    },
    {
      icon: Database,
      category: 'Databases',
      items: ['SQL/NoSQL', 'PostgreSQL', 'Redis', 'Database Security']
    },
    {
      icon: Globe,
      category: 'Web Technologies',
      items: ['React', 'Node.js', 'API Security', 'OWASP Top 10']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/skills</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card p-6 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-4">
                <skill.icon className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-lg">{skill.category}</h3>
              </div>
              <ul className="space-y-1">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-red-500">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
