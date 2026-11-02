import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('authenticated_user')) || null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  const handleAuthSuccess = (userData) => {
    localStorage.setItem('authenticated_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated_user');
    setUser(null);
  };

  return (
    <div style={styles.appShell}>
      <Navbar user={user} onLogout={handleLogout} />
      {!user ? (
        authView === 'login' ? (
          <Login onLoginSuccess={handleAuthSuccess} onSwitchView={() => setAuthView('signup')} />
        ) : (
          <Signup onSignupSuccess={handleAuthSuccess} onSwitchView={() => setAuthView('login')} />
        )
      ) : (
        <Home user={user} />
      )}
    </div>
  );
}

const styles = {
  appShell: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
};
