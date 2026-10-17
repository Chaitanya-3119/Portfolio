"use client";

import { useState } from "react";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = "/admin/dashboard";
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px 14px 48px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    color: "#f0f0f5",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--color-bg-primary)",
      }}
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "48px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <LogIn size={24} style={{ color: "#fff" }} />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Admin <span className="gradient-text">Portal</span>
          </h1>
          <p style={{ color: "#6b6b80", fontSize: "0.9rem" }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "#ff6b6b",
              fontSize: "0.85rem",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px", position: "relative" }}>
            <Mail
              size={18}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6b6b80",
              }}
            />
            <input
              type="email"
              placeholder="admin@portfolio.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "28px", position: "relative" }}>
            <Lock
              size={18}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6b6b80",
              }}
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "16px",
              fontSize: "1rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "0.8rem",
            color: "#6b6b80",
          }}
        >
          First time?{" "}
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/admin/seed", { method: "POST" });
                const data = await res.json();
                if (res.ok) {
                  alert("Admin created! Use your ADMIN_EMAIL and ADMIN_PASSWORD from .env.local to login.");
                } else {
                  alert(data.error || "Failed to seed admin");
                }
              } catch {
                alert("Failed to create admin. Make sure MongoDB is connected.");
              }
            }}
            style={{
              background: "none",
              border: "none",
              color: "#6c63ff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "inherit",
              fontFamily: "inherit",
            }}
          >
            Create admin account
          </button>
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
