"use client";

import { useState, useEffect } from "react";
import { Heart, ArrowUp } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";

export default function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 0 32px",
        background: "var(--color-bg-primary)",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                C
              </div>
              <span
                className="gradient-text"
                style={{ fontSize: "1.2rem", fontWeight: 800 }}
              >
                haitanya
              </span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#6b6b80",
                maxWidth: "300px",
              }}
            >
              Building exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["About", "Projects", "Blog", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: "#a0a0b8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "color 0.3s",
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: <Github size={16} />, url: "https://github.com/chaitanya" },
              {
                icon: <Linkedin size={16} />,
                url: "https://linkedin.com/in/chaitanya",
              },
              {
                icon: <Twitter size={16} />,
                url: "https://twitter.com/chaitanya",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a0a0b8",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "#6b6b80",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            © {year} Chaitanya. Made with{" "}
            <Heart size={12} fill="#ff6b9d" style={{ color: "#ff6b9d" }} /> and
            lots of ☕
          </p>

          <button
            onClick={scrollToTop}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(108,99,255,0.1)",
              color: "#6c63ff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
