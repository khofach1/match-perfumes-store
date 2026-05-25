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
        brand: {
          bg: "#F9F8F6",
          surface: "#EFE9E3",
          card: "#E5DDD4",
          gold: "#9A7235",
          "gold-hover": "#B08A3A",
          "text-primary": "#1A0D08",
          "text-secondary": "#7A6558",
          border: "#D4C5BB",
          red: "#8b1a1a",
          "red-light": "#b22222",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
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
        "gold-gradient": "linear-gradient(135deg, #9A7235 0%, #B08A3A 50%, #9A7235 100%)",
        "cream-gradient": "linear-gradient(180deg, #F9F8F6 0%, #EFE9E3 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(154, 114, 53, 0.18)",
        "gold-lg": "0 0 40px rgba(154, 114, 53, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
