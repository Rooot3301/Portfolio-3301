import { Music, Gamepad2 } from 'lucide-react';
import { useDiscord } from '../hooks/useDiscord';

export default function DiscordActivityBadge() {
  const { data } = useDiscord();

  if (!data) return null;

  const gameActivity = data.activities?.find(a => a.type === 0);

  if (data.listening_to_spotify && data.spotify) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <Music className="w-4 h-4 text-green-500" />
        <span className="hidden sm:inline">Ecoute</span>
        <span className="font-medium text-white max-w-[200px] truncate">
          {data.spotify.song}
        </span>
        <span className="hidden md:inline text-slate-500">par {data.spotify.artist}</span>
      </div>
    );
  }

  if (gameActivity) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <Gamepad2 className="w-4 h-4 text-blue-500" />
        <span className="hidden sm:inline">Joue a</span>
        <span className="font-medium text-white max-w-[200px] truncate">
          {gameActivity.name}
        </span>
      </div>
    );
  }

  return null;
}
