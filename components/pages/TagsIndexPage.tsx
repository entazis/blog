import Link from "next/link";

import { getAllTags, getTagCounts } from "@/lib/content";
import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

export async function TagsIndexPage({ locale }: { locale: Locale }) {
  const [tags, counts] = await Promise.all([getAllTags(locale), getTagCounts(locale)]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t(locale, "tagsTitle")}</h1>
        <p className="text-muted-foreground">{t(locale, "tagsDescription")}</p>
      </header>

      <ul className="flex flex-wrap gap-2">
        {tags.map((tg) => (
          <li key={tg}>
            <Link
              href={addLocalePrefix(locale, `/tags/${encodeURIComponent(tg)}`)}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/60"
            >
              <span>#{tg}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {counts.get(tg) ?? 0}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
