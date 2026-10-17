import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
        className="flex aspect-[16/10] items-center justify-center rounded-[14px]"
        style={{
          border: "1px solid var(--color-line)",
          background:
            "radial-gradient(120% 100% at 20% 0%, rgba(216,255,62,0.1), transparent 60%), #101014",
        }}
      >
        <span className="font-serif text-5xl tracking-tight opacity-80">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <div className="shot">
      <div className="shot-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span className="shot-url">
          {project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
            project.slug}
        </span>
      </div>
      <Image
        src={project.image}
        alt={`${project.title} interface`}
        width={1440}
        height={900}
        sizes="(min-width: 900px) 600px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

function ProjectBody({ project }: { project: ProjectItem }) {
  return (
    <div>
      <div className="project-meta">
        {project.year && <span className="mono">{project.year}</span>}
        {project.year && project.role && (
          <span aria-hidden="true" className="mono">
            /
          </span>
        )}
        {project.role && <span className="mono">{project.role}</span>}
        {project.status && (
          <span className="tag ml-1">
            <span
              aria-hidden="true"
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  project.status === "Live"
                    ? "var(--color-accent)"
                    : "var(--color-fog-dim)",
              }}
            />
            {project.status}
          </span>
        )}
      </div>

      <h3 className="font-serif text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
        {project.title}
      </h3>

      <p className="lede mt-4 text-[0.975rem]">{project.description}</p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-6 list-none space-y-2">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[0.9rem] leading-relaxed"
              style={{ color: "var(--color-fog)" }}
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-px w-4 shrink-0"
                style={{ background: "var(--color-line-strong)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5 list-none">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-7 flex flex-wrap items-center gap-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 py-1.5 text-[13px] font-medium no-underline"
              style={{ color: "var(--color-paper)" }}
            >
              Visit live
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1.5 text-[13px] no-underline"
              style={{ color: "var(--color-fog)" }}
            >
              <Github size={14} aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      )}
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
    <section id="work" className="section">
      <div className="wrap">
        <Reveal>
          <div className="header-row">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="h2 mt-4">Things I&apos;ve shipped.</h2>
            </div>
            <p className="mono max-w-[22ch] sm:text-right">
              {primary.length.toString().padStart(2, "0")} projects · built,
              deployed, still running
            </p>
          </div>
        </Reveal>

        <div>
          {primary.map((project, i) => (
            <Reveal
              key={project._id}
              as="article"
              className={`project-row ${i % 2 === 1 ? "flip" : ""}`}
            >
              <div className="project-media">
                <ProjectMedia project={project} />
              </div>
              <ProjectBody project={project} />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <Reveal>
            <div className="mt-16">
              <p className="eyebrow">More work</p>
              <ul className="mt-5 list-none">
                {rest.map((project) => (
                  <li
                    key={project._id}
                    style={{ borderTop: "1px solid var(--color-line)" }}
                  >
                    <a
                      href={project.liveUrl ?? project.githubUrl ?? "#work"}
                      target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-4 no-underline sm:grid-cols-[1.2fr_1.6fr_auto]"
                      style={{ color: "var(--color-paper)" }}
                    >
                      <span className="text-[15px] font-medium transition-colors group-hover:text-[var(--color-accent)]">
                        {project.title}
                      </span>
                      <span className="mono hidden truncate sm:block">
                        {project.tags.join(" · ")}
                      </span>
                      <span className="mono inline-flex items-center gap-2">
                        {project.year}
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
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
