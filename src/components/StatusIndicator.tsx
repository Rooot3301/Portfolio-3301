import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Status {
  current_status: string;
  status_message: string;
  updated_at: string;
}

export default function StatusIndicator() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('status')
          .select('current_status, status_message, updated_at')
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setStatus(data);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    const channel = supabase
      .channel('status_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'status' },
        (payload) => {
          if (payload.new && (payload.new as any).is_active) {
            setStatus(payload.new as Status);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading || !status) return null;

  const statusConfig = {
    available: {
      color: 'bg-green-500',
      text: 'Available',
      pulse: 'animate-pulse'
    },
    busy: {
      color: 'bg-red-500',
      text: 'Busy',
      pulse: ''
    },
    away: {
      color: 'bg-yellow-500',
      text: 'Away',
      pulse: ''
    }
  };

  const config = statusConfig[status.current_status as keyof typeof statusConfig] || statusConfig.available;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 border border-gray-800 rounded-full backdrop-blur-sm">
      <Activity className="w-3 h-3 text-gray-400" />
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse}`}></div>
        <span className="text-xs text-gray-300">{config.text}</span>
      </div>
      {status.status_message && (
        <span className="text-xs text-gray-500 ml-1">- {status.status_message}</span>
      )}
    </div>
  );
}
