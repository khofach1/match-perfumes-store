"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "@/data/translations";

type Lang = "en" | "fr";

interface LanguageContextType {
  lang: Lang;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (key) => key,
  toggleLanguage: () => {},
});

const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof result === "string" ? result : path;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("anar-lang") as Lang | null;
    if (stored === "en" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "fr" : "en";
      localStorage.setItem("anar-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
