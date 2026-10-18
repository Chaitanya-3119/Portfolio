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

  if (status === "success") {
    return (
      <div className="card p-6 sm:p-8 text-center">
        <CheckCircle2
          size={34}
          className="mx-auto text-[var(--color-accent)]"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-serif text-xl text-[var(--color-paper)]">
          Message sent
        </h3>
        <p className="mt-2 text-[0.92rem] text-[var(--color-fog)]">{feedback}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-7" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-name"
            className="mono mb-2 block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fog)]"
          >
            Name <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={status === "loading"}
            className="field"
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="contact-email"
            className="mono mb-2 block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fog)]"
          >
            Email <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="field"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-subject"
          className="mono mb-2 block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fog)]"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Project, role, or just saying hi"
          disabled={status === "loading"}
          className="field"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-message"
          className="mono mb-2 block text-[11px] uppercase tracking-[0.14em] text-[var(--color-fog)]"
        >
          Message <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about what you're building, the timeline, or anything else..."
          disabled={status === "loading"}
          className="field resize-y"
          style={{ minHeight: "120px" }}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-xl p-3.5 text-[0.88rem]"
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.28)",
            color: "#f87171",
          }}
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="mono text-[11px] text-[var(--color-fog-dim)]">
          Goes straight to my inbox
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-solid !py-2.5 !px-5 !text-[13px] inline-flex items-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
