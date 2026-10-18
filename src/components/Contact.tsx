"use client";

import { useState } from "react";
import { Check, Copy, ArrowUpRight, Mail } from "lucide-react";
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
        <Reveal>
          <div className="header-row">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="h2 mt-4">
                Let&apos;s build something <em>worth shipping</em>.
              </h2>
            </div>
            <p className="lede max-w-[38ch] text-[0.95rem] sm:text-right">
              Open to full-time roles and select freelance work. The form below
              reaches me directly — or just email me.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <Reveal index={1}>
            <ContactForm />
          </Reveal>

          <Reveal index={2}>
            <div className="flex h-full flex-col gap-5">
              <div className="card p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(216,255,62,0.1)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <p className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fog)]">
                    Email directly
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-link break-all text-[0.95rem]"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                    style={{
                      border: "1px solid var(--color-line-strong)",
                      color: copied ? "var(--color-accent)" : "var(--color-fog)",
                    }}
                  >
                    {copied ? (
                      <Check size={15} aria-hidden="true" />
                    ) : (
                      <Copy size={15} aria-hidden="true" />
                    )}
                  </button>
                </div>

                <p role="status" aria-live="polite" className="mono mt-2 h-4 text-[11px] text-[var(--color-accent)]">
                  {copied ? "Copied to clipboard" : ""}
                </p>

                {profile.availability && (
                  <p
                    className="mono mt-4 flex items-center gap-2 pt-4 text-[12px]"
                    style={{ borderTop: "1px solid var(--color-line)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "var(--color-accent)",
                        boxShadow: "0 0 0 3px rgba(216,255,62,0.14)",
                      }}
                    />
                    {profile.availability} · {profile.location}
                  </p>
                )}
              </div>

              {socials.length > 0 && (
                <div className="card p-5 sm:p-6">
                  <p className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-fog)]">
                    Find me online
                  </p>
                  <ul className="mt-4 list-none">
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
                            <Icon size={15} aria-hidden="true" />
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
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
