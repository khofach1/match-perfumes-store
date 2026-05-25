"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function MatchBeautyBanner() {
  const { t } = useLanguage();

  const stats = [
    { value: "50+", label: "Products" },
    { value: "5★", label: "Rated" },
    { value: "100%", label: "Natural" },
  ];

  const content = (
    <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 max-w-xl">
      <div className="inline-flex items-center gap-2 mb-5">
        <span className="h-px w-8 bg-brand-gold" />
        <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">
          Beauty & Lifestyle
        </span>
      </div>

      <h2
        className="text-4xl sm:text-5xl font-bold mb-4 font-heading"
        style={{
          background: "linear-gradient(135deg, #9A7235 0%, #5C3415 60%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {t("beauty.title")}
      </h2>

      <p className="text-brand-text-primary/80 dark:text-[#F5F0E8]/80 text-lg mb-3 font-light">
        {t("beauty.subtitle")}
      </p>

      <p className="text-brand-text-secondary dark:text-[#A09080] text-sm mb-8 leading-relaxed max-w-md">
        {t("beauty.description")}
      </p>

      <div className="flex gap-8 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-brand-gold dark:text-[#C19A6B] font-bold text-2xl font-heading">
              {stat.value}
            </div>
            <div className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-wider mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <span className="inline-flex items-center px-8 py-4 rounded-xl text-base font-bold bg-brand-border dark:bg-[#3A3228] text-brand-text-secondary dark:text-[#A09080] cursor-default select-none">
        {t("beauty.cta")}
      </span>
    </div>
  );

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Mobile / tablet: image on top, content below */}
      <div className="block md:hidden rounded-3xl overflow-hidden bg-brand-surface dark:bg-[#1A1714]">
        <div className="relative h-56 sm:h-72 w-full">
          <Image
            src="/images/anar-beauty.png"
            alt="Anar Perfumes Beauty Collection"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 dark:from-[#0F0D0A]/60 via-transparent to-transparent" />
        </div>
        {content}
      </div>

      {/* Desktop: overlay design */}
      <div className="hidden md:block relative rounded-3xl overflow-hidden min-h-[480px]">
        <div className="absolute inset-0">
          <Image
            src="/images/anar-beauty.png"
            alt="Anar Perfumes Beauty Collection"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/95 dark:from-[#0F0D0A]/95 via-brand-bg/70 dark:via-[#0F0D0A]/70 to-brand-bg/20 dark:to-[#0F0D0A]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 dark:from-[#0F0D0A]/80 via-transparent to-transparent" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 40%)",
          }}
        />
        <div className="relative flex items-center w-full min-h-[480px]">
          {content}
        </div>
      </div>
    </section>
  );
}
