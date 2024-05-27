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
        "header-PlusPadding": "12rem", // Custom margin/padding value
      },
      colors: {
        "custom-blue": "#61ced5",
        "custom-green": "#61d5a5",
        "custom-red": "#d56161",
        "custom-yellow": "#d5d161",
        "custom-purple": "#6761CE",
        "custom-offWhite": "#efefef",
      },
      fontFamily: {
        orange: "var(--font-orange)",
        citrine: "var(--font-citrine)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};

export default config;
