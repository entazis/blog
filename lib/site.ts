export const siteConfig = {
  title: "Entázis Blog",
  description:
    "I write about software engineering, distributed systems, and developer tools. Sharing what I learn along the way.",
  // Used for canonical URLs, sitemap, RSS, and absolute links.
  // Prefer `NEXT_PUBLIC_SITE_URL` so it's also available client-side if needed.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://blog.entazis.dev",
  author: {
    givenName: "Bence",
    familyName: "Szabó",
    name: "Bence Szabó",
    url: "https://entazis.dev",
  },
  tagline: "Sharing knowledge, one post at a time.",
  social: {
    github: "https://github.com/entazis",
    linkedin: "https://www.linkedin.com/in/szabobence1025",
    rss: "/rss.xml",
  },
} as const;
