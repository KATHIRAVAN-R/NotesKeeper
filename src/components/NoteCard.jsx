import React from "react";
import TagBadge from "./TagBadge";

export default function NoteCard({ note, isActive, onClick, onTogglePin }) {
  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: note.color || "#ffffff",
        border: isActive ? "2px solid #2563eb" : "1px solid #cbd5e1",
      }}
      onClick={onClick}
    >
      <div style={styles.cardHeader}>
        <h4 style={styles.title}>
          {note.isPinned && <span style={styles.pinIndicator}>📌 </span>}
          {note.title || "Untitled Note"}
        </h4>
        <button
          style={styles.pinBtn}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
        >
          {note.isPinned ? "Unpin" : "Pin"}
        </button>
      </div>

      <p
        style={styles.excerpt}
        dangerouslySetInnerHTML={{
          __html: note.content || "<i>No additional content</i>",
        }}
      />

      <div style={styles.metaData}>
        <span>💼 {note.notebook}</span>
        <span>🕒 {note.updatedAt}</span>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div style={styles.tagContainer}>
          {note.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    transition: "transform 0.15s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  title: { margin: 0, fontSize: "1rem", fontWeight: "600", color: "#0f172a" },
  pinIndicator: { marginRight: "0.25rem" },
  pinBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  excerpt: {
    fontSize: "0.875rem",
    color: "#334155",
    margin: "0.25rem 0",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.4",
  },
  metaData: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: "#64748b",
    marginTop: "auto",
  },
  tagContainer: {
    display: "flex",
    gap: "0.25rem",
    flexWrap: "wrap",
    marginTop: "0.25rem",
  },
};
