"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { categoryTiles } from "@/data/products";

export default function ExploreMatchWorld() {
  const { t, lang } = useLanguage();
  const tiles = categoryTiles.filter((tile) => tile.id !== "match-beauty");

  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto">
      {/* Section heading */}
      <div className="text-center mb-8 sm:mb-12 px-4 sm:px-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-brand-gold" />
          <span className="text-brand-gold text-xs uppercase tracking-widest font-medium">
            Collections
          </span>
          <span className="h-px w-12 bg-brand-gold" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-brand-text-primary dark:text-[#F5F0E8] mb-3 font-heading">
          {t("explore.title")}
        </h2>
        <p className="text-brand-text-secondary dark:text-[#A09080] text-sm sm:text-base max-w-xl mx-auto">
          {t("explore.subtitle")}
        </p>
      </div>

      {/* ── Mobile: horizontal scroll carousel ── */}
      <div className="flex sm:hidden gap-3 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {tiles.map((tile) => {
          const titleKey = lang === "fr" ? tile.title_fr : tile.title_en;
          return (
            <Link
              key={tile.id}
              href={tile.href}
              className="relative overflow-hidden rounded-xl flex-shrink-0 w-[75vw] h-[45vw] snap-start block"
            >
              <Image
                src={tile.image}
                alt={titleKey}
                fill
                className="object-cover"
                sizes="75vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white text-lg font-medium font-heading">
                  {titleKey}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 sm:px-6">
        {tiles.map((tile) => {
          const titleKey = lang === "fr" ? tile.title_fr : tile.title_en;
          return (
            <Link
              key={tile.id}
              href={tile.href}
              className="relative overflow-hidden rounded-2xl group h-64 md:h-80 lg:h-96 block"
            >
              <Image
                src={tile.image}
                alt={titleKey}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/85 dark:from-[#0F0D0A]/85 via-brand-bg/30 dark:via-[#0F0D0A]/30 to-transparent transition-all duration-500 group-hover:from-brand-bg/70 dark:group-hover:from-[#0F0D0A]/70 group-hover:via-brand-bg/20 dark:group-hover:via-[#0F0D0A]/20" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-gold/40 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
                <h3 className="text-brand-gold text-2xl font-bold px-4 text-center transition-transform duration-300 group-hover:-translate-y-2 font-heading">
                  {titleKey}
                </h3>
                <p className="text-brand-text-secondary dark:text-[#A09080] text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                  {t("common.viewAll")} →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
