import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>🚗 Smart Parking System</h1>
        <div className="header-right">
          <div className="live-clock">
            {currentTime.toLocaleString('en-IN', { 
              dateStyle: 'medium', 
              timeStyle: 'short' 
            })}
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {!user ? (
          <Login setUser={setUser} />
        ) : user.role === 'ADMIN' ? (
          <AdminDashboard user={user} />
        ) : (
          <Dashboard user={user} />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Smart Parking System | Powered by React & Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;