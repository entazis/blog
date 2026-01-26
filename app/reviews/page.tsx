import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllContentByType } from "@/lib/content";

export default async function ReviewsPage() {
  const reviews = await getAllContentByType("reviews");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Reviews</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Reviews of books, tools, and ideas.
        </p>
      </header>

      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.slug} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={r.url} className="hover:underline">
                {r.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {r.excerpt}
            </p>
            {r.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {r.tags.map((t) => (
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
    </div>
  );
}

