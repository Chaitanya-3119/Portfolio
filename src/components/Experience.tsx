"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
  order: number;
}

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
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
            <Briefcase size={12} style={{ marginRight: "6px" }} />
            Career
          </span>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and roles I&apos;ve taken on
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "0",
              bottom: "0",
              width: "2px",
              background:
                "linear-gradient(180deg, #6c63ff, #00d4ff, transparent)",
            }}
            className="timeline-line-el"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              style={{
                position: "relative",
                paddingLeft: "64px",
                marginBottom: "40px",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: "19px",
                  top: "24px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: exp.current ? "#00e676" : "#6c63ff",
                  border: "3px solid var(--color-bg-secondary)",
                  boxShadow: `0 0 10px ${
                    exp.current ? "rgba(0,230,118,0.5)" : "rgba(108,99,255,0.5)"
                  }`,
                  zIndex: 2,
                }}
              />

              <div className="glass-card" style={{ padding: "28px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      {exp.position}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span className="gradient-text" style={{ fontWeight: 600 }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 14px",
                        borderRadius: "8px",
                        background: exp.current
                          ? "rgba(0,230,118,0.1)"
                          : "rgba(108,99,255,0.08)",
                        border: `1px solid ${
                          exp.current
                            ? "rgba(0,230,118,0.2)"
                            : "rgba(108,99,255,0.15)"
                        }`,
                        fontSize: "0.8rem",
                        color: exp.current ? "#00e676" : "#a0a0b8",
                        fontWeight: 500,
                      }}
                    >
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    color: "#a0a0b8",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  {exp.description}
                </p>

                {/* Technologies */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        background: "rgba(108,99,255,0.08)",
                        border: "1px solid rgba(108,99,255,0.15)",
                        fontSize: "0.75rem",
                        color: "#a0a0b8",
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .timeline-line-el {
            left: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
