import { useDiscord } from '../hooks/useDiscord';

export default function DiscordBadge() {
  const { data } = useDiscord();
  const DISCORD_ID = import.meta.env.VITE_DISCORD_USER_ID;

  if (!data) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 animate-pulse">
        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        <span className="text-xs font-medium text-slate-300">Loading...</span>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (data.discord_status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (data.discord_status) {
      case 'online': return 'Disponible sur Discord';
      case 'idle': return 'Absent sur Discord';
      case 'dnd': return 'Occupe sur Discord';
      default: return 'Hors ligne sur Discord';
    }
  };

  const gameActivity = data.activities?.find(a => a.type === 0);
  const isOnline = data.discord_status !== 'offline';

  return (
    <a
      href={`https://discord.com/users/${DISCORD_ID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 transition-all duration-300"
    >
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        {isOnline && (
          <div className={`absolute inset-0 w-2 h-2 rounded-full ${getStatusColor()} animate-ping opacity-75`} />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          {getStatusText()}
        </span>
        {data.listening_to_spotify && data.spotify && (
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
            Ecoute {data.spotify.song}
          </span>
        )}
        {!data.listening_to_spotify && gameActivity && (
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
            Joue a {gameActivity.name}
          </span>
        )}
      </div>
    </a>
  );
}
