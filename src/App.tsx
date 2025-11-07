import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Games from './pages/Games';
import Progress from './pages/Progress';

export default function App() {
  const { loadUserFromStorage } = useUserStore();

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="stories" element={<div>Stories Page (próximamente)</div>} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </Router>
  );
}