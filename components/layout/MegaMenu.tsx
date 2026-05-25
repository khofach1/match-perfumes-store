"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { key: "women", href: "/products?category=women" },
  { key: "men", href: "/products?category=men" },
  { key: "unisex", href: "/products?category=unisex" },
  { key: "niche", href: "/products?category=niche" },
];

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const { t } = useLanguage();

  return (
    <div className="absolute top-full start-0 w-screen max-w-3xl bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-b-2xl shadow-gold-lg z-50 animate-fadeIn overflow-hidden">
      <div className="grid grid-cols-3 gap-0">
        {/* Column 1: Women, Men, Unisex */}
        <div className="p-6 border-e border-brand-border dark:border-[#3A3228]">
          <p className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-widest mb-4 font-semibold">
            {t("nav.megaMenu.featured")}
          </p>
          <div className="space-y-1">
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-card dark:hover:bg-[#242018] group transition-all duration-200"
              >
                <span className="text-brand-text-primary dark:text-[#F5F0E8] text-sm group-hover:text-brand-gold dark:group-hover:text-[#C19A6B] transition-colors duration-200">
                  {t(`nav.megaMenu.${cat.key}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Niche */}
        <div className="p-6 border-e border-brand-border dark:border-[#3A3228]">
          <p className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-widest mb-4 font-semibold">
            Collections
          </p>
          <div className="space-y-1">
            {categories.slice(3).map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-card dark:hover:bg-[#242018] group transition-all duration-200"
              >
                <span className="text-brand-text-primary dark:text-[#F5F0E8] text-sm group-hover:text-brand-gold dark:group-hover:text-[#C19A6B] transition-colors duration-200">
                  {t(`nav.megaMenu.${cat.key}`)}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-border dark:border-[#3A3228] mt-4">
              <Link
                href="/products"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-brand-gold dark:text-[#C19A6B] text-sm font-medium hover:text-brand-gold-hover transition-colors duration-200 group"
              >
                <span>{t("nav.megaMenu.viewAll")}</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Column 3: Featured image */}
        <div className="relative overflow-hidden min-h-[240px]">
          <Image
            src="/images/hero/hero-collection.png"
            alt="Anar Perfumes Featured Collection"
            fill
            className="object-cover"
            sizes="300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 dark:from-[#0F0D0A]/90 via-brand-bg/40 dark:via-[#0F0D0A]/40 to-transparent" />
          <div className="absolute bottom-6 start-6 end-6">
            <p className="text-brand-gold dark:text-[#C19A6B] text-xs uppercase tracking-widest mb-1">
              Featured
            </p>
            <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-bold text-lg leading-tight mb-3 font-heading">
              The Signature Collection
            </h3>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-block bg-brand-gold text-brand-bg text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-gold-hover transition-colors duration-200"
            >
              {t("common.shopNow")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
