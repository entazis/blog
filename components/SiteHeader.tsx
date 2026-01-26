import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.title}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link className="hover:underline" href="/posts">
            Posts
          </Link>
          <Link className="hover:underline" href="/notes">
            Notes
          </Link>
          <Link className="hover:underline" href="/reviews">
            Reviews
          </Link>
          <Link className="hover:underline" href="/tags">
            Tags
          </Link>
          <Link className="hover:underline" href="/search">
            Search
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

