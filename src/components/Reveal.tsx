"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  index?: number;
};

/**
 * Reveals its children once they scroll into view.
 * Uses a single IntersectionObserver per element and no animation library,
 * so there is no hydration cost beyond attaching the observer.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  index = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`.trim()}
      style={{ "--i": index } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
