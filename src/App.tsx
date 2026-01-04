import { useState } from 'react';
import { Router, Route } from './components/Router';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import LoadingScreen from './components/LoadingScreen';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  useAnalytics();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
    </Router>
  );
}

export default App;
