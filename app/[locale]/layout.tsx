import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
  const canonical = `${siteConfig.siteUrl}/${locale}`;

  return {
    description: t(locale, "siteDescription"),
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.title,
      title: siteConfig.title,
      description: t(locale, "siteDescription")
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  return (
    <>
      <a className="skip-link" href="#main">
        {t(locale, "skipToContent")}
      </a>
      <div className="flex min-h-screen flex-col">
        <SiteHeader locale={locale} />
        <main id="main" className="container flex-1 py-10">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}

