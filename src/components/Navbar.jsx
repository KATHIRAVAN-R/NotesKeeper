import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <header style={styles.navbar}>
      <div style={styles.logo}>📝Zen Notes</div>
      {user && (
        <div style={styles.userSection}>
          <span style={styles.welcomeText}>Welcome, <strong>{user.name}</strong></span>
          <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      )}
    </header>
  );
}

const styles = {
  navbar: { height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  logo: { fontWeight: 'bold', fontSize: '1.25rem', color: '#1e293b' },
  userSection: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcomeText: { fontSize: '0.9rem', color: '#334155' },
  logoutBtn: { backgroundColor: '#f1f5f9', color: '#334155', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'background 0.2s' }
};
