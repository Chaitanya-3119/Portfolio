"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  grade?: string;
  description?: string;
  order: number;
}

interface EducationProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <GraduationCap size={12} style={{ marginRight: "6px" }} />
            Education
          </span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Background</span>
          </h2>
          <p className="section-subtitle">
            My educational journey and qualifications
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="edu-grid"
        >
          {education.map((edu, i) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="glass-card"
              style={{
                padding: "32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative gradient corner */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "radial-gradient(circle at top right, rgba(108,99,255,0.1), transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={24} style={{ color: "#6c63ff" }} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#a0a0b8",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.field}
                  </div>
                  <div
                    className="gradient-text"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    {edu.institution}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "8px",
                        background: "rgba(108,99,255,0.08)",
                        border: "1px solid rgba(108,99,255,0.15)",
                        fontSize: "0.8rem",
                        color: "#a0a0b8",
                      }}
                    >
                      {edu.startYear} — {edu.current ? "Present" : edu.endYear}
                    </span>
                    {edu.grade && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 12px",
                          borderRadius: "8px",
                          background: "rgba(0,230,118,0.08)",
                          border: "1px solid rgba(0,230,118,0.15)",
                          fontSize: "0.8rem",
                          color: "#00e676",
                        }}
                      >
                        <Award size={12} /> {edu.grade}
                      </span>
                    )}
                  </div>

                  {edu.description && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b6b80",
                        lineHeight: 1.7,
                      }}
                    >
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
