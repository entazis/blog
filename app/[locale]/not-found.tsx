"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { addLocalePrefix, defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

function normalizeLocale(value: unknown): Locale {
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = normalizeLocale(params?.locale);

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t(locale, "notFoundTitle")}</h1>
      <p className="text-muted-foreground">{t(locale, "notFoundBody")}</p>
      <div>
        <Link
          href={addLocalePrefix(locale, "/")}
          className="focus-ring inline-flex items-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          {t(locale, "notFoundGoHome")}
        </Link>
      </div>
    </div>
  );
}

