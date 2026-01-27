"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const langs = Array.isArray(navigator.languages) ? navigator.languages : [];
  const candidates = [navigator.language, ...langs].filter(Boolean) as string[];
  return candidates.some((l) => l.toLowerCase().startsWith("hu")) ? "hu" : defaultLocale;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = readCookie("locale");
    const target = isLocale(cookieLocale ?? "") ? (cookieLocale as Locale) : detectBrowserLocale();
    router.replace(`/${target}`);
  }, [router]);

  return (
    <main className="container py-10">
      <p className="text-muted-foreground">Redirecting…</p>
      <noscript>
        <p>
          JavaScript is disabled. Continue to <Link href="/en">English</Link> or{" "}
          <Link href="/hu">Magyar</Link>.
        </p>
      </noscript>
    </main>
  );
}

