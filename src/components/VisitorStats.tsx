import { useEffect, useState } from 'react';
import { Users, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function VisitorStats() {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: views, error } = await supabase
          .from('page_views')
          .select('visitor_id');

        if (error) throw error;

        if (views) {
          const uniqueVisitors = new Set(views.map(v => v.visitor_id)).size;
          setStats({
            totalViews: views.length,
            uniqueVisitors
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const channel = supabase
      .channel('page_views_stats')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'page_views' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-gray-900/95 border border-gray-800 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-gray-300">{stats.totalViews}</span>
          </div>
          <div className="h-3 w-px bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-mono text-gray-300">{stats.uniqueVisitors}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
