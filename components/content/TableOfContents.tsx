import Link from "next/link";

import type { TocItem } from "@/lib/mdx";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc.length) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="font-semibold tracking-tight">On this page</div>
        <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
          {toc.map((i) => (
            <li key={i.id} className={i.depth === 3 ? "pl-3" : ""}>
              <Link href={`#${i.id}`} className="hover:underline">
                {i.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

