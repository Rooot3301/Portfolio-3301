import { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  ip: string;
  action: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export default function HoneypotLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const actions = [
    { text: 'SSH brute force attempt detected', severity: 'high' as const },
    { text: 'SQL injection attempt blocked', severity: 'critical' as const },
    { text: 'Port scan detected', severity: 'medium' as const },
    { text: 'Suspicious login attempt from unknown location', severity: 'high' as const },
    { text: 'XSS payload detected and filtered', severity: 'medium' as const },
    { text: 'Directory traversal attempt blocked', severity: 'high' as const },
    { text: 'Multiple failed authentication attempts', severity: 'medium' as const },
    { text: 'Malicious file upload attempt prevented', severity: 'critical' as const },
    { text: 'Command injection attempt detected', severity: 'critical' as const },
    { text: 'Unauthorized API access attempt', severity: 'high' as const },
    { text: 'DDoS pattern detected - Rate limiting applied', severity: 'high' as const },
    { text: 'Reconnaissance activity detected', severity: 'low' as const }
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        ip: generateRandomIP(),
        action: action.text,
        severity: action.severity
      };

      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 border-red-500/30 bg-red-500/5';
      case 'high': return 'text-orange-500 border-orange-500/30 bg-orange-500/5';
      case 'medium': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5';
      case 'low': return 'text-blue-500 border-blue-500/30 bg-blue-500/5';
      default: return 'text-gray-500 border-gray-500/30 bg-gray-500/5';
    }
  };

  return (
    <section className="py-20 px-4 bg-black border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="section-title">
          <Shield className="w-5 h-5" />
          <span>/honeypot-logs</span>
        </div>

        <div className="section-content">
          <div className="border border-red-500/30 rounded-lg p-4 bg-gray-900/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-sm font-mono text-gray-400">
                  Real-time threat monitoring
                </span>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 text-xs border border-gray-700 hover:border-red-500 rounded transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Monitoring for threats...
                </div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${getSeverityColor(log.severity)} transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-500">[{log.timestamp}]</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            log.severity === 'critical' ? 'bg-red-500 text-white' :
                            log.severity === 'high' ? 'bg-orange-500 text-white' :
                            log.severity === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-blue-500 text-white'
                          }`}>
                            {log.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-gray-300">{log.action}</div>
                        <div className="text-gray-600 mt-1">Source: {log.ip}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-500 text-center">
              This is a simulated honeypot log for demonstration purposes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
