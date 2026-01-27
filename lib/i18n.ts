export const locales = ["en", "hu"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePrefix(locale: Locale): string {
  return `/${locale}`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale; pathname: string } {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p === "/en") return { locale: "en", pathname: "/" };
  if (p.startsWith("/en/")) return { locale: "en", pathname: p.slice("/en".length) };
  if (p === "/hu") return { locale: "hu", pathname: "/" };
  if (p.startsWith("/hu/")) return { locale: "hu", pathname: p.slice("/hu".length) };
  return { locale: defaultLocale, pathname: p };
}

export function addLocalePrefix(locale: Locale, pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const { pathname: base } = stripLocalePrefix(p);
  return `${localePrefix(locale)}${base === "/" ? "" : base}` || localePrefix(locale);
}

export function switchLocalePathname(pathname: string, targetLocale: Locale): string {
  return addLocalePrefix(targetLocale, pathname);
}

