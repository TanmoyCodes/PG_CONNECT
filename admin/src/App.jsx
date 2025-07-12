import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddPG from './pages/AddPG';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';

function App() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/check-auth/admin`, { withCredentials: true });
      console.log('Auth check response:', res);
      setIsAuthenticated(res.data.authenticated); // depends on your backend response
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Checking authentication...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-pg"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddPG />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
