import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllContentByType } from "@/lib/content";

export default async function PostsPage() {
  const posts = await getAllContentByType("posts");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Longer-form writing: deep dives, essays, and tutorials.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={p.url} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {p.excerpt}
            </p>
            {p.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
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

