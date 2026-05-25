"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render a same-size placeholder before mount to avoid layout shift
  if (!mounted) {
    return <div className="w-9 h-9" suppressHydrationWarning />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center text-brand-text-secondary hover:text-brand-gold dark:text-[#A09080] dark:hover:text-[#C19A6B] transition-colors duration-200 rounded-full hover:bg-brand-card dark:hover:bg-[#242018]"
    >
      {isDark ? <FaSun size={17} /> : <FaMoon size={17} />}
    </button>
  );
}
