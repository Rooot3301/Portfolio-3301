import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = Math.round((scrollTop / trackLength) * 100);

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalBars = 30;
  const filledBars = Math.round((scrollProgress / 100) * totalBars);

  const filled = '='.repeat(Math.max(0, filledBars));
  const empty = '-'.repeat(Math.max(0, totalBars - filledBars));

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-green-500/30 px-4 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs flex items-center justify-between gap-3">
          <span className="text-gray-500">root@kali:</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-green-400">[</span>
            <div className="flex-1 relative">
              <span className="text-green-400">{filled}</span>
              <span className="text-gray-700">{empty}</span>
            </div>
            <span className="text-green-400">]</span>
          </div>
          <span className="text-green-400 font-bold min-w-[3rem] text-right">{scrollProgress}%</span>
        </div>
      </div>
    </div>
  );
}
