import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* ── Light mode ── */
        canvas:       "#faf9f7",   // warm off-white (was cool #f5f5f7)
        paper:        "#f4f1ec",   // warm linen surface (was #ffffff)
        obsidian:     "#2c2a27",   // warm charcoal (was cool #1d1d1f)
        "iron-gray":  "#6b6459",   // warm mid-gray
        slate:        "#4a433c",   // warm slate
        charcoal:     "#2e2b27",   // warm dark
        mist:         "#e8e2da",   // warm mist (was #e2e2e5)
        fog:          "#d9d2c8",   // warm fog (was #d6d6d6)
        void:         "#0f0e0d",   // warm near-black

        /* ── Accent: sage green ── */
        "signal-blue":  "#4a7c59",  // sage green (replaces electric blue)
        "link-blue":    "#3d6b4a",  // deeper sage for links
        "pulse-green":  "#4a7c59",
        "deep-green":   "#3a6248",
        ultraviolet:    "#7d6b8a",  // muted mauve
        "ember-orange": "#b8622a",  // warm amber
        "lagoon-teal":  "#4a7c72",  // muted teal

        /* ── Dark mode ── */
        "dark-canvas":          "#0f0e0d",   // warm near-black
        "dark-surface":         "#1a1815",   // warm lifted surface
        "dark-text":            "#e8e4de",   // warm off-white text
        "dark-text-secondary":  "#9b9188",   // warm secondary
        "dark-border":          "#2e2b27",   // warm border
        "dark-mist":            "#252220",   // warm mist surface
        "signal-blue-dark":     "#6aab82",   // lighter sage for dark mode
      },
      fontFamily: {
        /* DM Serif Display for editorial headings — Inter for body */
        display: ['"DM Serif Display"', "Georgia", "serif"],
        text:    ['"Inter"', "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        link:        "10px",
        card:        "20px",   // slightly less rounded — more restrained
        pill:        "980px",
        "button-lg": "36px",
      },
      maxWidth: {
        page:    "1440px",
        content: "980px",
      },
    },
  },
  plugins: [],
};

export default config;

