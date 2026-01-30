import Link from "next/link";

import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";
import { siteConfig } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const homeHref = addLocalePrefix(locale, "/");
  const rssHref = addLocalePrefix(locale, "/rss.xml");
  const authorName =
    locale === "hu"
      ? `${siteConfig.author.familyName} ${siteConfig.author.givenName}`
      : siteConfig.author.name;

  return (
    <footer className="border-t border-border py-10 text-sm text-muted-foreground">
      <div className="container flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Link href={homeHref} className="font-mono text-sm font-semibold text-foreground">
              {siteConfig.title}
            </Link>
            <p>{t(locale, "siteTagline")}</p>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              className="focus-ring rounded-md p-1 transition hover:text-foreground"
              href={siteConfig.social.github}
              aria-label={t(locale, "footerAriaGitHub")}
              rel="noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.6 2.36 1.14 2.94.87.09-.67.35-1.14.63-1.4-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.9-1.32 2.75-1.05 2.75-1.05.56 1.43.2 2.49.1 2.75.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .26.18.59.69.48A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a
              className="focus-ring rounded-md p-1 transition hover:text-foreground"
              href={siteConfig.social.linkedin}
              aria-label={t(locale, "footerAriaLinkedIn")}
              rel="noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5.01A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V21h-4V9z" />
              </svg>
            </a>
            <Link
              className="focus-ring rounded-md p-1 transition hover:text-foreground"
              href={rssHref}
              aria-label={t(locale, "footerAriaRss")}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M6.2 17.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM3 3.2v3.2c8.9 0 16 7.2 16 16H22C22 12 12.9 3.2 3 3.2zm0 6.4v3.2c5.4 0 9.6 4.4 9.6 9.6h3.2c0-7.1-5.7-12.8-12.8-12.8z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="text-xs text-muted-foreground/80">
          {t(locale, "footerRights", { year: new Date().getFullYear(), name: authorName })}
        </div>
      </div>
    </footer>
  );
}

