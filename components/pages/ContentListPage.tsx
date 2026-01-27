import Link from "next/link";

import { getAllContentByType, type ContentType } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

function titleKeyFor(type: ContentType) {
  switch (type) {
    case "posts":
      return "postsTitle" as const;
    case "notes":
      return "notesTitle" as const;
    case "reviews":
      return "reviewsTitle" as const;
  }
}

function descriptionKeyFor(type: ContentType) {
  switch (type) {
    case "posts":
      return "postsDescription" as const;
    case "notes":
      return "notesDescription" as const;
    case "reviews":
      return "reviewsDescription" as const;
  }
}

function tagHref(locale: Locale, tag: string) {
  return addLocalePrefix(locale, `/tags/${encodeURIComponent(tag)}`);
}

export async function ContentListPage({ locale, type }: { locale: Locale; type: ContentType }) {
  const items = await getAllContentByType(type, locale);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t(locale, titleKeyFor(type))}</h1>
        <p className="text-muted-foreground">{t(locale, descriptionKeyFor(type))}</p>
      </header>

      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.slug} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">{type.slice(0, -1)}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={i.publishedAt}>{formatDate(i.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={i.url} className="hover:text-link-hover">
                {i.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{i.excerpt}</p>
            {i.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {i.tags.map((tg) => (
                  <Link key={tg} href={tagHref(locale, tg)} className="tag">
                    {tg}
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
