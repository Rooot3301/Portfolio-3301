import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Megaphone, X } from 'lucide-react';

interface Announcement {
  id: string;
  message: string;
  order: number;
}

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('id, message, order')
      .eq('is_active', true)
      .order('order', { ascending: true });

    if (data && !error) {
      setAnnouncements(data);
    }
  };

  if (!isVisible || announcements.length === 0) return null;

  const allMessages = announcements.map(a => a.message).join(' • ');

  return (
    <div className="fixed top-24 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-green-500/30 shadow-lg shadow-green-500/5">
      <div className="max-w-7xl mx-auto py-2 px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <Megaphone className="w-4 h-4 text-green-500 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap inline-block text-sm font-mono text-green-400">
                {allMessages} • {allMessages}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-green-500/10 rounded transition-colors flex-shrink-0 text-green-500"
            aria-label="Fermer l'annonce"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
