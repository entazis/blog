import Link from "next/link";

import { getAllContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const latest = (await getAllContent()).slice(0, 8);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-balance text-4xl font-semibold tracking-tight">
          {siteConfig.title}
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-slate-600 dark:text-slate-300">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/posts"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Browse posts
          </Link>
          <Link
            href="/search"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Search
          </Link>
          <Link
            href="/tags"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Tags
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Latest writing</h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
          >
            View all
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {latest.map((item) => (
            <li
              key={`${item.type}:${item.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {item.type}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={item.publishedAt}>
                  {formatDate(item.publishedAt)}
                </time>
              </div>
              <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug tracking-tight">
                <Link href={item.url} className="hover:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {item.excerpt}
              </p>
              {item.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((t) => (
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

