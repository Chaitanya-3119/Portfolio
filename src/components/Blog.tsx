"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, Clock, ArrowUpRight } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  readTime: number;
  createdAt: string;
}

interface BlogProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const publishedBlogs = blogs.filter((b) => b.published);

  if (publishedBlogs.length === 0) return null;

  return (
    <section id="blog" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <PenLine size={12} style={{ marginRight: "6px" }} />
            Blog
          </span>
          <h2 className="section-title">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="section-subtitle">
            Thoughts, tutorials, and insights on software development
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
          className="blog-grid"
        >
          {publishedBlogs.map((blog, i) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card"
              style={{
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  height: "180px",
                  background: `linear-gradient(${
                    135 + i * 45
                  }deg, rgba(108,99,255,0.12), rgba(0,212,255,0.08), rgba(255,107,157,0.06))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <PenLine
                  size={48}
                  style={{ color: "rgba(108,99,255,0.2)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        background: "rgba(10,10,15,0.6)",
                        backdropFilter: "blur(8px)",
                        fontSize: "0.7rem",
                        color: "#a0a0b8",
                        fontWeight: 500,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                    fontSize: "0.8rem",
                    color: "#6b6b80",
                  }}
                >
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={12} /> {blog.readTime} min read
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#a0a0b8",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: "16px",
                  }}
                >
                  {blog.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#6c63ff",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Read More <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
