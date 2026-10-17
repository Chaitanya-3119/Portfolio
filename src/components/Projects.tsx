"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Folder, ExternalLink, Star } from "lucide-react";
import { Github } from "@/components/Icons";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const displayed = showAll ? projects : featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <Folder size={12} style={{ marginRight: "6px" }} />
            Portfolio
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "28px",
          }}
          className="projects-grid"
        >
          {displayed.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card project-card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Project image */}
              <div
                style={{
                  height: "220px",
                  background: `linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))`,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {project.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "4rem",
                      opacity: 0.3,
                    }}
                  >
                    💻
                  </div>
                )}
                {project.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      background: "rgba(108,99,255,0.2)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(108,99,255,0.3)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#6c63ff",
                    }}
                  >
                    <Star size={10} /> Featured
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10,10,15,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="project-overlay"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0";
                  }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "rgba(108,99,255,0.2)",
                        border: "1px solid rgba(108,99,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textDecoration: "none",
                        transition: "all 0.3s",
                      }}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "rgba(108,99,255,0.2)",
                        border: "1px solid rgba(108,99,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textDecoration: "none",
                        transition: "all 0.3s",
                      }}
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#a0a0b8",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
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
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.03)",
                        fontSize: "0.75rem",
                        color: "#6b6b80",
                      }}
                    >
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more button */}
        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            style={{
              textAlign: "center",
              marginTop: "48px",
            }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary"
            >
              {showAll ? "Show Less" : `View All Projects (${projects.length})`}
            </button>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
