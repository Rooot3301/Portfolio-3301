import { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, X, Megaphone, Plus, Trash2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdminLogin from './AdminLogin';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  recentViews: Array<{
    page_path: string;
    created_at: string;
    visitor_id: string;
  }>;
}

interface Announcement {
  id: string;
  message: string;
  is_active: boolean;
  order: number;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'announcements'>('analytics');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    recentViews: []
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsAuthenticated(false);
      return false;
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    const isAdmin = !!adminData;
    setIsAuthenticated(isAdmin);
    return isAdmin;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsAuthenticated(true);
  };

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

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('order', { ascending: true });

      if (data && !error) {
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) return;

    try {
      const maxOrder = announcements.length > 0
        ? Math.max(...announcements.map(a => a.order))
        : 0;

      const { error } = await supabase
        .from('announcements')
        .insert({
          message: newAnnouncement,
          is_active: true,
          order: maxOrder + 1
        });

      if (!error) {
        setNewAnnouncement('');
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const toggleAnnouncement = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !currentState })
        .eq('id', id);

      if (!error) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error toggling announcement:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const isAuth = await checkAuth();
        if (!isAuth) {
          setShowLogin(true);
        } else if (activeTab === 'analytics') {
          fetchAnalytics();
        } else {
          fetchAnnouncements();
        }
      })();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      if (activeTab === 'analytics') {
        fetchAnalytics();
      } else {
        fetchAnnouncements();
      }
    }
  }, [isAuthenticated]);

  if (showLogin) {
    return <AdminLogin onClose={() => { setShowLogin(false); setIsOpen(false); }} onLoginSuccess={handleLoginSuccess} />;
  }

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold">Admin Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-500"
              aria-label="Déconnexion"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'analytics'
                ? 'bg-black text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'announcements'
                ? 'bg-black text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            Annonces
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'analytics' && (
            <>
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
            </>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-4">
              <div className="bg-black border border-gray-800 rounded-lg p-4">
                <h3 className="font-bold mb-4 text-gray-300">Nouvelle annonce</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAnnouncement()}
                    placeholder="Tapez votre annonce..."
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={addAnnouncement}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-4">
                <h3 className="font-bold mb-4 text-gray-300">Annonces actives</h3>
                <div className="space-y-2">
                  {announcements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucune annonce</div>
                  ) : (
                    announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="flex items-center justify-between p-3 bg-gray-900/50 rounded border border-gray-800/50"
                      >
                        <div className="flex-1">
                          <div className="text-gray-300">{announcement.message}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Ordre: {announcement.order}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAnnouncement(announcement.id, announcement.is_active)}
                            className={`px-3 py-1 rounded text-xs transition-colors ${
                              announcement.is_active
                                ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                          >
                            {announcement.is_active ? 'Active' : 'Inactive'}
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(announcement.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
