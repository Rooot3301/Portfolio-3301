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

  const totalBars = 20;
  const position = Math.floor((scrollProgress / 100) * totalBars);

  const beforeArrow = '-'.repeat(Math.max(0, position));
  const arrow = scrollProgress < 100 ? '>' : '=';
  const afterArrow = '-'.repeat(Math.max(0, totalBars - position - 1));

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-green-500/30 px-4 py-2 shadow-lg shadow-green-500/5">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs flex items-center justify-between gap-3">
          <span className="text-gray-500 font-semibold">root@kali:</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-green-500">[</span>
            <div className="flex-1 relative flex items-center font-mono">
              <span className="text-gray-700">{beforeArrow}</span>
              <span className={`transition-colors duration-150 ${scrollProgress === 100 ? 'text-green-400' : 'text-green-500'}`}>
                {arrow}
              </span>
              <span className="text-gray-700">{afterArrow}</span>
            </div>
            <span className="text-green-500">]</span>
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
