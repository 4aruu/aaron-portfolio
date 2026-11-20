// The Systems Atlas type: Young Serif (titles), Schibsted Grotesk (text),
// Martian Mono (annotation). Self-hosted variable fonts; the site uses 400–600.
import "@fontsource/young-serif/latin-400.css";
import "@fontsource-variable/schibsted-grotesk/wght.css";
import "@fontsource-variable/martian-mono/wght.css";
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
    { media: "(prefers-color-scheme: light)", color: "#efe9dd" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

/* Runs before first paint.
   1. Theme: apply a stored Day/Night choice, so the page never flashes the wrong theme.
   2. Opening cube: on the homepage, with no deep link and motion allowed, mark
      <html class="atlas-intro"> so the cube shows from the first frame. If the
      cube's code has not started within 4 s, drop the class and show the plain page. */
const THEME_AND_INTRO = `try{var s=localStorage.getItem("color-scheme");if(s==="light"||s==="dark")document.querySelector('meta[name="color-scheme"]').content=s}catch(e){}
try{if(location.pathname==="/"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var h=document.documentElement;h.classList.add("atlas-intro");setTimeout(function(){if(!window.__atlasCubeReady)h.classList.remove("atlas-intro")},4000)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The pre-paint script below adds class="atlas-intro" to <html> before React
    // loads (so the cube is in the first frame). That difference is intended;
    // this tells React to ignore attribute differences on <html> only.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme: "light dark" follows the system; a stored override pins it.
            Runs before first paint so the page never flashes the wrong theme. */}
        <meta name="color-scheme" content="light dark" suppressHydrationWarning />
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_AND_INTRO,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
