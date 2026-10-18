"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Github } from "@/components/Icons";
import ProjectScreenshot from "@/components/ProjectScreenshot";

export type ProjectItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image?: string;
  screenshots?: string[];
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
  return (
    <div className="shot overflow-hidden rounded-[12px] transition-transform duration-300 group-hover:scale-[1.01]">
      <div
        className="shot-bar py-1.5 px-3 flex items-center justify-between"
        aria-hidden="true"
      >
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
        <ProjectScreenshot
          liveUrl={project.liveUrl}
          fallbackImage={project.image}
          alt={`${project.title} homepage preview`}
          title={project.title}
        />
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {primary.map((project, i) => (
            <Reveal
              key={project._id}
              as="article"
              index={i}
              className="group card flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 hover:border-[var(--color-line-strong)]"
            >
              <div>
                <div className="mb-5">
                  <ProjectMedia project={project} />
                </div>

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
                          background: project.status.includes("Live")
                            ? "var(--color-accent)"
                            : "var(--color-fog-dim)",
                        }}
                      />
                      {project.status}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-[1.45rem] sm:text-[1.65rem] leading-[1.15] tracking-[-0.02em] text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-[var(--color-fog)] line-clamp-2">
                  {project.description}
                </p>

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

              <div
                className="mt-6 pt-4 flex items-center justify-between gap-3 border-t"
                style={{ borderColor: "var(--color-line)" }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium py-1.5 px-3 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--color-paper)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  View Details
                  <ArrowRight size={14} className="text-[var(--color-accent)]" />
                </Link>

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
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium py-1.5 px-3.5 rounded-lg transition-all hover:opacity-90 hover:-translate-y-px"
                      style={{
                        background: "var(--color-accent)",
                        color: "#0a0a0a",
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
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-[12px] mono text-[var(--color-fog)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
                      >
                        Details <ArrowRight size={12} />
                      </Link>
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
    </section>
  );
}
