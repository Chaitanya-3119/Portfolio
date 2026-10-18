import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { Github } from "@/components/Icons";
import { getPortfolioData } from "@/lib/portfolio";
import ProjectScreenshot from "@/components/ProjectScreenshot";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  const data = await getPortfolioData();
  return data.projects.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  await connection();

  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const screenshots = project.screenshots ?? [];
  const hasGallery = screenshots.length > 0;

  return (
    <article className="wrap max-w-[960px] pb-24 pt-32 sm:pt-36">
      <Link
        href="/#work"
        className="mono inline-flex items-center gap-2 py-2 no-underline transition-colors hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        All work
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
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
          {project.year && (
            <span className="mono inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {project.year}
            </span>
          )}
          {project.role && (
            <>
              <span aria-hidden="true" className="mono">
                /
              </span>
              <span className="mono">{project.role}</span>
            </>
          )}
        </div>

        <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
          {project.title}
        </h1>

        <p className="lede mt-5">{project.description}</p>

        {project.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5 list-none">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* Hero preview: live capture of the site, or the uploaded image */}
      <div
        className="shot mt-12 overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--color-line)" }}
      >
        <div
          className="shot-bar flex items-center justify-between px-4 py-2"
          aria-hidden="true"
        >
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
            <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
            <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.15)]" />
          </div>
          <span className="shot-url max-w-[240px] truncate text-[11px]">
            {project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
              project.slug}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0c10]">
          <ProjectScreenshot
            liveUrl={project.liveUrl}
            fallbackImage={project.image}
            alt={`${project.title} homepage`}
            title={project.title}
            priority
          />
        </div>
      </div>

      {/* Live + source links */}
      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid inline-flex items-center gap-2"
            >
              Visit live site
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost inline-flex items-center gap-2"
            >
              <Github size={15} aria-hidden="true" />
              View source
            </a>
          )}
        </div>
      )}

      {/* Long description */}
      {(project.longDescription || project.description) && (
        <section className="mt-14">
          <h2 className="eyebrow">About the project</h2>
          <p
            className="mt-4 text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7]"
            style={{ color: "var(--color-paper)" }}
          >
            {project.longDescription || project.description}
          </p>
        </section>
      )}

      {/* Features / highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mt-14">
          <h2 className="eyebrow">Features &amp; deliverables</h2>
          <ul className="mt-5 grid gap-3 list-none sm:grid-cols-2">
            {project.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  border: "1px solid var(--color-line)",
                  background: "var(--color-ink-soft)",
                }}
              >
                <Sparkles
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                  aria-hidden="true"
                />
                <span className="text-[0.92rem] leading-relaxed text-[var(--color-fog)]">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Screenshot gallery */}
      {hasGallery && (
        <section className="mt-14">
          <h2 className="eyebrow">Screenshots</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {screenshots.map((src, idx) => (
              <div
                key={idx}
                className="shot overflow-hidden rounded-xl"
                style={{ border: "1px solid var(--color-line)" }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0c10]">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    width={800}
                    height={500}
                    sizes="(min-width: 640px) 460px, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack */}
      {project.tags.length > 0 && (
        <section className="mt-14">
          <h2 className="eyebrow">Tech stack &amp; tools</h2>
          <ul className="mt-5 flex flex-wrap gap-2 list-none">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px]"
                style={{
                  border: "1px solid var(--color-line-strong)",
                  color: "var(--color-paper)",
                }}
              >
                <Layers size={12} aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div
        className="mt-16 pt-6"
        style={{ borderTop: "1px solid var(--color-line)" }}
      >
        <Link
          href="/#work"
          className="mono inline-flex items-center gap-2 no-underline transition-colors hover:text-[var(--color-accent)]"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to all work
        </Link>
      </div>
    </article>
  );
}
