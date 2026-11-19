import type { Config } from "tailwindcss";

/* Colours resolve to CSS variables in globals.css, so light/dark switching
   happens in one place. The legacy names (canvas, obsidian, signal-blue, …)
   are kept as aliases so the project detail pages pick up the new system;
   their dark-* variants resolve to the same variables. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        l0: v("l0"),
        l1: v("l1"),
        l2: v("l2"),
        ink: v("ink"),
        "ink-2": v("ink-2"),
        "ink-3": v("ink-3"),
        accent: v("accent"),
        line: v("line"),

        /* legacy aliases */
        canvas: v("l0"),
        paper: v("l1"),
        obsidian: v("ink"),
        "iron-gray": v("ink-2"),
        slate: v("ink-2"),
        charcoal: v("ink"),
        mist: v("l0"),
        fog: v("line"),
        "signal-blue": v("accent"),
        "link-blue": v("accent"),
        "dark-canvas": v("l0"),
        "dark-surface": v("l1"),
        "dark-text": v("ink"),
        "dark-text-secondary": v("ink-2"),
        "dark-border": v("line"),
        "dark-mist": v("l0"),
        "signal-blue-dark": v("accent"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        text: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontWeight: {
        /* three weights only; bold/extrabold collapse to semibold */
        bold: "600",
        extrabold: "600",
        black: "600",
      },
      borderRadius: {
        link: "8px",
        card: "12px",
        pill: "8px",
        "button-lg": "8px",
      },
      maxWidth: {
        page: "1280px",
        content: "960px",
      },
    },
  },
  plugins: [],
};

export default config;
