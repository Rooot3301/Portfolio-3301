import { Terminal, Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (Demo mode)');
    setFormData({ email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="section-title">
          <Terminal className="w-5 h-5" />
          <span>/contact</span>
        </div>

        <div className="section-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="terminal-input">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Mail className="w-4 h-4" />
                <label htmlFor="email">user@root3301 ~ % enter email:</label>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">{'>'}</span>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-transparent border-none focus:outline-none terminal-cursor"
                  required
                />
              </div>
            </div>

            <div className="terminal-input">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Send className="w-4 h-4" />
                <label htmlFor="message">user@root3301 ~ % compose message:</label>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">{'>'}</span>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full p-2 bg-transparent border-none focus:outline-none terminal-cursor"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors terminal-cursor rounded-lg hover:border-red-500 transform hover:scale-105 duration-300"
            >
              ./send-message.sh
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
