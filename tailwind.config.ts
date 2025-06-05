import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        app: {
          bg: "#F9FAFC",
        },
        "brand-blue": "#005CEE",
        "brand-blue-hover": "#0052D6",
        "brand-blue-light": "#E6F0FF",
        secondary: {
          DEFAULT: "#005CEE",
          foreground: "#FFFFFF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      backgroundColor: {
        app: "#F9FAFC",
      },
      boxShadow: {
        input: "0px 8px 30px rgba(0, 0, 0, 0.06)",
        soft: "0px 8px 30px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
}
export default config
