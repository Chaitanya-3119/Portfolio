import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/lib/nav";

type FooterProps = {
  name: string;
  email: string;
  availability?: string;
  links: NavLink[];
  socialLinks: { github?: string; linkedin?: string; twitter?: string };
};

export default function Footer({
  name,
  email,
  availability,
  links,
  socialLinks,
}: FooterProps) {
  const socials = [
    { label: "GitHub", href: socialLinks.github },
    { label: "LinkedIn", href: socialLinks.linkedin },
    { label: "Twitter", href: socialLinks.twitter },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="wrap">
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          <div>
            <Link
              href="/"
              className="font-serif no-underline"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-paper)",
              }}
            >
              {name}
              <span style={{ color: "var(--color-accent)" }}>.</span>
            </Link>
            <p className="lede mt-5 max-w-[34ch] text-[0.95rem]">
              Full stack developer building web products end to end.
            </p>
            {availability && (
              <p className="mono mt-5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                {availability}
              </p>
            )}
          </div>

          <nav aria-label="Footer">
            <p className="mono uppercase tracking-[0.16em]">Sitemap</p>
            <ul className="mt-4 list-none">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono uppercase tracking-[0.16em]">Elsewhere</p>
            <ul className="mt-4 list-none">
              <li>
                <a href={`mailto:${email}`} className="footer-link">
                  Email
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--color-line)" }}
        >
          <p className="mono">© {name}</p>
          <Link
            href="/#top"
            className="mono inline-flex items-center gap-1.5 no-underline transition-colors hover:text-[var(--color-accent)]"
          >
            Back to top
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
