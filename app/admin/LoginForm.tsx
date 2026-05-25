"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Mot de passe incorrect");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "360px",
      }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "#1a1a1a", textAlign: "center", letterSpacing: "1px" }}>
          ANAR PERFUMES
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: "13px", color: "#999", textAlign: "center" }}>
          Administration
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", color: "#555", marginBottom: "6px", fontWeight: 500 }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              required
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${error ? "#ef4444" : "#d0d0d0"}`,
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "13px", margin: "0 0 14px", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#c4a96a" : "#9A7235",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Vérification..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
