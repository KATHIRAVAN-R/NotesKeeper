import React from "react";

export default function ViewToggle({ currentMode, onToggle }) {
  return (
    <div style={styles.toggleGroup}>
      <button
        style={currentMode === "grid" ? styles.active : styles.inactive}
        onClick={() => onToggle("grid")}
      >
        Grid View
      </button>
      <button
        style={currentMode === "list" ? styles.active : styles.inactive}
        onClick={() => onToggle("list")}
      >
        List View
      </button>
    </div>
  );
}

const styles = {
  toggleGroup: {
    display: "flex",
    gap: "0.25rem",
    backgroundColor: "#f1f5f9",
    padding: "0.25rem",
    borderRadius: "6px",
  },
  active: {
    padding: "0.4rem 0.8rem",
    border: "none",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "0.85rem",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  inactive: {
    padding: "0.4rem 0.8rem",
    border: "none",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "0.85rem",
  },
};
