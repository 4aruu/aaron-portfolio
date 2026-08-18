import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f5f5f7",
        paper: "#ffffff",
        obsidian: "#1d1d1f",
        "iron-gray": "#707070",
        slate: "#474747",
        charcoal: "#333336",
        mist: "#e2e2e5",
        fog: "#d6d6d6",
        void: "#000000",
        "signal-blue": "#0071e3",
        "link-blue": "#0066cc",
        "pulse-green": "#03aa49",
        "deep-green": "#03873a",
        ultraviolet: "#8668ff",
        "ember-orange": "#ed6300",
        "lagoon-teal": "#00a1b3",
        // Dark-mode counterparts — driven by the visitor's OS preference, not a toggle
        "dark-canvas": "#000000",
        "dark-surface": "#1d1d1f",
        "dark-text": "#f5f5f7",
        "dark-text-secondary": "#a1a1a6",
        "dark-border": "#38383a",
        "dark-mist": "#2c2c2e",
        "signal-blue-dark": "#2997ff",
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
        text: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        link: "10px",
        card: "28px",
        pill: "980px",
        "button-lg": "36px",
      },
      maxWidth: {
        page: "1440px",
        content: "980px",
      },
    },
  },
  plugins: [],
};

export default config;
