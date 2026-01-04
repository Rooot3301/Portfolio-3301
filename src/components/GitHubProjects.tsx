import { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Rooot3301/repos?sort=updated&per_page=10', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('GitHub API error:', response.status, errorData);
          throw new Error(`Failed to fetch repositories (${response.status})`);
        }

        const data = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section id="github-projects" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="section-title">
            <Github className="w-5 h-5" />
            <span>/github-projects</span>
          </div>
          <div className="text-center py-12 text-gray-400">
            <Code2 className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            Loading repositories...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-projects" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="section-title">
            <Github className="w-5 h-5" />
            <span>/github-projects</span>
          </div>
          <div className="text-center py-12 text-red-400">
            Error loading repositories: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github-projects" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Github className="w-5 h-5" />
          <span>/github-projects</span>
        </div>

        <div className="section-content">
          <div className="grid grid-cols-1 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-6 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 bg-gray-900/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Github className="w-4 h-4 text-gray-400" />
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="text-sm text-gray-400 mb-3">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <span className="text-xs">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-900 text-gray-300 rounded border border-gray-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/Rooot3301"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-800 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-lg"
            >
              <Github className="w-4 h-4" />
              View all on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
