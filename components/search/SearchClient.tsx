"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type SearchIndexItem = {
  type: "posts" | "notes" | "reviews";
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  url: string;
};

type SearchIndex = {
  generatedAt: string;
  items: SearchIndexItem[];
};

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: SearchIndex) => {
        if (cancelled) return;
        setIndex(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e?.message ?? e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!index?.items) return [];
    if (!q) return index.items.slice(0, 20);
    const terms = q.split(/\s+/).filter(Boolean);
    return index.items
      .map((item) => {
        const haystack = normalize(
          [item.title, item.excerpt, item.tags.join(" ")].join(" ")
        );
        const score = terms.reduce((acc, t) => (haystack.includes(t) ? acc + 1 : acc), 0);
        return { item, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map((x) => x.item);
  }, [index, query]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          Type to search titles, excerpts, and tags.
        </p>
      </header>

      <div className="space-y-3">
        <label className="text-sm font-medium" htmlFor="q">
          Query
        </label>
        <input
          id="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. nextjs mdx nginx"
          className="focus-ring w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground shadow-sm"
        />
        <div className="text-xs text-muted-foreground">
          {error
            ? `Failed to load index: ${error}`
            : index
              ? `Index generated ${new Date(index.generatedAt).toLocaleString()}`
              : "Loading index…"}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Results ({results.length})
        </h2>
        <ul className="space-y-4">
          {results.map((r) => (
            <li key={`${r.type}:${r.slug}`} className="post-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="tag">{r.type}</span>
                <span aria-hidden="true"> · </span>
                <time dateTime={r.publishedAt}>
                  {new Date(r.publishedAt).toLocaleDateString()}
                </time>
              </div>
              <div className="mt-2">
                <Link href={r.url} className="text-lg font-semibold tracking-tight hover:text-link-hover">
                  {r.title}
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
              {r.tags.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="tag">
                      {t}
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

