import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft } from "lucide-react";
import { getArticle, formatArticleDate } from "@/lib/articles";

// Articles are rendered per request (the list can be empty until the first post
// is written), so this route is allowed to block instead of prerendering.
export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  // Render per request so unknown slugs answer with a real 404 status.
  await connection();

  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="wrap max-w-[760px] pb-24 pt-32 sm:pt-36">
      <Link
        href="/articles"
        className="mono inline-flex items-center gap-2 py-2 no-underline transition-colors hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        All articles
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono">{formatArticleDate(article.date)}</span>
          <span aria-hidden="true" className="mono">
            /
          </span>
          <span className="mono">{article.readingTime} min read</span>
        </div>

        <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
          {article.title}
        </h1>

        <p className="lede mt-5">{article.summary}</p>

        {article.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5 list-none">
            {article.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div
        className="article-prose mt-12"
        style={{ borderTop: "1px solid var(--color-line)" }}
      >
        {article.content.map((block, i) =>
          block.startsWith("## ") ? (
            <h2 key={i}>{block.replace("## ", "")}</h2>
          ) : (
            <p key={i}>{block}</p>
          )
        )}
      </div>
    </article>
  );
}
