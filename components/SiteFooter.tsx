import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-10 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}. Built with
          Next.js.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/rss.xml" className="hover:underline">
            RSS
          </Link>
          <a
            className="hover:underline"
            href={siteConfig.author.url}
            rel="me"
          >
            About
          </a>
        </div>
      </div>
    </footer>
  );
}

