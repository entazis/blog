import Link from "next/link";

import InterestForm from "@/components/InterestForm";
import { getAllContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

export async function HomeLanding({ locale }: { locale: Locale }) {
  const all = await getAllContent(locale);
  const [latest, ...rest] = all;
  const recent = rest.slice(0, 3);

  const postsHref = addLocalePrefix(locale, "/posts");
  const tagsHref = addLocalePrefix(locale, "/tags");

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {t(locale, "homeHeroPrefix")}
          <span className="gradient-text">Bence</span>
          {t(locale, "homeHeroSuffix")}
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          {t(locale, "siteDescription")}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={postsHref}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {t(locale, "homePrimaryCta")}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={tagsHref}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60"
          >
            {t(locale, "homeSecondaryCta")}
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t(locale, "homeLatestPost")}
          </p>
          <Link href={postsHref} className="text-sm font-semibold text-link hover:text-link-hover">
            {t(locale, "viewAll")}
          </Link>
        </div>
        {latest ? (
          <article className="post-card">
            {latest.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={latest.coverImage}
                alt={t(locale, "coverImageAlt", { title: latest.title })}
                className="mb-6 aspect-[16/9] w-full rounded-lg object-cover"
              />
            ) : null}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">{latest.type}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={latest.publishedAt}>{formatDate(latest.publishedAt)}</time>
            </div>
            <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight">
              <Link href={latest.url} className="hover:text-link-hover">
                {latest.title}
              </Link>
            </h2>
            <p className="mt-2 text-base text-muted-foreground">{latest.excerpt}</p>
            {latest.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {latest.tags.slice(0, 5).map((tg) => (
                  <Link
                    key={tg}
                    href={addLocalePrefix(locale, `/tags/${encodeURIComponent(tg)}`)}
                    className="tag"
                  >
                    {tg}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ) : (
          <p className="text-muted-foreground">{t(locale, "homeNoContentYet")}</p>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t(locale, "homeRecentPosts")}
          </p>
          <Link href={postsHref} className="text-sm font-semibold text-link hover:text-link-hover">
            {t(locale, "viewAll")}
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {recent.map((item) => (
            <li key={`${item.type}:${item.slug}`} className="post-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="tag">{item.type}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              </div>
              <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug tracking-tight">
                <Link href={item.url} className="hover:text-link-hover">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
              {item.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tg) => (
                    <Link
                      key={tg}
                      href={addLocalePrefix(locale, `/tags/${encodeURIComponent(tg)}`)}
                      className="tag"
                    >
                      {tg}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{t(locale, "homeUpdatesTitle")}</h2>
        <p className="mt-2 text-muted-foreground">{t(locale, "homeUpdatesBody")}</p>
        <InterestForm locale={locale} />
      </section>
    </div>
  );
}
