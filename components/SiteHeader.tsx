import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {siteConfig.title}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-muted-foreground">
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href="/posts">
            Posts
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href="/notes">
            Notes
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href="/reviews">
            Reviews
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href="/tags">
            Tags
          </Link>
          <Link className="focus-ring rounded-md px-1 py-1 hover:text-foreground" href="/search">
            Search
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

