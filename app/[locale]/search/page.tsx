import type { Metadata } from "next";

import { SearchClient } from "@/components/search/SearchClient";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  return {
    title: t(locale, "searchTitle"),
    robots: { index: false, follow: true }
  };
}

export default async function SearchPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  return <SearchClient locale={locale} />;
}

