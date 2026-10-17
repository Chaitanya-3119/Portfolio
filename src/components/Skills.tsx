"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Layers } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const categories = [...new Set(skills.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="section"
      ref={ref}
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <Layers size={12} style={{ marginRight: "6px" }} />
            Tech Stack
          </span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                border: "1px solid",
                borderColor:
                  activeCategory === cat
                    ? "rgba(108,99,255,0.5)"
                    : "rgba(255,255,255,0.06)",
                background:
                  activeCategory === cat
                    ? "rgba(108,99,255,0.15)"
                    : "transparent",
                color:
                  activeCategory === cat ? "#6c63ff" : "#a0a0b8",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="glass-card"
              style={{ padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{skill.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                      {skill.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b6b80",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {skill.category}
                    </div>
                  </div>
                </div>
                <span
                  className="gradient-text"
                  style={{ fontWeight: 700, fontSize: "1.1rem" }}
                >
                  {skill.proficiency}%
                </span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={
                    isInView ? { width: `${skill.proficiency}%` } : { width: 0 }
                  }
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
