import { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const getVisitorId = () => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useAnalytics = () => {
  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.log('Analytics disabled: Supabase not configured');
      return;
    }

    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;

        await supabase.from('page_views').insert({
          page_path: pagePath,
          visitor_id: visitorId,
          user_agent: userAgent,
          referrer: referrer
        });
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, []);

  return null;
};
