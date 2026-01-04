import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    'Initialisation des systèmes root3301...',
    'Chargement des modules kernel... [OK]',
    'Montage des systèmes de fichiers... [OK]',
    'Démarrage des services réseau... [OK]',
    'Initialisation des protocoles de sécurité... [OK]',
    'Chargement de l\'interface utilisateur... [OK]',
    'Système prêt.'
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        setProgress(((currentLog + 1) / bootLogs.length) * 100);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 500);
      }
    }, 300);

    return () => clearInterval(logInterval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black text-green-600 flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-2xl font-bold">root3301.sh</h1>
        </div>

        <div className="space-y-2 mb-8">
          {logs.map((log, index) => (
            <div key={index} className="text-sm animate-fade-in-up">
              {log}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-center">
          {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
