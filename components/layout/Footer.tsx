"use client";

import React from "react";
import { FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}


function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.166.026C9.514.026 6.96 1.085 5.07 2.992 3.18 4.898 2.14 7.456 2.14 10.11c0 .69.065 1.367.184 2.028a2.57 2.57 0 01-.98.24c-.494 0-.8-.16-.8-.16s.06.46.54.74c.44.26.84.27.84.27s-.22.64-.22 1.03c0 .55.46.88.46.88s-.04 1.04.94 1.64c.74.45 2.13.57 3.57.5.3.53.68 1.04 1.17 1.53.76.76 1.74 1.37 2.96 1.62.36.07.72.11 1.09.11.37 0 .73-.04 1.09-.11 1.22-.25 2.2-.86 2.96-1.62.49-.49.87-1 1.17-1.53 1.44.07 2.83-.05 3.57-.5.98-.6.94-1.64.94-1.64s.46-.33.46-.88c0-.39-.22-1.03-.22-1.03s.4-.01.84-.27c.48-.28.54-.74.54-.74s-.31.16-.8.16c-.35 0-.68-.1-.98-.24.12-.66.18-1.34.18-2.03 0-2.654-1.04-5.212-2.93-7.118C17.041 1.086 14.485.026 11.833.026h.333z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.72a8.27 8.27 0 004.84 1.55V6.82a4.85 4.85 0 01-1.07-.13z" />
    </svg>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();

  const socials = [
    { icon: <InstagramIcon />, href: "https://www.instagram.com/anarperfumes", label: "Instagram" },
    { icon: <FaFacebook className="w-5 h-5" />, href: "https://www.facebook.com/anarperfumes", label: "Facebook" },
    { icon: <SnapchatIcon />, href: "#", label: "Snapchat" },
    { icon: <TikTokIcon />, href: "#", label: "TikTok" },
  ];

  return (
    <footer className="bg-brand-bg dark:bg-[#0F0D0A] border-t border-brand-border dark:border-[#3A3228]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">

          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <span className="text-brand-gold dark:text-[#C19A6B] font-heading text-3xl font-bold tracking-widest block">
                ANAR
              </span>
              <span className="text-brand-text-secondary dark:text-[#A09080] text-[10px] tracking-[0.4em] uppercase">
                PERFUMES
              </span>
            </div>
            <p className="text-brand-text-secondary dark:text-[#A09080] text-sm leading-relaxed mb-5">
              {t("footer.tagline")}
            </p>

            {/* Social Icons */}
            <div>
              <p className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-widest mb-3 font-medium">
                {t("footer.followUs")}
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-brand-border dark:border-[#3A3228] flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:text-brand-gold dark:hover:text-[#C19A6B] hover:border-brand-gold dark:hover:border-[#A07D4F] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Verification */}
          <div>
            <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-5">
              {t("footer.saudiVerified")}
            </h3>
            <div className="border border-brand-gold/40 rounded-xl p-4 inline-block mb-4 hover:border-brand-gold transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-gold dark:text-[#C19A6B]">
                    <path d="M12 1L9.5 8.5H2l6 4.5-2.5 7.5L12 16l6.5 4.5-2.5-7.5 6-4.5h-7.5L12 1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-gold dark:text-[#C19A6B] text-xs font-semibold">
                    {lang === "fr" ? "Maroc Business Center" : "Morocco Business Center"}
                  </p>
                  <p className="text-brand-text-secondary dark:text-[#A09080] text-[10px]">
                    {t("footer.kingdom")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border dark:border-[#3A3228]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <p className="text-brand-text-secondary dark:text-[#A09080] text-xs text-center">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
