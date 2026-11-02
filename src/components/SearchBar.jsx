import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="🔍 Smart Search by title or note keywords..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.search}
    />
  );
}

const styles = {
  search: {
    flex: 1,
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
    outline: "none",
  },
};
