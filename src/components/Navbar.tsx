"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/lib/nav";

export default function Navbar({
  links,
  email,
  currentPath = "/",
}: {
  links: NavLink[];
  email: string;
  currentPath?: string;
}) {
  const onHome = currentPath === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  const toHref = (href: string) =>
    onHome && href.startsWith("/#") ? href.slice(1) : href;

  const isActive = (href: string) => {
    if (href === "/articles") return currentPath.startsWith("/articles");
    return onHome && active === href.replace("/#", "");
  };

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);

      let current = "";
      for (const link of links) {
        if (!link.href.startsWith("/#")) continue;
        const el = document.getElementById(link.href.slice(2));
        if (el && el.getBoundingClientRect().top <= 180) {
          current = link.href.slice(2);
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [links]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden="true"
        className="scroll-progress fixed inset-x-0 top-0 z-[60]"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="wrap">
          <div className={`nav-pill ${scrolled ? "is-scrolled" : ""}`}>
            <Link
              href={onHome ? "#top" : "/"}
              aria-label="Dasari Chaitanya — home"
              className="flex shrink-0 items-center gap-2.5 no-underline"
            >
              <span className="monogram" aria-hidden="true">
                DC
              </span>
              <span
                className="hidden text-[13px] font-semibold tracking-[-0.01em] sm:block"
                style={{ color: "var(--color-paper)" }}
              >
                Dasari Chaitanya
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 list-none">
                {links.map((link) => {
                  const href = toHref(link.href);
                  const current = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={href}
                        aria-current={current ? "page" : undefined}
                        className={`nav-link ${current ? "is-active" : ""}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={toHref("/#contact")}
                className="btn btn-solid hidden !py-2 !text-[13px] sm:inline-flex"
              >
                Let&apos;s talk
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Open menu"
                className="nav-icon-button lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[70] lg:hidden"
          style={{ backgroundColor: "var(--color-ink)" }}
        >
          <div className="wrap flex h-16 items-center justify-between">
            <span className="monogram" aria-hidden="true">
              DC
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="nav-icon-button"
            >
              <X size={18} />
            </button>
          </div>

          <nav aria-label="Primary" className="wrap mt-6">
            <ul className="list-none">
              {links.map((link, i) => (
                <li key={link.href} style={{ borderTop: "1px solid var(--color-line)" }}>
                  <Link
                    href={toHref(link.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-4 py-4 no-underline"
                    style={{ color: "var(--color-paper)" }}
                  >
                    <span className="font-serif text-[clamp(2rem,9vw,2.75rem)] leading-none">
                      {link.name}
                    </span>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wrap mt-10">
            <a
              href={`mailto:${email}`}
              className="mono inline-flex items-center gap-1.5 py-2 no-underline"
              style={{ color: "var(--color-fog)" }}
            >
              {email}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
