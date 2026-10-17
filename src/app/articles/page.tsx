import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { sortedArticles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Notes on building web products — frontend, backend and the parts in between.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const posts = sortedArticles();

  return (
    <div className="wrap pb-24 pt-32 sm:pt-36">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="display mt-5">Articles</h1>
        <p className="lede mt-6">
          Notes on building web products — what worked, what broke, and the
          details that don&apos;t fit in a commit message.
        </p>
      </Reveal>

      {posts.length > 0 ? (
        <ul className="mt-14 list-none">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} index={i}>
              <Link
                href={`/articles/${post.slug}`}
                className="group grid gap-3 py-7 no-underline md:grid-cols-[160px_1fr_auto] md:gap-10"
                style={{
                  borderTop: "1px solid var(--color-line)",
                  color: "var(--color-paper)",
                }}
              >
                <span className="mono md:pt-1">
                  {formatArticleDate(post.date)}
                </span>
                <span>
                  <span className="block text-[1.25rem] font-medium tracking-[-0.01em] transition-colors group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </span>
                  <span
                    className="mt-1.5 block max-w-[62ch] text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--color-fog)" }}
                  >
                    {post.summary}
                  </span>
                </span>
                <span className="mono inline-flex items-start gap-2">
                  {post.readingTime} min
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal index={1}>
          <div
            className="mt-14 rounded-2xl px-8 py-14 text-center"
            style={{
              border: "1px solid var(--color-line)",
              background: "var(--color-ink-soft)",
            }}
          >
            <p className="mono uppercase tracking-[0.16em]">Coming soon</p>
            <p className="mt-3 font-serif text-[clamp(1.6rem,3vw,2rem)] leading-tight">
              The first article is being written.
            </p>
            <p className="lede mx-auto mt-4 text-[0.95rem]">
              Until then, the work is the best thing to read.
            </p>
            <Link href="/#work" className="btn btn-ghost mt-7">
              See selected work
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
