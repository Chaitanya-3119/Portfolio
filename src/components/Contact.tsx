"use client";

import { useState } from "react";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Github, Linkedin, Twitter } from "@/components/Icons";
import ContactForm from "@/components/ContactForm";

type ContactProfile = {
  email: string;
  location: string;
  availability?: string;
  socialLinks: { github?: string; linkedin?: string; twitter?: string };
};

export default function Contact({ profile }: { profile: ContactProfile }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const socials = [
    { label: "GitHub", href: profile.socialLinks.github, Icon: Github },
    { label: "LinkedIn", href: profile.socialLinks.linkedin, Icon: Linkedin },
    { label: "Twitter", href: profile.socialLinks.twitter, Icon: Twitter },
  ].filter((s) => Boolean(s.href));

  return (
    <section
      id="contact"
      className="section"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Contact</p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="display mt-5">
                Let&apos;s build something <em>worth shipping</em>.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lede mt-7">
                Open to full-time roles and select freelance work. Email is the
                fastest way to reach me — it comes straight to my inbox.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-8">
              <ContactForm />
            </Reveal>
          </div>

          <Reveal index={3} className="lg:pt-16">
            <div>
              <p className="mono uppercase tracking-[0.16em]">Write to me</p>
              <div
                className="mt-3 flex flex-wrap items-center gap-2 py-3"
                style={{ borderBlock: "1px solid var(--color-line)" }}
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[clamp(1.05rem,2.2vw,1.5rem)] font-medium no-underline transition-colors hover:text-[var(--color-accent)]"
                  style={{ color: "var(--color-paper)" }}
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                  style={{
                    border: "1px solid var(--color-line-strong)",
                    color: copied ? "var(--color-accent)" : "var(--color-fog)",
                    background: "transparent",
                  }}
                >
                  {copied ? (
                    <Check size={15} aria-hidden="true" />
                  ) : (
                    <Copy size={15} aria-hidden="true" />
                  )}
                </button>
              </div>
              <p
                role="status"
                aria-live="polite"
                className="mono mt-2 h-4"
              >
                {copied ? "Copied to clipboard" : ""}
              </p>

              {socials.length > 0 && (
                <ul className="mt-8 list-none">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 py-3 no-underline"
                        style={{
                          borderTop: "1px solid var(--color-line)",
                          color: "var(--color-paper)",
                        }}
                      >
                        <span className="flex items-center gap-2.5 text-[14px]">
                          <Icon size={14} aria-hidden="true" />
                          {label}
                        </span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {profile.availability && (
                <p className="mono mt-8 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  {profile.availability} · {profile.location}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
