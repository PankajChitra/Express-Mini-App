import { useState } from 'react';

const Navbar = ({ onLogout }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <span style={{ ...styles.brandIcon, animation: hovering ? 'bounce 0.6s ease' : 'float 3s ease-in-out infinite' }}>
          📝
        </span>
        <div>
          <h1 style={styles.brandText}>Notes App</h1>
          <p style={styles.tagline}>Stay organized, stay inspired</p>
        </div>
      </div>
      
      <div style={styles.rightSection}>
        <div style={styles.stats}>
          <span style={styles.statItem}>✨ Your Creative Space</span>
        </div>
        <button
          style={{
            ...styles.logoutBtn,
            background: hovering ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
          }}
          onClick={onLogout}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          title="Sign out"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
    marginBottom: '2rem',
    borderBottom: '3px solid rgba(255,255,255,0.1)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  brandIcon: {
    fontSize: '2.5rem',
    display: 'inline-block',
  },
  brandText: {
    color: 'white',
    margin: '0 0 0.25rem 0',
    fontSize: '1.8rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '500',
    letterSpacing: '0.5px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  stats: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: '0.95rem',
    fontWeight: '600',
    textAlign: 'right',
  },
  statItem: {
    display: 'block',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    padding: '0.6rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
};

export default Navbar;

// export default Navbar;
