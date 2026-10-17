"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
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
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <Mail size={12} style={{ marginRight: "6px" }} />
            Contact
          </span>
          <h2 className="section-title">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "40px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Left - Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                icon: <Mail size={20} />,
                title: "Email",
                value: "hello@chaitanya.dev",
                link: "mailto:hello@chaitanya.dev",
              },
              {
                icon: <Phone size={20} />,
                title: "Phone",
                value: "+91 XXXXX XXXXX",
                link: "tel:+91XXXXXXXXXX",
              },
              {
                icon: <MapPin size={20} />,
                title: "Location",
                value: "India",
                link: null,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6c63ff",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b6b80",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      style={{
                        color: "#f0f0f5",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div
              className="glass-card"
              style={{
                padding: "28px",
                background: "linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,212,255,0.05))",
                borderColor: "rgba(108,99,255,0.15)",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🚀</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                }}
              >
                Ready to start a project?
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#a0a0b8",
                  lineHeight: 1.7,
                }}
              >
                I&apos;m available for freelance work and exciting collaborations. Let&apos;s create something amazing together!
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ padding: "36px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
                className="form-grid"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "#6b6b80",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(108,99,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "#6b6b80",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(108,99,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    color: "#6b6b80",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Project Inquiry"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(108,99,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    color: "#6b6b80",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(108,99,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px",
                  fontSize: "1rem",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" && <Loader2 size={18} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />}
                {status === "success" && <CheckCircle2 size={18} />}
                {status === "idle" && <Send size={18} />}
                {status === "error" && <Send size={18} />}
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "Message Sent!"
                  : status === "error"
                  ? "Failed — Try Again"
                  : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
