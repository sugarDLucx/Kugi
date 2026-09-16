import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Institutional Kugi Brand Tokens
        navy: {
          DEFAULT: "#0A192F",
          50: "#E6EDF5",
          100: "#CCD9EB",
          500: "#1A365D",
          800: "#0D1C32",
          900: "#0A192F",
          950: "#060F1D",
        },
        cyan: {
          DEFAULT: "#00B4D8",
          400: "#38BDF8",
          500: "#00B4D8",
          600: "#0284C7",
          fixed: "#B3EBFF",
          "fixed-dim": "#4CD6FB",
        },
        emerald: {
          DEFAULT: "#10B981",
          500: "#10B981",
          600: "#059669",
          fixed: "#6FFBBE",
          "fixed-dim": "#4EDEA3",
        },
        amber: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        crimson: {
          DEFAULT: "#DC2626",
          500: "#DC2626",
          600: "#B91C1C",
          container: "#FFDAD6",
        },
        // Stitch Surface Design Tokens
        surface: {
          DEFAULT: "#F7F9FB",
          dim: "#D8DADC",
          bright: "#F7F9FB",
          lowest: "#FFFFFF",
          low: "#F2F4F6",
          container: "#ECEEF0",
          high: "#E6E8EA",
          highest: "#E0E3E5",
        },
        "on-surface": {
          DEFAULT: "#191C1E",
          variant: "#44474D",
        },
        outline: {
          DEFAULT: "#75777E",
          variant: "#C5C6CD",
        },
        canvas: "#F8FAFC",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
        "mono-currency": ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
