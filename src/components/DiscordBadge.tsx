import { useEffect, useState } from 'react';

interface DiscordStatus {
  online: boolean;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activities?: Array<{
    name: string;
    type: number;
  }>;
}

export default function DiscordBadge() {
  const [status, setStatus] = useState<DiscordStatus>({ online: false, status: 'offline' });
  const DISCORD_ID = import.meta.env.VITE_DISCORD_USER_ID;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();

        if (data.success) {
          setStatus({
            online: data.data.discord_status !== 'offline',
            status: data.data.discord_status,
            activities: data.data.activities
          });
        }
      } catch (error) {
        console.error('Failed to fetch Discord status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status.status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status.status) {
      case 'online': return 'Available on Discord';
      case 'idle': return 'Away on Discord';
      case 'dnd': return 'Busy on Discord';
      default: return 'Offline on Discord';
    }
  };

  const currentActivity = status.activities?.find(a => a.type === 0); // Playing

  return (
    <a
      href={`https://discord.com/users/${DISCORD_ID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 transition-all duration-300"
    >
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        {status.online && (
          <div className={`absolute inset-0 w-2 h-2 rounded-full ${getStatusColor()} animate-ping opacity-75`} />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          {getStatusText()}
        </span>
        {currentActivity && (
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
            Playing {currentActivity.name}
          </span>
        )}
      </div>
    </a>
  );
}
