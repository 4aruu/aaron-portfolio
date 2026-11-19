import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const title = "Aaron Jacob Sunil — Cloud & AI Engineer";
const description =
  "AWS Certified Solutions Architect – Associate. I build AI systems and the cloud infrastructure they run on: multi-AZ AWS architectures, RAG pipelines and full-stack apps.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Theme: "light dark" follows the system; a stored override pins it.
            Runs before first paint so the page never flashes the wrong theme. */}
        <meta name="color-scheme" content="light dark" suppressHydrationWarning />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem("color-scheme");if(s==="light"||s==="dark")document.querySelector('meta[name="color-scheme"]').content=s}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
