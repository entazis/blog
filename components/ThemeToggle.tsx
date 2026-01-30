"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/messages";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition hover:border-primary/60"
      aria-label={t(locale, "themeToggleLabel")}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      <span className="sr-only">{t(locale, "themeToggleLabel")}</span>
      {isDark ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2.5M12 19v2.5M4.3 4.3l1.8 1.8M17.9 17.9l1.8 1.8M2.5 12h2.5M19 12h2.5M4.3 19.7l1.8-1.8M17.9 6.1l1.8-1.8" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 14.5a8 8 0 1 1-8.5-11 7 7 0 0 0 8.5 11z" />
        </svg>
      )}
    </button>
  );
}

