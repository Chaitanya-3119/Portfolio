"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || "Inquiry from Portfolio",
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFeedback(data.message || "Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid var(--color-line)",
        background: "rgba(255, 255, 255, 0.02)",
        padding: "clamp(1.25rem, 3vw, 2rem)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--color-paper)",
            margin: "0 0 0.35rem 0",
          }}
        >
          Send a Direct Message
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-fog)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Leave a message here and I will be notified immediately.
        </p>
      </div>

      {status === "success" ? (
        <div
          style={{
            padding: "1.5rem",
            borderRadius: "12px",
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            textAlign: "center",
          }}
        >
          <CheckCircle2
            size={36}
            style={{ color: "#22c55e", margin: "0 auto 0.75rem auto" }}
          />
          <h4
            style={{
              color: "var(--color-paper)",
              fontSize: "1rem",
              fontWeight: 600,
              margin: "0 0 0.5rem 0",
            }}
          >
            Message Received!
          </h4>
          <p
            style={{
              color: "var(--color-fog)",
              fontSize: "0.875rem",
              margin: "0 0 1rem 0",
            }}
          >
            {feedback}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "var(--color-line)",
              border: "none",
              color: "var(--color-paper)",
              fontSize: "0.8125rem",
              cursor: "pointer",
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono, monospace)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-fog)",
                  marginBottom: "0.4rem",
                }}
              >
                Your Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--color-line)",
                  background: "rgba(0, 0, 0, 0.25)",
                  color: "var(--color-paper)",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono, monospace)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-fog)",
                  marginBottom: "0.4rem",
                }}
              >
                Email Address <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1px solid var(--color-line)",
                  background: "rgba(0, 0, 0, 0.25)",
                  color: "var(--color-paper)",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono, monospace)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-fog)",
                marginBottom: "0.4rem",
              }}
            >
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Collaboration / Opportunity"
              disabled={status === "loading"}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "1px solid var(--color-line)",
                background: "rgba(0, 0, 0, 0.25)",
                color: "var(--color-paper)",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono, monospace)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-fog)",
                marginBottom: "0.4rem",
              }}
            >
              Message <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project, timeline, or just say hi..."
              disabled={status === "loading"}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                border: "1px solid var(--color-line)",
                background: "rgba(0, 0, 0, 0.25)",
                color: "var(--color-paper)",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
                minHeight: "100px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {status === "error" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#f87171",
                fontSize: "0.85rem",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{feedback}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background: "var(--color-accent, #6366f1)",
                color: "#ffffff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Notification...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
