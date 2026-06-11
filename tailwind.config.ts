import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "var(--bone)",
        "bone-soft": "var(--bone-soft)",
        "bone-deep": "var(--bone-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        sand: "var(--sand)",
        tangier: "var(--tangier)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        brand: {
          bg: "var(--bone)",
          surface: "var(--bone-soft)",
          card: "var(--bone-deep)",
          gold: "var(--tangier)",
          "gold-hover": "var(--ink-soft)",
          "text-primary": "var(--ink)",
          "text-secondary": "var(--ink-soft)",
          border: "#D4C5BB",
          red: "#8b1a1a",
          "red-light": "#b22222",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        heading: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Switzer", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Cairo", "sans-serif"],
        serif: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Switzer", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.68rem", { lineHeight: "1rem", letterSpacing: "0.24em" }],
        "display-xl": ["clamp(4.5rem, 12vw, 12rem)", { lineHeight: "0.86", letterSpacing: "0" }],
        "display-lg": ["clamp(3.75rem, 8vw, 8rem)", { lineHeight: "0.9", letterSpacing: "0" }],
        "display-md": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "0" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, var(--tangier) 0%, var(--ink-soft) 100%)",
        "cream-gradient": "linear-gradient(180deg, var(--bone) 0%, var(--bone-soft) 100%)",
      },
      boxShadow: {
        gold: "0 18px 50px rgba(26, 22, 20, 0.08)",
        "gold-lg": "0 24px 70px rgba(26, 22, 20, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
