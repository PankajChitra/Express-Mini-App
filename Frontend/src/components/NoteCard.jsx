import { useState } from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    title: note.title, 
    body: note.body,
    category: note.category || 'personal',
    color: note.color || '#ffd93d'
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError('');
    try {
      await onDelete(note._id);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete note');
      setIsDeleting(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editForm.title.trim()) return;
    try {
      await onEdit(note._id, editForm);
      setIsEditing(false);
    } catch (err) {
      setDeleteError(err.message || 'Failed to edit note');
    }
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      }
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    } catch {
      return 'Unknown date';
    }
  };

  if (isEditing) {
    const colors = ['#ffd93d', '#ff6b6b', '#6bcf7f', '#4d96ff', '#a78bfa', '#f472b6'];
    const categories = ['personal', 'work', 'ideas', 'todo', 'archive'];

    return (
      <div style={styles.editCard}>
        <h4 style={{ marginTop: 0 }}>Edit Note</h4>
        <input
          style={styles.editInput}
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          style={styles.editTextarea}
          value={editForm.body}
          onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
          placeholder="Body"
          rows="4"
        />
        
        <div style={styles.editRow}>
          <div style={styles.editGroup}>
            <label style={styles.editLabel}>Category</label>
            <select
              style={styles.editSelect}
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div style={styles.editGroup}>
            <label style={styles.editLabel}>Color</label>
            <div style={styles.editColorPicker}>
              {colors.map(col => (
                <button
                  key={col}
                  type="button"
                  style={{
                    ...styles.editColorOption,
                    background: col,
                    border: editForm.color === col ? '3px solid #333' : '2px solid #ddd',
                    transform: editForm.color === col ? 'scale(1.1)' : 'scale(1)',
                  }}
                  onClick={() => setEditForm({ ...editForm, color: col })}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.saveBtn }}
            onClick={handleEditSubmit}
          >
            Save
          </button>
          <button
            style={styles.cancelBtn}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const categoryEmoji = {
    personal: '🌟',
    work: '💼',
    ideas: '💡',
    todo: '✓',
    archive: '📦',
  };

  return (
    <div style={{ ...styles.card, borderLeftColor: note.color || '#ffd93d' }}>
      <div style={styles.cardHeader}>
        <div style={styles.titleSection}>
          <h4 style={styles.title}>{note.title || 'Untitled'}</h4>
          {note.category && (
            <span style={styles.category}>
              {categoryEmoji[note.category]} {note.category}
            </span>
          )}
        </div>
        <span style={styles.date}>{formatDate(note.createdAt)}</span>
      </div>

      <p style={styles.body}>{note.body}</p>

      <div style={styles.footer}>
        <button
          style={{
            ...styles.editBtn,
            opacity: isDeleting ? 0.5 : 1,
            cursor: isDeleting ? 'not-allowed' : 'pointer',
          }}
          onClick={() => setIsEditing(true)}
          disabled={isDeleting}
          title="Edit this note"
        >
          ✏️ Edit
        </button>
        <button
          style={{
            ...styles.deleteBtn,
            opacity: isDeleting ? 0.6 : 1,
            cursor: isDeleting ? 'not-allowed' : 'pointer',
          }}
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete this note"
        >
          {isDeleting ? '🔄 Deleting...' : '🗑️ Delete'}
        </button>
      </div>

      {deleteError && (
        <p style={styles.error}>{deleteError}</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    borderLeft: '5px solid #ffd93d',
    animation: 'cardPop 0.4s ease',
  },
  editCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '2px solid #667eea',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
    gap: '1rem',
  },
  titleSection: {
    flex: 1,
  },
  title: {
    margin: '0 0 0.35rem 0',
    color: '#222',
    fontSize: '1.15rem',
    fontWeight: '700',
    wordBreak: 'break-word',
  },
  category: {
    display: 'inline-block',
    background: '#f0f0f0',
    color: '#555',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  date: {
    color: '#999',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    padding: '0.35rem 0.75rem',
    background: '#f8f8f8',
    borderRadius: '6px',
    fontWeight: '500',
  },
  body: {
    color: '#555',
    flex: 1,
    margin: '0 0 1rem 0',
    lineHeight: '1.6',
    wordBreak: 'break-word',
    fontSize: '0.95rem',
  },
  footer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto',
  },
  editBtn: {
    background: '#e8f4f8',
    color: '#0d7377',
    border: '1px solid #a8d5d5',
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    flex: 1,
  },
  deleteBtn: {
    background: '#fee',
    color: '#e53e3e',
    border: '1px solid #fcc',
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    flex: 1,
  },
  editInput: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e0e7ff',
    borderRadius: '6px',
    fontSize: '1rem',
    marginBottom: '0.75rem',
    boxSizing: 'border-box',
  },
  editTextarea: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e0e7ff',
    borderRadius: '6px',
    fontSize: '1rem',
    marginBottom: '0.75rem',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  saveBtn: {
    flex: 1,
    padding: '0.65rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.65rem',
    background: '#f0f0f0',
    color: '#555',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  editRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.75rem',
  },
  editGroup: {
    flex: 1,
  },
  editLabel: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#555',
    marginBottom: '0.35rem',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  editSelect: {
    width: '100%',
    padding: '0.5rem',
    border: '2px solid #e0e7ff',
    borderRadius: '6px',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  editColorPicker: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  editColorOption: {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: 0,
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.8rem',
    margin: '0.5rem 0 0 0',
  },
};

export default NoteCard;
