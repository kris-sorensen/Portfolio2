import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "100": "25rem",
      },
      colors: {
        primary: "#0a0a0a",
        secondary: "#f4e3b2",
        accent: "#ff4081",
        deepBlue: "#153178",
        darkGray: "#1a1a1a",
      },
      fontFamily: {
        // sans: ["var(--font-inter)"],
        frantz: ["var(--font-frantz)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        space: "url('/images/space-bg.jpg')",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "fade-in": "fadeIn 1s ease-in forwards",
        "pulse-glow": "pulseGlow 2s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "blur(2px)" },
          "50%": { opacity: "0.6", filter: "blur(4px)" },
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(244, 227, 178, 0.6)", // Soft yellow glow
        deep: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
