"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Calendar, Download, Coffee, Heart } from "lucide-react";

interface AboutProps {
  profile: {
    name: string;
    bio: string;
    location?: string;
    avatar: string;
  };
}

export default function About({ profile }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <User size={12} style={{ marginRight: "6px" }} />
            About Me
          </span>
          <h2 className="section-title">
            Get to know <span className="gradient-text">me better</span>
          </h2>
          <p className="section-subtitle">
            A passionate developer who loves turning ideas into reality
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left - Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="gradient-border"
                style={{
                  width: "280px",
                  height: "320px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  background: "var(--color-bg-card)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    background: "radial-gradient(circle at 50% 30%, rgba(108,99,255,0.25), rgba(10,10,15,0.95))",
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                      padding: "3px",
                      marginBottom: "18px",
                      boxShadow: "0 0 35px rgba(108,99,255,0.4)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: "#12121a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        fontWeight: 900,
                        color: "#fff",
                      }}
                    >
                      <span className="gradient-text">C</span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "6px",
                        right: "6px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#00e676",
                        border: "3px solid #12121a",
                        boxShadow: "0 0 10px #00e676",
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#f0f0f5",
                      marginBottom: "4px",
                    }}
                  >
                    {profile.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#00d4ff",
                      fontWeight: 600,
                      marginBottom: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Full Stack Engineer
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.78rem",
                      color: "#a0a0b8",
                      background: "rgba(255,255,255,0.04)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <MapPin size={12} style={{ color: "#6c63ff" }} />
                    {profile.location || "Available Globally"}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "20px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  border: "2px solid rgba(108,99,255,0.2)",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "20px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  border: "2px solid rgba(0,212,255,0.2)",
                }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "#a0a0b8",
                marginBottom: "32px",
              }}
            >
              {profile.bio}
            </p>

            {/* Info cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[
                {
                  icon: <MapPin size={18} />,
                  label: "Location",
                  value: profile.location || "India",
                },
                {
                  icon: <Calendar size={18} />,
                  label: "Experience",
                  value: "3+ Years",
                },
                {
                  icon: <Coffee size={18} />,
                  label: "Cups of Coffee",
                  value: "2000+",
                },
                {
                  icon: <Heart size={18} />,
                  label: "Passion",
                  value: "Building Products",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(108,99,255,0.1)",
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
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#f0f0f5",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
