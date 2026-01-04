import { Terminal, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-32 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Terminal className="w-12 h-12 text-red-500 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="glitch-text" data-text="root3301">
            root3301
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 font-mono">
          $ whoami
          <br />
          <span className="text-red-500">&gt;</span> Spécialiste en Cybersécurité & Systèmes
          <br />
          <span className="text-red-500">&gt;</span> Chercheur en Sécurité | Pentester | Joueur CTF
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToAbout();
            }}
            className="px-6 py-3 border border-gray-800 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-lg transform hover:scale-105"
          >
            ./explore.sh
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition-colors rounded-lg transform hover:scale-105 duration-300"
          >
            ./contact.sh
          </a>
        </div>

        <button
          onClick={scrollToAbout}
          className="animate-bounce text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
