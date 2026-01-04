import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;

      if (trackLength <= 0) {
        setScrollProgress(100);
        return;
      }

      const progress = (scrollTop / trackLength) * 100;
      const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

      setScrollProgress(roundedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalBars = 30;
  const filledBars = Math.ceil((scrollProgress / 100) * totalBars);

  const filled = '█'.repeat(Math.max(0, Math.min(totalBars, filledBars)));
  const empty = '░'.repeat(Math.max(0, totalBars - filledBars));

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-green-500/30 px-4 py-2 shadow-lg shadow-green-500/5">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs flex items-center justify-between gap-3">
          <span className="text-gray-500 font-semibold">root@kali:</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-green-500 font-bold">[</span>
            <div className="flex-1 relative h-4 flex items-center">
              <span className={`text-green-500 transition-all duration-150 ${scrollProgress === 100 ? 'text-green-400' : ''}`}>
                {filled}
              </span>
              <span className="text-gray-800">{empty}</span>
            </div>
            <span className="text-green-500 font-bold">]</span>
          </div>
          <span className={`font-bold min-w-[3rem] text-right transition-colors duration-150 ${
            scrollProgress === 100 ? 'text-green-400' : 'text-green-500'
          }`}>
            {scrollProgress}%
          </span>
        </div>
      </div>
    </div>
  );
}
