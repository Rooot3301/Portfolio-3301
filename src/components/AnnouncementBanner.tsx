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
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white overflow-hidden relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-2 px-4">
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <Megaphone className="w-4 h-4 flex-shrink-0" />
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap inline-block">
              {allMessages} • {allMessages}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          aria-label="Fermer l'annonce"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
