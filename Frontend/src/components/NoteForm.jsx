import { useState } from 'react';

const NoteForm = ({ onSubmit, isLoading = false }) => {
  const [form, setForm] = useState({ 
    title: '', 
    body: '',
    category: 'personal',
    color: '#ffd93d'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    if (form.body.length < 5) {
      setError('Note must be at least 5 characters');
      return;
    }

    try {
      await onSubmit(form);
      setForm({ title: '', body: '', category: 'personal', color: '#ffd93d' });
      setSuccess('Note created successfully! ✨');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create note');
    }
  };

  const titleLength = form.title.length;
  const bodyLength = form.body.length;
  const colors = ['#ffd93d', '#ff6b6b', '#6bcf7f', '#4d96ff', '#a78bfa', '#f472b6'];
  const categories = ['personal', 'work', 'ideas', 'todo', 'archive'];

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.formHeader}>
        <h3 style={styles.formTitle}>✏️ Create New Note</h3>
        <span style={styles.sparkle}>✨</span>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {success && (
        <div style={styles.successBox}>
          <span>{success}</span>
        </div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Title
          <span style={styles.charCount}>
            {titleLength}/120
          </span>
        </label>
        <input
          style={styles.input}
          type="text"
          name="title"
          placeholder="Give your note a catchy title..."
          value={form.title}
          onChange={handleChange}
          maxLength="120"
          disabled={isLoading}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.halfGroup}>
          <label style={styles.label}>Category</label>
          <select
            style={styles.select}
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={isLoading}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={styles.halfGroup}>
          <label style={styles.label}>Color</label>
          <div style={styles.colorPicker}>
            {colors.map(col => (
              <button
                key={col}
                type="button"
                style={{
                  ...styles.colorOption,
                  background: col,
                  border: form.color === col ? '3px solid #333' : '2px solid #ddd',
                  transform: form.color === col ? 'scale(1.1)' : 'scale(1)',
                }}
                onClick={() => setForm(prev => ({ ...prev, color: col }))}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Body
          <span style={styles.charCount}>
            {bodyLength}/1000
          </span>
        </label>
        <textarea
          style={styles.textarea}
          name="body"
          placeholder="Write your thoughts, ideas, or reminders... (minimum 5 characters)"
          value={form.body}
          onChange={handleChange}
          rows="5"
          maxLength="1000"
          disabled={isLoading}
        />
      </div>

      <button
        style={{
          ...styles.button,
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        type="submit"
        disabled={isLoading || !form.title.trim() || form.body.length < 5}
      >
        {isLoading ? (
          <>
            <span style={styles.spinner}>↻</span> Creating...
          </>
        ) : (
          '➕ Create Note'
        )}
      </button>
    </form>
  );
};

const styles = {
  form: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
    padding: '2rem',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
    border: '1px solid #f0f4ff',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  formTitle: {
    marginTop: 0,
    marginBottom: 0,
    color: '#333',
    fontSize: '1.3rem',
    fontWeight: '700',
  },
  sparkle: {
    fontSize: '1.5rem',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.25rem',
  },
  halfGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    color: '#555',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  charCount: {
    color: '#999',
    fontSize: '0.8rem',
    fontWeight: 'normal',
  },
  input: {
    width: '100%',
    padding: '0.85rem',
    border: '2px solid #e0e7ff',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  select: {
    width: '100%',
    padding: '0.85rem',
    border: '2px solid #e0e7ff',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    background: 'white',
  },
  colorPicker: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  textarea: {
    width: '100%',
    padding: '0.85rem',
    border: '2px solid #e0e7ff',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '0.95rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  spinner: {
    display: 'inline-block',
    animation: 'spin 1s linear infinite',
  },
  errorBox: {
    background: '#fee',
    color: '#c53030',
    padding: '0.9rem 1.25rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '2px solid #fcc',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    fontSize: '0.95rem',
    animation: 'slideIn 0.3s ease',
  },
  errorIcon: {
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  successBox: {
    background: '#f0fdf4',
    color: '#166534',
    padding: '0.9rem 1.25rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '2px solid #dcfce7',
    fontSize: '0.95rem',
    animation: 'slideIn 0.3s ease',
  },
};

export default NoteForm;
