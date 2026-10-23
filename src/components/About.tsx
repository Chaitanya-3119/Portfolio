import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Github, Linkedin, Twitter } from "@/components/Icons";

type AboutProfile = {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatar?: string;
  availability?: string;
  socialLinks: { github?: string; linkedin?: string; twitter?: string };
};

export default function About({
  profile,
  projectCount = 0,
}: {
  profile: AboutProfile;
  projectCount?: number;
}) {
  const socials = [
    { label: "GitHub", href: profile.socialLinks.github, Icon: Github },
    { label: "LinkedIn", href: profile.socialLinks.linkedin, Icon: Linkedin },
    { label: "Twitter", href: profile.socialLinks.twitter, Icon: Twitter },
  ].filter((s) => Boolean(s.href));

  const highlights = [
    {
      stat: projectCount > 0 ? String(projectCount).padStart(2, "0") : "04",
      label: "Live products in production, not demos",
    },
    {
      stat: "Full stack",
      label: "Interface, API, database and deploy — end to end",
    },
    {
      stat: "TypeScript",
      label: "Typed end to end, from React interfaces to Postgres schemas",
    },
  ];

  return (
    <section id="about" className="section" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              {profile.avatar && (
                <span
                  className="relative mb-7 block w-full overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "1448 / 1086",
                    border: "1px solid var(--color-line-strong)",
                  }}
                >
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="(min-width: 1024px) 420px, calc(100vw - 40px)"
                    className="h-full w-full object-cover"
                  />
                </span>
              )}
              <p className="eyebrow">About</p>
              <h2 className="h2 mt-4">Full stack, from schema to pixel.</h2>
              {profile.availability && (
                <p
                  className="mono mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em]"
                  style={{
                    border: "1px solid var(--color-line-strong)",
                    color: "var(--color-fog)",
                  }}
                >
                  <span
                    className="relative flex h-1.5 w-1.5"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ background: "var(--color-accent)" }}
                    />
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                  </span>
                  {profile.availability}
                </p>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal index={1}>
              <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.65]" style={{ color: "var(--color-paper)" }}>
                {profile.bio}
              </p>
            </Reveal>

            <Reveal index={2}>
              <ul className="mt-9 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3 list-none" style={{ background: "var(--color-line)", border: "1px solid var(--color-line)" }}>
                {highlights.map(({ stat, label }) => (
                  <li key={label} className="p-5" style={{ background: "var(--color-ink)" }}>
                    <p
                      className="font-serif text-[1.6rem] leading-none tracking-[-0.02em]"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {stat}
                    </p>
                    <p className="mt-2.5 text-[13px] leading-snug" style={{ color: "var(--color-fog)" }}>
                      {label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={3}>
              <dl
                className="mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2"
                style={{ background: "var(--color-line)", border: "1px solid var(--color-line)" }}
              >
                <div className="p-5" style={{ background: "var(--color-ink-soft)" }}>
                  <dt className="mono uppercase tracking-[0.16em]">Based in</dt>
                  <dd className="mt-2 flex items-center gap-2 text-[15px]">
                    <MapPin size={14} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                    {profile.location}
                  </dd>
                </div>
                <div className="p-5" style={{ background: "var(--color-ink-soft)" }}>
                  <dt className="mono uppercase tracking-[0.16em]">Role</dt>
                  <dd className="mt-2 text-[15px]">{profile.title}</dd>
                </div>
                <div className="p-5 sm:col-span-2" style={{ background: "var(--color-ink-soft)" }}>
                  <dt className="mono uppercase tracking-[0.16em]">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-link inline-block py-0.5 text-[15px]"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            {socials.length > 0 && (
              <Reveal index={4}>
                <ul className="mt-8 flex flex-wrap gap-3 list-none">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] no-underline transition-colors"
                        style={{
                          border: "1px solid var(--color-line-strong)",
                          color: "var(--color-paper)",
                        }}
                      >
                        <Icon size={14} aria-hidden="true" />
                        {label}
                        <ArrowUpRight
                          size={12}
                          aria-hidden="true"
                          className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
