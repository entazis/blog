import Link from "next/link";

import { mdxComponents } from "@/components/mdx/MDXComponents";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { formatDate } from "@/lib/dates";
import type { ContentItem } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function ContentArticle({ item }: { item: ContentItem }) {
  const content = await renderMdx(item.source, mdxComponents);

  return (
    <article className="min-w-0">
      <ArticleJsonLd item={item} />
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            {item.type}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{item.readingTime.text}</span>
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          {item.title}
        </h1>
        <p className="max-w-2xl text-pretty text-slate-600 dark:text-slate-300">
          {item.excerpt}
        </p>
        {item.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.coverImage}
            alt={`${item.title} cover`}
            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white object-cover dark:border-slate-800"
          />
        ) : null}
        {item.tags.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((t) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="text-xs font-medium text-sky-700 hover:underline dark:text-sky-300"
              >
                #{t}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <div className="prose prose-slate mt-10 dark:prose-invert">{content}</div>
    </article>
  );
}

