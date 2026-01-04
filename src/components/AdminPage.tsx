import { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Megaphone, Plus, Trash2, LogOut, Activity, Terminal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { navigate } from './Router';

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

interface Status {
  current_status: string;
  status_message: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'announcements' | 'status'>('analytics');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    recentViews: []
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [status, setStatus] = useState<Status>({
    current_status: 'available',
    status_message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'analytics') {
        fetchAnalytics();
      } else if (activeTab === 'announcements') {
        fetchAnnouncements();
      } else if (activeTab === 'status') {
        fetchStatus();
      }
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      setIsAuthenticated(!!adminData);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (!adminData) {
          await supabase.auth.signOut();
          throw new Error('Accès non autorisé');
        }

        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchAnalytics = async () => {
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

  const fetchStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('status')
        .select('current_status, status_message')
        .eq('is_active', true)
        .maybeSingle();

      if (data && !error) {
        setStatus(data);
        setStatusMessage(data.status_message || '');
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const updateStatus = async (newStatus: string) => {
    try {
      await supabase
        .from('status')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      const { error } = await supabase
        .from('status')
        .insert({
          current_status: newStatus,
          status_message: statusMessage,
          is_active: true
        });

      if (!error) {
        setStatus({ current_status: newStatus, status_message: statusMessage });
      }
    } catch (error) {
      console.error('Error updating status:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
              <div className="flex items-center justify-center gap-3">
                <Terminal className="w-8 h-8 text-white" />
                <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              </div>
              <p className="text-red-100 text-center mt-2 text-sm">Panneau d'administration sécurisé</p>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-500 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="admin@root3301.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Retour au site
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>Accès réservé aux administrateurs</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Retour au site
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-500 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex border-b border-gray-800 mb-6">
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
          <button
            onClick={() => setActiveTab('status')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'status'
                ? 'bg-black text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Activity className="w-4 h-4" />
            Statut
          </button>
        </div>

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-400">Total Views</span>
                </div>
                <div className="text-4xl font-bold text-blue-500">{analytics.totalViews}</div>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-400">Unique Visitors</span>
                </div>
                <div className="text-4xl font-bold text-green-500">{analytics.uniqueVisitors}</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-gray-300 text-lg">Recent Activity</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {analytics.recentViews.map((view, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-black rounded border border-gray-800"
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
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-gray-300 text-lg">Nouvelle annonce</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAnnouncement()}
                  placeholder="Tapez votre annonce..."
                  className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={addAnnouncement}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-gray-300 text-lg">Annonces actives</h3>
              <div className="space-y-2">
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Aucune annonce</div>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="flex items-center justify-between p-4 bg-black rounded border border-gray-800"
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

        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-gray-300 text-lg">Statut actuel</h3>
              <div className="flex items-center gap-3 mb-6 p-4 bg-black rounded-lg border border-gray-800">
                <Activity className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-300 capitalize">{status.current_status}</div>
                  {status.status_message && (
                    <div className="text-sm text-gray-500 mt-1">{status.status_message}</div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message de statut (optionnel)
                  </label>
                  <input
                    type="text"
                    value={statusMessage}
                    onChange={(e) => setStatusMessage(e.target.value)}
                    placeholder="Ex: En réunion jusqu'à 17h"
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Changer le statut
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => updateStatus('available')}
                      className="flex items-center justify-center gap-2 p-4 bg-black border-2 border-green-500/50 hover:border-green-500 rounded-lg transition-colors group"
                    >
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-green-500 font-semibold group-hover:text-green-400">Available</span>
                    </button>
                    <button
                      onClick={() => updateStatus('busy')}
                      className="flex items-center justify-center gap-2 p-4 bg-black border-2 border-red-500/50 hover:border-red-500 rounded-lg transition-colors group"
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-red-500 font-semibold group-hover:text-red-400">Busy</span>
                    </button>
                    <button
                      onClick={() => updateStatus('away')}
                      className="flex items-center justify-center gap-2 p-4 bg-black border-2 border-yellow-500/50 hover:border-yellow-500 rounded-lg transition-colors group"
                    >
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-yellow-500 font-semibold group-hover:text-yellow-400">Away</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
