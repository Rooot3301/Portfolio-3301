import { useEffect, useState } from 'react';

export interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface DiscordActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface DiscordData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    global_name?: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: DiscordActivity[];
  spotify?: SpotifyData;
  listening_to_spotify: boolean;
}

export function useDiscord() {
  const [data, setData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);
  const DISCORD_ID = import.meta.env.VITE_DISCORD_USER_ID;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch Discord data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);

    return () => clearInterval(interval);
  }, [DISCORD_ID]);

  return { data, loading };
}
