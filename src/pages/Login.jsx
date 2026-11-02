import React, { useState } from "react";

export default function Login({ onLoginSuccess, onSwitchView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password configurations are strictly required.");
      return;
    }
    onLoginSuccess({ name: email.split("@")[0], email });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign In to Notes Keeper</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>
            Log In
          </button>
        </form>
        <p style={styles.footerText}>
          New user?{" "}
          <span style={styles.link} onClick={onSwitchView}>
            Register Account
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  card: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "380px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1e293b",
    fontSize: "1.25rem",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.85rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: {
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
  },
  btn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "0.6rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  footerText: {
    marginTop: "1.25rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#64748b",
  },
  link: { color: "#2563eb", cursor: "pointer", fontWeight: "600" },
};
