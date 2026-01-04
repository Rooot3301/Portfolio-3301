import { Terminal, Mail, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message envoyé ! (Mode démo)');
    setFormData({ email: '', message: '' });
  };

  return (
    <section id="contact" className="py-12 md:py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/contact</span>
        </div>

        <div className="section-content">
          <div className="mb-6 md:mb-8 p-3 md:p-4 border border-gray-800 rounded-lg bg-gray-950">
            <div className="flex items-center gap-2 mb-2 text-red-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs md:text-sm font-mono">Autres moyens de contact:</span>
            </div>
            <div className="text-gray-400 text-xs md:text-sm font-mono">
              <span className="text-gray-500">$</span> Discord: <span className="text-green-400">root3301</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="terminal-input">
              <div className="flex items-center gap-2 text-xs md:text-sm mb-2">
                <Mail className="w-4 h-4" />
                <label htmlFor="email" className="break-words">user@root3301 ~ % entrez votre email:</label>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-400">{'>'}</span>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-transparent border-none focus:outline-none terminal-cursor text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <div className="terminal-input">
              <div className="flex items-center gap-2 text-xs md:text-sm mb-2">
                <Send className="w-4 h-4" />
                <label htmlFor="message" className="break-words">user@root3301 ~ % rédigez votre message:</label>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-400">{'>'}</span>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full p-2 bg-transparent border-none focus:outline-none terminal-cursor text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base border border-gray-800 hover:bg-gray-900 transition-colors terminal-cursor rounded-lg hover:border-red-500 transform hover:scale-105 duration-300"
            >
              ./send-message.sh
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
