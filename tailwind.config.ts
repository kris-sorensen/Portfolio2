import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {},
      colors: {},
      fontFamily: {
        // sans: ["var(--font-inter)"],
        frantz: ["var(--font-frantz)"],
      },
      backgroundImage: {},
    },
  },
};

export default config;
