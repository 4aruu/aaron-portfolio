import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Aaron Jacob Sunil — Systems-First Developer",
  description:
    "Systems-first developer crafting intelligent, resilient full-stack applications. Architecture meets intention.",
  openGraph: {
    title: "Aaron Jacob Sunil — Systems-First Developer",
    description:
      "Systems-first developer crafting intelligent, resilient full-stack applications.",
    type: "website",
  },
  other: {
    "color-scheme": "light dark",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas dark:bg-dark-canvas text-obsidian dark:text-dark-text font-text">
        {children}
      </body>
    </html>
  );
}
