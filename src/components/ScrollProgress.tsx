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

  const totalBars = 20;
  const filledBars = Math.round((scrollProgress / 100) * totalBars);
  const progressBar = '>' + '-'.repeat(Math.max(0, filledBars - 1)) + '-'.repeat(Math.max(0, totalBars - filledBars));

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black border-b border-gray-800 px-4 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-sm text-gray-400 flex items-center justify-between">
          <span className="text-red-500">[{progressBar}]</span>
          <span className="ml-2 text-green-400">{scrollProgress}%</span>
        </div>
      </div>
    </div>
  );
}
