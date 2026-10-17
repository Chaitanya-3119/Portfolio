"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  order: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section
      id="testimonials"
      className="section"
      ref={ref}
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <MessageSquareQuote size={12} style={{ marginRight: "6px" }} />
            Testimonials
          </span>
          <h2 className="section-title">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Kind words from people I&apos;ve worked with
          </p>
        </motion.div>

        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          {/* Main testimonial */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{
              padding: "40px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Quote icon */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquareQuote size={20} style={{ color: "#fff" }} />
            </div>

            {/* Stars */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "4px",
                marginTop: "12px",
                marginBottom: "20px",
              }}
            >
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#ffd740"
                  style={{ color: "#ffd740" }}
                />
              ))}
            </div>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "#a0a0b8",
                fontStyle: "italic",
                marginBottom: "28px",
              }}
            >
              &ldquo;{testimonials[active].content}&rdquo;
            </p>

            {/* Avatar */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.15))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#6c63ff",
              }}
            >
              {testimonials[active].name[0]}
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: "1.05rem",
                marginBottom: "4px",
              }}
            >
              {testimonials[active].name}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#6b6b80",
              }}
            >
              {testimonials[active].position} at{" "}
              <span className="gradient-text" style={{ fontWeight: 600 }}>
                {testimonials[active].company}
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            <button
              onClick={prev}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
                color: "#f0f0f5",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    background:
                      i === active
                        ? "linear-gradient(90deg, #6c63ff, #00d4ff)"
                        : "rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
                color: "#f0f0f5",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
