import React from "react";

export default function NotebookSidebar({
  notebooks,
  currentNotebook,
  onSelectNotebook,
  tags,
  selectedTag,
  onSelectTag,
  activeTab,
  onSelectTab,
  onCreateNote,
}) {
  return (
    <aside style={styles.sidebar}>
      <button onClick={onCreateNote} style={styles.createBtn}>
        + New Note
      </button>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Workspaces</h4>
        <button
          onClick={() => onSelectTab("notes")}
          style={{
            ...styles.tabBtn,
            fontWeight: activeTab === "notes" ? "700" : "400",
          }}
        >
          📁 Active Board
        </button>
        <button
          onClick={() => onSelectTab("archive")}
          style={{
            ...styles.tabBtn,
            fontWeight: activeTab === "archive" ? "700" : "400",
          }}
        >
          📥 Archive Storage
        </button>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Notebook Folders</h4>
        {notebooks.map((nb) => (
          <button
            key={nb}
            onClick={() => onSelectNotebook(nb)}
            style={{
              ...styles.tabBtn,
              backgroundColor:
                currentNotebook === nb ? "#e2e8f0" : "transparent",
            }}
          >
            📁 {nb}
          </button>
        ))}
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Filter By Tags</h4>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            style={{
              ...styles.tabBtn,
              backgroundColor: selectedTag === tag ? "#cbd5e1" : "transparent",
            }}
          >
            🏷️ {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    overflowY: "auto",
  },
  createBtn: {
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "0.6rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  section: { display: "flex", flexDirection: "column", gap: "0.25rem" },
  sectionTitle: {
    margin: "0 0 0.5rem 0",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    color: "#64748b",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },
  tabBtn: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    background: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#334155",
  },
};
