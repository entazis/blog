import Link from "next/link";

import type { TocItem } from "@/lib/mdx";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc.length) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-border bg-card p-4 text-sm">
        <div className="font-semibold tracking-tight text-foreground">On this page</div>
        <ul className="mt-3 space-y-2 text-muted-foreground">
          {toc.map((i) => (
            <li key={i.id} className={i.depth === 3 ? "pl-3" : ""}>
              <Link href={`#${i.id}`} className="hover:text-link-hover">
                {i.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

