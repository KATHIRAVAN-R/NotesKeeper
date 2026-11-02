import React, { useEffect, useRef } from 'react';

export default function NoteEditor({ note, onUpdateField, onDelete, onToggleArchive }) {
  // Use a ref to target the HTML element directly without forcing re-renders
  const editorRef = useRef(null);

  // Sync state changes to the editor ONLY when switching between different notes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== note.content) {
      editorRef.current.innerHTML = note.content;
    }
  }, [note.id]); // Triggers only when the active note ID changes

  const execFormat = (command) => {
    document.execCommand(command, false, null);
    if (editorRef.current) {
      onUpdateField('content', editorRef.current.innerHTML);
    }
  };

  return (
    <div style={styles.editorContainer}>
      <div style={styles.headerRow}>
        <input 
          type="text" 
          value={note.title} 
          onChange={(e) => onUpdateField('title', e.target.value)} 
          style={styles.titleInput}
          placeholder="Note Title"
        />
        <button style={styles.archiveBtn} onClick={() => onToggleArchive(note.id)}>
          {note.isArchived ? '📥 Restore' : '📦 Archive'}
        </button>
        <button style={styles.deleteBtn} onClick={() => onDelete(note.id)}>🗑️ Delete</button>
      </div>

      <div style={styles.metadataBar}>
        <label style={styles.metaLabel}>Folder/Notebook: 
          <input 
            type="text" value={note.notebook} 
            onChange={(e) => onUpdateField('notebook', e.target.value)}
            style={styles.metaInput}
          />
        </label>
        <label style={styles.metaLabel}>Tags (comma-separated): 
          <input 
            type="text" value={note.tags.join(', ')} 
            onChange={(e) => onUpdateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            style={styles.metaInput}
          />
        </label>
        <label style={styles.metaLabel}>Background: 
          <input 
            type="color" value={note.color || '#ffffff'} 
            onChange={(e) => onUpdateField('color', e.target.value)}
            style={styles.colorPicker}
          />
        </label>
      </div>

      <div style={styles.toolbar}>
        <button onClick={() => execFormat('bold')} style={styles.toolBtn}><strong>B</strong></button>
        <button onClick={() => execFormat('italic')} style={styles.toolBtn}><i>I</i></button>
        <button onClick={() => execFormat('insertUnorderedList')} style={styles.toolBtn}>• Bullet List</button>
        <span style={styles.timestamp}>💾 Saved at {note.updatedAt}</span>
      </div>

      {/* 
        Removed dangerouslySetInnerHTML from the active loop. 
        It is now safely driven by editorRef and onInput updates the parent state smoothly.
      */}
      <div 
        ref={editorRef}
        id="rich-editor-box"
        contentEditable
        style={styles.editableContent}
        onInput={(e) => onUpdateField('content', e.currentTarget.innerHTML)}
      />
    </div>
  );
}

const styles = {
  editorContainer: { width: '45%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  headerRow: { display: 'flex', gap: '0.5rem' },
  titleInput: { flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1.2rem', fontWeight: 'bold' },
  archiveBtn: { backgroundColor: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0 0.75rem', cursor: 'pointer', fontWeight: '500' },
  deleteBtn: { backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0 0.75rem', cursor: 'pointer', fontWeight: '500' },
  metadataBar: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f8fafc', padding: '0.5rem', borderRadius: '6px' },
  metaLabel: { fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' },
  metaInput: { padding: '0.25rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem', width: '100px' },
  colorPicker: { border: 'none', background: 'none', cursor: 'pointer', width: '24px', height: '24px' },
  toolbar: { display: 'flex', gap: '0.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', alignItems: 'center' },
  toolBtn: { padding: '0.25rem 0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' },
  timestamp: { fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto' },
  editableContent: { flex: 1, border: '1px solid #f1f5f9', padding: '0.75rem', borderRadius: '4px', outline: 'none', overflowY: 'auto', minHeight: '250px', fontSize: '0.95rem', lineHeight: '1.5' }
};
