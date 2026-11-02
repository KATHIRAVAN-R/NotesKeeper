import React from "react";

export default function TagBadge({ label }) {
  return <span style={styles.badge}>#{label}</span>;
}

const styles = {
  badge: {
    backgroundColor: "#e2e8f0",
    padding: "0.15rem 0.4rem",
    borderRadius: "4px",
    fontSize: "0.725rem",
    color: "#475569",
    fontWeight: "500",
  },
};
