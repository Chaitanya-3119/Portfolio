"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Code2, Zap } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  profile: {
    name: string;
    title: string;
    tagline: string;
    stats: {
      yearsExperience: number;
      projectsCompleted: number;
      happyClients: number;
      githubStars: number;
    };
  };
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background effects */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "24px",
                background: "rgba(108, 99, 255, 0.1)",
                border: "1px solid rgba(108, 99, 255, 0.2)",
                marginBottom: "24px",
                fontSize: "0.85rem",
                color: "#6c63ff",
                fontWeight: 500,
              }}
            >
              <Sparkles size={14} />
              Available for freelance work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "3px",
                  background: "linear-gradient(90deg, #6c63ff, #00d4ff)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontSize: "1.3rem",
                  color: "#a0a0b8",
                  fontWeight: 500,
                }}
              >
                {profile.title}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: "1.15rem",
                color: "#a0a0b8",
                lineHeight: 1.8,
                maxWidth: "520px",
                marginBottom: "36px",
              }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
            >
              <Link href="#projects" className="btn-primary">
                <Code2 size={18} />
                View My Work
              </Link>
              <Link href="#contact" className="btn-secondary">
                <Zap size={18} />
                Get In Touch
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
                marginTop: "60px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
              className="stats-grid"
            >
              {[
                { value: `${profile.stats.yearsExperience}+`, label: "Years Exp." },
                { value: `${profile.stats.projectsCompleted}+`, label: "Projects" },
                { value: `${profile.stats.happyClients}+`, label: "Happy Clients" },
                { value: `${profile.stats.githubStars}+`, label: "GitHub Stars" },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className="gradient-text"
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#6b6b80",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Code block / visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-visual"
          >
            <div
              className="glass-card animate-float"
              style={{
                padding: "32px",
                borderRadius: "20px",
                fontFamily: "var(--font-mono)",
                position: "relative",
              }}
            >
              {/* Terminal header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#febc2e",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#28c840",
                  }}
                />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "0.8rem",
                    color: "#6b6b80",
                  }}
                >
                  developer.ts
                </span>
              </div>

              {/* Code content */}
              <div style={{ fontSize: "0.9rem", lineHeight: 2 }}>
                <div>
                  <span style={{ color: "#c678dd" }}>const</span>{" "}
                  <span style={{ color: "#e5c07b" }}>developer</span>{" "}
                  <span style={{ color: "#56b6c2" }}>=</span>{" "}
                  <span style={{ color: "#c678dd" }}>{"{"}</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#e06c75" }}>name</span>
                  <span style={{ color: "#abb2bf" }}>:</span>{" "}
                  <span style={{ color: "#98c379" }}>&quot;{profile.name}&quot;</span>
                  <span style={{ color: "#abb2bf" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#e06c75" }}>role</span>
                  <span style={{ color: "#abb2bf" }}>:</span>{" "}
                  <span style={{ color: "#98c379" }}>&quot;{profile.title}&quot;</span>
                  <span style={{ color: "#abb2bf" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#e06c75" }}>skills</span>
                  <span style={{ color: "#abb2bf" }}>:</span>{" "}
                  <span style={{ color: "#e5c07b" }}>[</span>
                  <span style={{ color: "#98c379" }}>&quot;React&quot;</span>
                  <span style={{ color: "#abb2bf" }}>,</span>{" "}
                  <span style={{ color: "#98c379" }}>&quot;Node&quot;</span>
                  <span style={{ color: "#abb2bf" }}>,</span>{" "}
                  <span style={{ color: "#98c379" }}>&quot;TS&quot;</span>
                  <span style={{ color: "#e5c07b" }}>]</span>
                  <span style={{ color: "#abb2bf" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#e06c75" }}>passion</span>
                  <span style={{ color: "#abb2bf" }}>:</span>{" "}
                  <span style={{ color: "#98c379" }}>&quot;Building cool stuff&quot;</span>
                  <span style={{ color: "#abb2bf" }}>,</span>
                </div>
                <div style={{ paddingLeft: "20px" }}>
                  <span style={{ color: "#e06c75" }}>hireable</span>
                  <span style={{ color: "#abb2bf" }}>:</span>{" "}
                  <span style={{ color: "#d19a66" }}>true</span>
                  <span style={{ color: "#abb2bf" }}>,</span>
                </div>
                <div>
                  <span style={{ color: "#c678dd" }}>{"}"}</span>
                  <span style={{ color: "#abb2bf" }}>;</span>
                </div>
              </div>

              {/* Blinking cursor */}
              <div
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "18px",
                  background: "#6c63ff",
                  marginLeft: "4px",
                  marginTop: "8px",
                  borderRadius: "1px",
                  animation: "typing-cursor 1s infinite",
                }}
              />

              {/* Floating badges attached to the code card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card"
                style={{
                  position: "absolute",
                  top: "-16px",
                  right: "-16px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(108,99,255,0.3)",
                }}
              >
                <Sparkles size={16} style={{ color: "#00d4ff" }} /> Clean Code First
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="glass-card"
                style={{
                  position: "absolute",
                  bottom: "-16px",
                  left: "16px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(0,230,118,0.3)",
                }}
              >
                <Zap size={16} style={{ color: "#ffd700" }} /> {profile.stats.projectsCompleted}+ Projects Built
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#6b6b80", letterSpacing: "0.1em" }}>
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={16} style={{ color: "#6c63ff" }} />
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-visual {
            display: none !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
