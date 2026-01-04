import { Users, Hash } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ServerData {
  id: string;
  name: string;
  presence_count: number;
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
}

export default function DiscordServerWidget() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const SERVER_ID = import.meta.env.VITE_DISCORD_SERVER_ID;

  useEffect(() => {
    if (!SERVER_ID) return;

    const fetchServerData = async () => {
      try {
        const response = await fetch(
          `https://discord.com/api/v10/invites/${SERVER_ID}?with_counts=true&with_expiration=true`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setServerData({
            id: data.guild.id,
            name: data.guild.name,
            presence_count: data.approximate_presence_count,
            channels: data.guild.channels || [],
          });
        }
      } catch (error) {
        console.error('Failed to fetch Discord server data:', error);
      }
    };

    fetchServerData();
    const interval = setInterval(fetchServerData, 60000);

    return () => clearInterval(interval);
  }, [SERVER_ID]);

  if (!serverData || !SERVER_ID) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Mon Serveur Discord</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-400">{serverData.presence_count} en ligne</span>
        </div>
      </div>

      <div className="space-y-3">
        {serverData.channels.slice(0, 3).map((channel) => (
          <div key={channel.id} className="flex items-center gap-2 text-sm text-slate-300">
            <Hash className="w-4 h-4 text-slate-500" />
            <span>{channel.name}</span>
          </div>
        ))}
      </div>

      <a
        href={`https://discord.gg/${SERVER_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <Users className="w-4 h-4" />
        Rejoindre le serveur
      </a>
    </div>
  );
}
