import { Music, Gamepad2, Code } from 'lucide-react';
import { useDiscord } from '../hooks/useDiscord';

export default function DiscordProfileCard() {
  const { data, loading } = useDiscord();

  if (loading || !data) {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-6 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-slate-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-slate-700 rounded w-32"></div>
            <div className="h-4 bg-slate-700 rounded w-24"></div>
          </div>
        </div>
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
      case 'online': return 'En ligne';
      case 'idle': return 'Absent';
      case 'dnd': return 'Ne pas deranger';
      default: return 'Hors ligne';
    }
  };

  const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`;
  const displayName = data.discord_user.global_name || data.discord_user.username;

  const gameActivity = data.activities?.find(a => a.type === 0);
  const customActivity = data.activities?.find(a => a.type === 4);

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 shadow-xl">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-20 h-20 rounded-full border-4 border-slate-800"
          />
          <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-slate-800 ${getStatusColor()}`}>
            {data.discord_status === 'online' && (
              <div className={`absolute inset-0 rounded-full ${getStatusColor()} animate-ping opacity-75`}></div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{displayName}</h3>
          <p className="text-sm text-slate-400">
            {data.discord_user.username}
            {data.discord_user.discriminator !== '0' && `#${data.discord_user.discriminator}`}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-xs text-slate-400">{getStatusText()}</span>
          </div>
        </div>
      </div>

      {data.listening_to_spotify && data.spotify && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold text-green-500">Ecoute sur Spotify</span>
          </div>
          <div className="flex gap-3">
            <img
              src={data.spotify.album_art_url}
              alt={data.spotify.album}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{data.spotify.song}</p>
              <p className="text-xs text-slate-400 truncate">{data.spotify.artist}</p>
            </div>
          </div>
        </div>
      )}

      {gameActivity && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-blue-500">En train de jouer</span>
          </div>
          <div className="flex gap-3">
            {gameActivity.assets?.large_image && (
              <img
                src={gameActivity.assets.large_image.startsWith('mp:')
                  ? `https://media.discordapp.net/${gameActivity.assets.large_image.slice(3)}`
                  : `https://cdn.discordapp.com/app-assets/${gameActivity.name}/${gameActivity.assets.large_image}.png`
                }
                alt={gameActivity.name}
                className="w-12 h-12 rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{gameActivity.name}</p>
              {gameActivity.details && (
                <p className="text-xs text-slate-400 truncate">{gameActivity.details}</p>
              )}
              {gameActivity.state && (
                <p className="text-xs text-slate-500 truncate">{gameActivity.state}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {customActivity && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-500" />
            <p className="text-sm text-slate-300">{customActivity.state}</p>
          </div>
        </div>
      )}

      <a
        href={`https://discord.com/users/${data.discord_user.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Ouvrir dans Discord
      </a>
    </div>
  );
}
