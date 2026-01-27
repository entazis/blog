import Link from "next/link";

import { getContentByTag } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

function countLabel(locale: Locale, count: number) {
  const key = count === 1 ? ("tagItemsCountOne" as const) : ("tagItemsCountMany" as const);
  return t(locale, key, { count });
}

export async function TagPage({ locale, tag }: { locale: Locale; tag: string }) {
  const items = await getContentByTag(tag, locale);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">#{tag}</h1>
        <p className="text-muted-foreground">{countLabel(locale, items.length)}</p>
      </header>

      <ul className="space-y-4">
        {items.map((i) => (
          <li key={`${i.type}:${i.slug}`} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">{i.type}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={i.publishedAt}>{formatDate(i.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={i.url} className="hover:text-link-hover">
                {i.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{i.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
