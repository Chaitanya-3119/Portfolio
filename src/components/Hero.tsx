import { ArrowUpRight, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

type HeroProfile = {
  name: string;
  title: string;
  headline: string;
  headlineEm: string;
  tagline: string;
  location: string;
  email: string;
  availability?: string;
};

type HeroProject = {
  _id: string;
  title: string;
  slug: string;
  order: number;
  liveUrl?: string;
};

export default function Hero({
  profile,
  projects,
}: {
  profile: HeroProfile;
  projects: HeroProject[];
}) {
  // Find targeted live projects
  const findProject = (keywords: string[]) => {
    return projects.find((p) =>
      keywords.some(
        (k) =>
          p.slug.toLowerCase().includes(k.toLowerCase()) ||
          p.title.toLowerCase().includes(k.toLowerCase())
      )
    );
  };

  const p1 = findProject(["harekrishna", "hkm-vizag"]);
  const p2 = findProject(["makonis"]);
  const p3 = findProject(["career", "hiring"]);

  const picked: HeroProject[] = [];
  if (p1) picked.push(p1);
  if (p2) picked.push(p2);
  if (p3) {
    picked.push({
      ...p3,
      title: "HKM Careers",
    });
  } else {
    picked.push({
      _id: "careers",
      title: "HKM Careers",
      slug: "careers",
      order: 3,
      liveUrl: "https://careers.harekrishnavizag.org",
    });
  }

  // Filter out any DRM / donor care project from Live Right Now
  const nonDrmProjects = projects.filter(
    (p) =>
      !p.title.toLowerCase().includes("drm") &&
      !p.title.toLowerCase().includes("donor") &&
      !p.slug.toLowerCase().includes("donor")
  );

  const featured =
    picked.length >= 3
      ? picked.slice(0, 3)
      : [
          ...picked,
          ...nonDrmProjects.filter((p) => !picked.some((x) => x._id === p._id)),
        ].slice(0, 3);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-36">
      {/* hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 10%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(216, 255, 62, 0.07)" }}
      />

      <div className="wrap">
        <div className="grid items-end gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex-wrap">
                <span>{profile.name}</span>
                <span className="hidden sm:inline" aria-hidden="true">
                  ·
                </span>
                <span className="basis-full sm:basis-auto">{profile.title}</span>
              </p>
            </Reveal>

            <Reveal index={1}>
              <h1 className="display mt-7">
                {profile.headline} <em>{profile.headlineEm}</em>
              </h1>
            </Reveal>

            <Reveal index={2}>
              <p className="lede mt-8">{profile.tagline}</p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn btn-solid">
                  See selected work
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                  {profile.email}
                </a>
              </div>
            </Reveal>

            <Reveal index={4}>
              <dl
                className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 pt-6"
                style={{ borderTop: "1px solid var(--color-line)" }}
              >
                {profile.availability && (
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "var(--color-accent)",
                        boxShadow: "0 0 0 3px rgba(216,255,62,0.14)",
                      }}
                    />
                    <dt className="sr-only">Availability</dt>
                    <dd className="mono" style={{ color: "var(--color-paper)" }}>
                      {profile.availability}
                    </dd>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin
                    size={13}
                    aria-hidden="true"
                    style={{ color: "var(--color-fog-dim)" }}
                  />
                  <dt className="sr-only">Location</dt>
                  <dd className="mono">{profile.location}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {featured.length > 0 && (
            <Reveal index={5} className="lg:pb-2">
              <div>
                <p className="mono uppercase tracking-[0.18em]">
                  Live right now
                </p>
                <ul className="mt-5 list-none">
                  {featured.map((project, i) => (
                    <li key={project._id}>
                      <a
                        href={project.liveUrl ?? "#work"}
                        {...(project.liveUrl
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-baseline justify-between gap-4 py-3 no-underline"
                        style={{
                          borderTop: "1px solid var(--color-line)",
                          color: "var(--color-paper)",
                        }}
                      >
                        <span className="text-[15px] font-medium transition-colors group-hover:text-[var(--color-accent)]">
                          {project.title}
                        </span>
                        <span className="mono shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#work"
                  className="mono mt-4 inline-flex items-center gap-1.5 py-1.5 no-underline"
                  style={{ color: "var(--color-fog)" }}
                >
                  All work
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
