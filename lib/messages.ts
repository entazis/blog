import type { Locale } from "@/lib/i18n";

const messages = {
  en: {
    skipToContent: "Skip to content",

    siteDescription:
      "I write about software engineering, distributed systems, and developer tools. Sharing what I learn along the way.",
    siteTagline: "Sharing knowledge, one post at a time.",

    navPosts: "Posts",
    navNotes: "Notes",
    navReviews: "Reviews",
    navTags: "Tags",
    navSearch: "Search",

    homeHeroPrefix: "Hi, I'm ",
    homeHeroSuffix: "",
    homePrimaryCta: "Read the blog",
    homeSecondaryCta: "Browse by topic",
    homeLatestPost: "Latest post",
    homeRecentPosts: "Recent posts",
    viewAll: "View all →",
    homeUpdatesTitle: "Updates, soon",
    homeUpdatesBody:
      "Still building this. Add your email if you'd like a note when it's ready.",
    interestNotifyMe: "Notify me",
    interestNoEmailsYet: "No emails yet. Just collecting interest.",
    notFoundTitle: "Page not found",
    notFoundBody: "Sorry — we couldn’t find the page you were looking for.",
    notFoundGoHome: "Go back home →",

    postsTitle: "Posts",
    postsDescription: "Longer-form writing: deep dives, essays, and tutorials.",
    notesTitle: "Notes",
    notesDescription: "Short, practical notes—mostly “today I learned”.",
    reviewsTitle: "Reviews",
    reviewsDescription: "Reviews of books, tools, and ideas.",

    tagsTitle: "Tags",
    tagsDescription: "Browse content by topic.",
    tagItemsCountOne: "{count} item",
    tagItemsCountMany: "{count} items",

    searchTitle: "Search",
    searchDescription: "Type to search titles, excerpts, and tags.",
    searchQueryLabel: "Query",
    searchPlaceholder: "e.g. nextjs mdx nginx",
    searchIndexGenerated: "Index generated {value}",
    searchIndexLoading: "Loading index…",
    searchIndexFailed: "Failed to load index: {error}",
    searchResultsLabel: "Results ({count})",

    footerRights: "© {year} {name}. All rights reserved.",
  },
  hu: {
    skipToContent: "Ugrás a tartalomhoz",

    siteDescription:
      "Szoftvermérnökségről, elosztott rendszerekről és fejlesztői eszközökről írok. Közben megosztom, amit tanulok.",
    siteTagline: "Tudásmegosztás, bejegyzésről bejegyzésre.",

    navPosts: "Bejegyzések",
    navNotes: "Jegyzetek",
    navReviews: "Értékelések",
    navTags: "Témák",
    navSearch: "Keresés",

    homeHeroPrefix: "Szia, ",
    homeHeroSuffix: " vagyok",
    homePrimaryCta: "Blog",
    homeSecondaryCta: "Témák",
    homeLatestPost: "Legfrissebb bejegyzés",
    homeRecentPosts: "Friss bejegyzések",
    viewAll: "Összes →",
    homeUpdatesTitle: "Hamarosan",
    homeUpdatesBody:
      "Még épül. Add meg az emailed, ha szeretnél értesítést, amikor kész.",
    interestNotifyMe: "Értesítést kérek",
    interestNoEmailsYet:
      "Még nem küldünk emailt. Csak az érdeklődést gyűjtjük.",
    notFoundTitle: "Az oldal nem található",
    notFoundBody: "Sajnálom — nem találtuk meg a keresett oldalt.",
    notFoundGoHome: "Vissza a főoldalra →",

    postsTitle: "Bejegyzések",
    postsDescription:
      "Hosszabb írások: mélyebb elemzések, esszék és útmutatók.",
    notesTitle: "Jegyzetek",
    notesDescription:
      "Rövid, praktikus jegyzetek — többnyire „ma ezt tanultam”.",
    reviewsTitle: "Értékelések",
    reviewsDescription: "Könyvek, eszközök és ötletek értékelései.",

    tagsTitle: "Témák",
    tagsDescription: "Böngéssz témák szerint.",
    tagItemsCountOne: "{count} bejegyzés",
    tagItemsCountMany: "{count} bejegyzés",

    searchTitle: "Keresés",
    searchDescription: "Gépelj a címek, kivonatok és tagek közti kereséshez.",
    searchQueryLabel: "Keresés",
    searchPlaceholder: "pl. nextjs mdx nginx",
    searchIndexGenerated: "Index generálva: {value}",
    searchIndexLoading: "Index betöltése…",
    searchIndexFailed: "Nem sikerült betölteni: {error}",
    searchResultsLabel: "Találatok ({count})",

    footerRights: "© {year} {name}. Minden jog fenntartva.",
  },
} as const;

export type MessageKey = keyof (typeof messages)["en"];

type Vars = Record<string, string | number | Date>;

function formatVar(v: Vars[string]): string {
  if (v instanceof Date) return v.toLocaleString();
  return String(v);
}

// Minimal interpolation: replaces `{name}` style placeholders.
export function t(locale: Locale, key: MessageKey, vars: Vars = {}): string {
  const table = messages[locale] ?? messages.en;
  const template = table[key] ?? messages.en[key];
  return template.replace(/\{(\w+)\}/g, (_m, k) => {
    if (!(k in vars)) return `{${k}}`;
    return formatVar(vars[k]);
  });
}
