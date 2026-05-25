"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const marqueeText =
  "Free Delivery on orders over 100 DH • Livraison gratuite à partir de 100 DH • Free Delivery on orders over 100 DH • Livraison gratuite à partir de 100 DH • Free Delivery on orders over 100 DH • Livraison gratuite à partir de 100 DH • Free Delivery on orders over 100 DH • Livraison gratuite à partir de 100 DH •";

export default function TopBar() {
  const { t, toggleLanguage, lang } = useLanguage();

  const links = [
    { label: t("topBar.aboutUs"), href: "/about" },
    { label: t("topBar.privacyPolicy"), href: "/privacy" },
    { label: t("topBar.refundPolicy"), href: "/refund" },
  ];

  return (
    <div className="bg-brand-surface dark:bg-[#1A1714] border-b border-brand-border dark:border-[#3A3228] relative z-50">
      <div className="flex items-center h-9 overflow-hidden">
        {/* Marquee section */}
        <div className="flex-1 overflow-hidden relative min-w-0">
          <div
            className="flex whitespace-nowrap text-[11px] text-brand-text-secondary dark:text-[#A09080] animate-marquee"
            style={{ width: "max-content" }}
          >
            <span className="pe-8">{marqueeText}</span>
            <span className="pe-8">{marqueeText}</span>
          </div>
        </div>

        {/* Right side links */}
        <div className="flex items-center gap-0 flex-shrink-0 px-3 border-s border-brand-border dark:border-[#3A3228] bg-brand-surface dark:bg-[#1A1714]">
          <div className="hidden sm:flex items-center gap-0">
            {links.map((link, i) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-colors duration-200 px-3 py-0.5 whitespace-nowrap"
                >
                  {link.label}
                </Link>
                {i < links.length - 1 && (
                  <span className="text-brand-border dark:text-[#3A3228] text-xs">|</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-brand-border dark:text-[#3A3228] text-xs mx-1">|</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-[11px] font-semibold text-brand-gold dark:text-[#C19A6B] hover:text-brand-gold-hover transition-colors duration-200 px-3 py-0.5 whitespace-nowrap min-h-[36px]"
            aria-label={lang === "en" ? "Switch to French" : "Switch to English"}
          >
            {lang === "en" ? "Français" : "English"}
          </button>
        </div>
      </div>
    </div>
  );
}
