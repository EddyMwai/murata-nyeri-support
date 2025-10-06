import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#7A4BFF",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#B768FF",
          foreground: "#fff",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#2d1a4a",
        },
      },
      boxShadow: {
        murata: "0 4px 24px 0 rgba(122,75,255,0.10)",
      },
      borderRadius: {
        murata: "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
