import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        content: "rgb(var(--color-content) / <alpha-value>)",
        iris: {
          darker: "rgb(var(--color-iris-darker) / <alpha-value>)",
          lighter: "rgb(var(--color-iris-lighter) / <alpha-value>)",
        },
        up: "rgb(var(--color-up) / <alpha-value>)",
        down: "rgb(var(--color-down) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
