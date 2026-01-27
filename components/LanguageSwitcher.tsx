"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { switchLocalePathname, type Locale, stripLocalePrefix } from "@/lib/i18n";

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  hu: "HU"
};

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const { locale } = stripLocalePrefix(pathname);

  const enHref = switchLocalePathname(pathname, "en");
  const huHref = switchLocalePathname(pathname, "hu");

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-1 py-1">
      <Link
        href={enHref}
        aria-current={locale === "en" ? "page" : undefined}
        className={[
          "focus-ring rounded-md px-2 py-1 text-xs font-semibold",
          locale === "en" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
        ].join(" ")}
      >
        {LOCALE_LABEL.en}
      </Link>
      <Link
        href={huHref}
        aria-current={locale === "hu" ? "page" : undefined}
        className={[
          "focus-ring rounded-md px-2 py-1 text-xs font-semibold",
          locale === "hu" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
        ].join(" ")}
      >
        {LOCALE_LABEL.hu}
      </Link>
    </div>
  );
}
