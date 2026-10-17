// Articles live here as data and render as real pages at /articles/[slug].
// Add an entry, write the paragraphs, and the page, sitemap and index update.
//
// Each article:
//   slug        URL segment, lowercase-with-dashes
//   title       shown as the page heading
//   summary     one or two sentences for the index and metadata
//   date        ISO date string
//   readingTime minutes, a number
//   tags        short labels
//   content     paragraphs in order; a string starting with "## " becomes a heading

export type Article = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: number;
  tags: string[];
  content: string[];
};

export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatArticleDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
