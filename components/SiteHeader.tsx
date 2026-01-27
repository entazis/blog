import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";
import { siteConfig } from "@/lib/site";

export function SiteHeader({ locale }: { locale: Locale }) {
  const homeHref = addLocalePrefix(locale, "/");
  const postsHref = addLocalePrefix(locale, "/posts");
  const notesHref = addLocalePrefix(locale, "/notes");
  const reviewsHref = addLocalePrefix(locale, "/reviews");
  const tagsHref = addLocalePrefix(locale, "/tags");
  const searchHref = addLocalePrefix(locale, "/search");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href={homeHref} className="font-mono text-sm font-semibold tracking-tight">
          {siteConfig.title}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-muted-foreground">
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href={postsHref}>
            {t(locale, "navPosts")}
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href={notesHref}>
            {t(locale, "navNotes")}
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href={reviewsHref}>
            {t(locale, "navReviews")}
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href={tagsHref}>
            {t(locale, "navTags")}
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href={searchHref}>
            {t(locale, "navSearch")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

