import Link from "next/link";

import { getAllTags, getTagCounts } from "@/lib/content";

export default async function TagsPage() {
  const [tags, counts] = await Promise.all([getAllTags(), getTagCounts()]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Tags</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Browse content by topic.
        </p>
      </header>

      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t}>
            <Link
              href={`/tags/${encodeURIComponent(t)}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              <span>#{t}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {counts.get(t) ?? 0}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

