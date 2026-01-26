import "./globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeScript } from "@/components/ThemeScript";
import { siteConfig } from "@/lib/site";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen antialiased">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-white dark:focus:text-slate-950"
          href="#main"
        >
          Skip to content
        </a>
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4">
          <SiteHeader />
          <main id="main" className="flex-1 py-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

