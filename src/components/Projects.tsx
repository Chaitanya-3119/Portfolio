"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Info, X, ExternalLink, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Github } from "@/components/Icons";

export type ProjectItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  year?: string;
  role?: string;
  status?: string;
  highlights?: string[];
};

function ProjectMedia({ project }: { project: ProjectItem }) {
  if (!project.image) {
    return (
      <div
        className="flex aspect-[16/10] items-center justify-center rounded-[12px]"
        style={{
          border: "1px solid var(--color-line)",
          background:
            "radial-gradient(120% 100% at 20% 0%, rgba(216,255,62,0.1), transparent 60%), #101014",
        }}
      >
        <span className="font-serif text-3xl tracking-tight opacity-75">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <div className="shot overflow-hidden rounded-[12px] transition-transform duration-300 group-hover:scale-[1.01]">
      <div className="shot-bar py-1.5 px-3 flex items-center justify-between" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
        </div>
        <span className="shot-url text-[11px] truncate max-w-[180px]">
          {project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
            project.slug}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0c10]">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          width={800}
          height={500}
          sizes="(min-width: 1024px) 540px, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  if (projects.length === 0) return null;

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const featured = sorted.filter((p) => p.featured);
  const rest = sorted.filter((p) => !p.featured);
  const primary = featured.length > 0 ? featured : sorted;

  return (
    <section id="work" className="section relative">
      <div className="wrap">
        <Reveal>
          <div className="header-row mb-12">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="h2 mt-3">Things I&apos;ve shipped.</h2>
            </div>
            <p className="mono max-w-[26ch] sm:text-right text-[13px] text-[var(--color-fog)]">
              {primary.length.toString().padStart(2, "0")} production builds · live & running
            </p>
          </div>
        </Reveal>

        {/* Compact, High-Density Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {primary.map((project, i) => (
            <Reveal
              key={project._id}
              as="article"
              index={i}
              className="group card flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 hover:border-[var(--color-line-strong)]"
            >
              <div>
                {/* Media Preview */}
                <div className="mb-5">
                  <ProjectMedia project={project} />
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 text-[12px] mono text-[var(--color-fog)]">
                    {project.year && <span>{project.year}</span>}
                    {project.year && project.role && <span>/</span>}
                    {project.role && <span>{project.role}</span>}
                  </div>
                  {project.status && (
                    <span className="tag text-[11px] py-0.5 px-2">
                      <span
                        aria-hidden="true"
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            project.status.includes("Live")
                              ? "var(--color-accent)"
                              : "var(--color-fog-dim)",
                        }}
                      />
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-[1.45rem] sm:text-[1.65rem] leading-[1.15] tracking-[-0.02em] text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>

                {/* Description (compact 2-line clamp) */}
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-[var(--color-fog)] line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tag text-[11px] py-0.5 px-2">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tag text-[11px] py-0.5 px-1.5 text-[var(--color-fog)]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons: Details Modal + Visit Site */}
              <div
                className="mt-6 pt-4 flex items-center justify-between gap-3 border-t"
                style={{ borderColor: "var(--color-line)" }}
              >
                {/* Button 1: Details */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium py-1.5 px-3 rounded-lg transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--color-paper)",
                    border: "1px solid var(--color-line)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "var(--color-line-strong)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "var(--color-line)";
                  }}
                >
                  <Info size={14} className="text-[var(--color-accent)]" />
                  View Details
                </button>

                {/* Button 2: Visit Site & Source */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View source code"
                      className="p-1.5 rounded-md text-[var(--color-fog)] hover:text-[var(--color-paper)] transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium py-1.5 px-3.5 rounded-lg transition-all"
                      style={{
                        background: "var(--color-accent)",
                        color: "#0a0a0a",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      Visit site
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* More Work List for other projects */}
        {rest.length > 0 && (
          <Reveal>
            <div className="mt-14 pt-8 border-t border-[var(--color-line)]">
              <p className="eyebrow mb-4">Additional projects</p>
              <ul className="list-none space-y-1">
                {rest.map((project) => (
                  <li
                    key={project._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-3 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-medium text-[var(--color-paper)]">
                        {project.title}
                      </span>
                      {project.status && (
                        <span className="tag text-[10px] py-0 px-1.5">
                          {project.status}
                        </span>
                      )}
                      <span className="mono text-[12px] text-[var(--color-fog)] hidden md:inline">
                        {project.tags.slice(0, 3).join(" · ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-[12px] mono text-[var(--color-fog)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        Details
                      </button>
                      {(project.liveUrl || project.githubUrl) && (
                        <a
                          href={project.liveUrl ?? project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono text-[12px] text-[var(--color-paper)] inline-flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors"
                        >
                          Visit <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>

      {/* ================= PROJECT DETAILS MODAL ================= */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            background: "rgba(5, 5, 8, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            className="card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
            style={{
              background: "#101015",
              border: "1px solid var(--color-line-strong)",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-line)]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {selectedProject.status && (
                    <span className="tag text-[11px] py-0.5 px-2">
                      <span
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                        style={{
                          background: selectedProject.status.includes("Live")
                            ? "var(--color-accent)"
                            : "var(--color-fog-dim)",
                        }}
                      />
                      {selectedProject.status}
                    </span>
                  )}
                  {selectedProject.year && (
                    <span className="mono text-[12px] text-[var(--color-fog)]">
                      {selectedProject.year}
                    </span>
                  )}
                  {selectedProject.role && (
                    <span className="mono text-[12px] text-[var(--color-fog)]">
                      · {selectedProject.role}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[var(--color-paper)]">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close details"
                className="p-2 rounded-xl text-[var(--color-fog)] hover:text-[var(--color-paper)] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Media Preview */}
            {selectedProject.image && (
              <div className="my-5 overflow-hidden rounded-xl border border-[var(--color-line)]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={900}
                  height={500}
                  className="w-full h-auto object-cover max-h-[280px]"
                />
              </div>
            )}

            {/* Full Description */}
            <div className="mt-4">
              <h4 className="mono text-[11px] uppercase tracking-wider text-[var(--color-fog)] mb-2">
                About the project
              </h4>
              <p className="text-[0.95rem] leading-relaxed text-[var(--color-paper)]">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Key Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="mono text-[11px] uppercase tracking-wider text-[var(--color-fog)] mb-3">
                  Key Deliverables & Features
                </h4>
                <ul className="space-y-2.5 list-none">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-[var(--color-fog)]"
                    >
                      <Sparkles
                        size={15}
                        className="text-[var(--color-accent)] shrink-0 mt-1"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="mono text-[11px] uppercase tracking-wider text-[var(--color-fog)] mb-2.5">
                  Tech Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tag text-[12px] py-1 px-2.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="mt-8 pt-5 border-t border-[var(--color-line)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold py-2 px-5 rounded-xl transition-all"
                    style={{
                      background: "var(--color-accent)",
                      color: "#0a0a0a",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    Visit Site
                    <ExternalLink size={15} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] py-2 px-4 rounded-xl border border-[var(--color-line)] text-[var(--color-paper)] hover:border-[var(--color-line-strong)] transition-colors"
                  >
                    <Github size={16} />
                    View Source
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="text-[13px] py-2 px-4 rounded-xl text-[var(--color-fog)] hover:text-[var(--color-paper)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
