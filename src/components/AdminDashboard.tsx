import { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  recentViews: Array<{
    page_path: string;
    created_at: string;
    visitor_id: string;
  }>;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    recentViews: []
  });
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data: views, error } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      if (views) {
        const uniqueVisitors = new Set(views.map(v => v.visitor_id)).size;
        setAnalytics({
          totalViews: views.length,
          uniqueVisitors,
          recentViews: views
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Open Admin Dashboard"
      >
        <BarChart3 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold">Admin Dashboard</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading analytics...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-black border border-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-400">Total Views</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-500">{analytics.totalViews}</div>
                </div>

                <div className="p-4 bg-black border border-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-400">Unique Visitors</span>
                  </div>
                  <div className="text-3xl font-bold text-green-500">{analytics.uniqueVisitors}</div>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-4">
                <h3 className="font-bold mb-4 text-gray-300">Recent Activity</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {analytics.recentViews.map((view, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-900/50 rounded border border-gray-800/50"
                    >
                      <div className="flex-1">
                        <div className="font-mono text-sm text-gray-300">{view.page_path}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(view.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 font-mono">
                        {view.visitor_id.substring(0, 12)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
