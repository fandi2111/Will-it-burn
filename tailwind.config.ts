import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f5ebe0",
        fg: "#271a0c",
        primary: "#d5bdaf",
        secondary: "#e3d5ca",
        accent: "#9ec58d",
        wrong: "#c76c5f"
      },
      fontFamily: {
        header: ["var(--font-league-spartan)"],
        text: ["var(--font-libre-baskerville)"],
      },
      fontSize: {
        h1: "4.67rem",
        h2: "4rem",
        h3: "3.33rem",
        h4: "2.67rem",
        h5: "2rem",
        h6: "1.67rem",
        h7: "1.33rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
