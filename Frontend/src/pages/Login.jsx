// src/pages/Login.jsx
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/api/auth/login', form);
      localStorage.setItem('token', data.token);
      navigate('/notes');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>🔐</span>
          <h2 style={styles.title}>Login</h2>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordField}>
              <input
                style={styles.input}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                style={styles.togglePasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '✓ Login'}
          </button>
        </form>

        <p style={styles.link}>
          Don't have an account?{' '}
          <Link style={styles.linkButton} to="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    background: 'white',
    padding: '3rem',
    borderRadius: '18px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    zIndex: 1,
    animation: 'cardSlideUp 0.6s ease',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  icon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
    animation: 'bounce 2s ease infinite',
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
    color: '#333',
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  group: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.65rem',
    color: '#555',
    fontSize: '0.95rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '0.95rem 1.1rem',
    border: '2px solid #e0e7ff',
    borderRadius: '10px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  passwordField: {
    position: 'relative',
    display: 'flex',
  },
  togglePasswordBtn: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.5rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.05rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.75rem',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
  },
  errorBox: {
    background: '#fef2f2',
    color: '#c53030',
    padding: '1rem 1.25rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    border: '2px solid #fecaca',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    animation: 'slideDown 0.3s ease',
  },
  link: {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#666',
    fontSize: '0.95rem',
  },
  linkButton: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default Login;