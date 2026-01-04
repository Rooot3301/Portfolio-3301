import { useState, useEffect, ReactNode } from 'react';

interface RouteProps {
  path: string;
  children: ReactNode;
}

export function Route({ children }: RouteProps) {
  return <>{children}</>;
}

interface RouterProps {
  children: ReactNode;
}

export function Router({ children }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const routes = Array.isArray(children) ? children : [children];
  const matchedRoute = routes.find((route: any) => {
    if (route.props.path === currentPath) return true;
    if (route.props.path === '/' && currentPath === '/') return true;
    return false;
  });

  return matchedRoute || routes.find((route: any) => route.props.path === '/') || null;
}

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
