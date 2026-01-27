import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Lora } from "next/font/google";

import { LanguageScript } from "@/components/LanguageScript";
import { ThemeScript } from "@/components/ThemeScript";
import { siteConfig } from "@/lib/site";

const fontSans = Lora({
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
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg"
  },
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <head>
        <ThemeScript />
        <LanguageScript />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

