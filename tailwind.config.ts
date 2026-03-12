import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D12",
        champagne: {
          DEFAULT: "#C9A84C",
          light: "#D4B86A",
          dark: "#A88B3A",
        },
        ivory: "#FAF8F5",
        midnight: "#2A2A35",
      },
      fontFamily: {
        heading: ['"Inter"', "system-ui", "sans-serif"],
        drama: ['"Playfair Display"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        cursive: ['"Dancing Script"', "cursive"],
      },
      borderRadius: {
        card: "2rem",
        section: "3rem",
        mega: "4rem",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
