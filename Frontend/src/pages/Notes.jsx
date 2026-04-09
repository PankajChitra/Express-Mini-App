import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await API.get('/api/notes');
      const normalized = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.notes)
          ? data.notes
          : [];
      setNotes(normalized);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to load notes. Please try again.'
      );
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchNotes();
  }, []);

  const handleCreateNote = async (form) => {
    setCreating(true);
    setError('');
    try {
      const { data } = await API.post('/api/notes', form);
      const created = data?.data || data?.note;
      if (created) {
        setNotes((prev) => [created, ...prev]);
      }
    } catch (err) {
      throw new Error(
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors[0]?.msg
          : '') ||
        err.message ||
        'Failed to create note'
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      throw new Error(
        err.response?.data?.error ||
        err.message ||
        'Failed to delete note'
      );
    }
  };

  const handleEditNote = async (id, updatedData) => {
    try {
      const { data } = await API.put(`/api/notes/${id}`, updatedData);
      const saved = data?.data;

      setNotes((prev) =>
        prev.map((note) =>
          note._id === id
            ? { ...note, ...(saved || updatedData) }
            : note
        )
      );
    } catch (err) {
      throw new Error(
        err.response?.data?.error ||
        err.message ||
        'Failed to edit note'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filter notes based on search and category
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'personal', 'work', 'ideas', 'todo', 'archive'];
  const categoryEmoji = {
    all: '📚',
    personal: '🌟',
    work: '💼',
    ideas: '💡',
    todo: '✓',
    archive: '📦',
  };

  const stats = {
    total: notes.length,
    personal: notes.filter((n) => n.category === 'personal').length,
    work: notes.filter((n) => n.category === 'work').length,
    ideas: notes.filter((n) => n.category === 'ideas').length,
  };

  return (
    <div style={styles.layout}>
      <Navbar onLogout={handleLogout} />

      <main style={styles.mainContent}>
        <div style={styles.container}>
          {/* Stats Dashboard */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>📊</span>
              <div>
                <div style={styles.statLabel}>Total Notes</div>
                <div style={styles.statValue}>{stats.total}</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>🌟</span>
              <div>
                <div style={styles.statLabel}>Personal</div>
                <div style={styles.statValue}>{stats.personal}</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>💼</span>
              <div>
                <div style={styles.statLabel}>Work</div>
                <div style={styles.statValue}>{stats.work}</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>💡</span>
              <div>
                <div style={styles.statLabel}>Ideas</div>
                <div style={styles.statValue}>{stats.ideas}</div>
              </div>
            </div>
          </div>

          {/* Create Note Form */}
          <NoteForm onSubmit={handleCreateNote} isLoading={creating} />

          {/* Search Bar */}
          <div style={styles.searchSection}>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="🔍 Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div style={styles.filterSection}>
            <div style={styles.filterLabel}>Filter by Category</div>
            <div style={styles.categoryButtons}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  style={{
                    ...styles.categoryBtn,
                    background:
                      selectedCategory === cat
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f0f0f0',
                    color: selectedCategory === cat ? 'white' : '#555',
                    boxShadow:
                      selectedCategory === cat
                        ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                        : 'none',
                  }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryEmoji[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={styles.errorBanner}>
              <span style={styles.errorIcon}>❌</span>
              <div>
                <div style={styles.errorTitle}>Error</div>
                <div style={styles.errorMessage}>{error}</div>
              </div>
              <button
                style={styles.dismissBtn}
                onClick={() => setError('')}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          )}

          {/* Notes Section */}
          <div style={styles.notesSection}>
            <h2 style={styles.sectionTitle}>
              {searchTerm || selectedCategory !== 'all'
                ? 'Filtered Notes'
                : 'All Notes'}
              {filteredNotes.length > 0 && (
                <span style={styles.badge}>{filteredNotes.length}</span>
              )}
            </h2>

            {/* Loading State */}
            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading your amazing notes...</p>
              </div>
            ) : filteredNotes.length === 0 ? (
              /* Empty State */
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {selectedCategory !== 'all' || searchTerm ? '🔍' : '📭'}
                </div>
                <h3 style={styles.emptyTitle}>
                  {selectedCategory !== 'all' || searchTerm
                    ? 'No matching notes found'
                    : 'No notes yet'}
                </h3>
                <p style={styles.emptyText}>
                  {selectedCategory !== 'all' || searchTerm
                    ? 'Try adjusting your search or filters'
                    : 'Create your first note to get started. Let your ideas flow!'}
                </p>
              </div>
            ) : (
              /* Notes Grid */
              <div style={styles.grid}>
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating action indicator */}
      <div style={styles.floatingIndicator}>💫</div>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    padding: '0 1rem 3rem 1rem',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid rgba(102, 126, 234, 0.1)',
    animation: 'slideUp 0.5s ease',
  },
  statEmoji: {
    fontSize: '2rem',
  },
  statLabel: {
    color: '#999',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statValue: {
    color: '#667eea',
    fontSize: '1.8rem',
    fontWeight: '800',
    marginTop: '0.25rem',
  },
  searchSection: {
    marginBottom: '1.5rem',
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid white',
    borderRadius: '12px',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    background: 'white',
  },
  filterSection: {
    marginBottom: '2rem',
  },
  filterLabel: {
    color: '#333',
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  categoryButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  categoryBtn: {
    padding: '0.65rem 1.25rem',
    border: '2px solid #f0f0f0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  },
  errorBanner: {
    background: '#fef2f2',
    border: '2px solid #fecaca',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    animation: 'slideDown 0.3s ease',
  },
  errorIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  errorTitle: {
    fontWeight: '700',
    color: '#991b1b',
    marginBottom: '0.25rem',
  },
  errorMessage: {
    color: '#7c2d2d',
    fontSize: '0.95rem',
  },
  dismissBtn: {
    background: 'transparent',
    border: 'none',
    color: '#991b1b',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: 0,
    marginLeft: 'auto',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  notesSection: {
    marginTop: '2rem',
  },
  sectionTitle: {
    color: '#333',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.6rem',
    fontWeight: '800',
    margin: '0 0 1.5rem 0',
  },
  badge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.35rem 0.9rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginLeft: 'auto',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  loadingState: {
    background: 'white',
    padding: '4rem 2rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f0f0f0',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    margin: '0 auto 1.5rem',
    animation: 'spin 1.2s linear infinite',
  },
  loadingText: {
    color: '#666',
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: '600',
  },
  emptyState: {
    background: 'white',
    padding: '4rem 2rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '2px dashed #e0e7ff',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'float 3s ease-in-out infinite',
  },
  emptyTitle: {
    color: '#333',
    margin: '0 0 0.75rem 0',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  emptyText: {
    color: '#999',
    margin: 0,
    fontSize: '1.05rem',
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  floatingIndicator: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    fontSize: '3rem',
    animation: 'float 3s ease-in-out infinite',
    pointerEvents: 'none',
    opacity: 0.6,
  },
};

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes cardPop {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;
document.head.appendChild(style);

export default Notes;