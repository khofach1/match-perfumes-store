"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function TimerBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-brand-bg/60 dark:bg-[#0F0D0A]/60 backdrop-blur-sm border border-brand-gold/30 rounded-xl w-16 h-16 flex items-center justify-center">
        <span className="text-brand-gold dark:text-[#C19A6B] font-bold text-2xl font-heading tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-brand-text-secondary dark:text-[#A09080] text-[10px] uppercase tracking-widest mt-1.5">
        {label}
      </span>
    </div>
  );
}

export default function OffersSection() {
  const { t, lang } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 45, s: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 bg-brand-bg dark:bg-[#0F0D0A]" />
      {/* Background radial gradients overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(154,114,53,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Side decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-red/50 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-brand-red" />
          <span className="bg-brand-red text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-brand-red-light">
            {t("offers.badge")}
          </span>
          <span className="h-px w-8 bg-brand-red" />
        </div>

        {/* Title */}
        <h2
          className={[
            "text-3xl sm:text-5xl lg:text-7xl font-bold mb-4",
            "font-heading",
          ].join(" ")}
          style={{
            background: "linear-gradient(135deg, #9A7235 0%, #B08A3A 50%, #9A7235 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("offers.title")}
        </h2>

        {/* Subtitle */}
        <p className="text-brand-text-secondary dark:text-[#A09080] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          {t("offers.subtitle")}
        </p>

        {/* Countdown timer */}
        <div className="mb-10">
          <p className="text-brand-text-secondary dark:text-[#A09080] text-xs uppercase tracking-widest mb-4">
            {t("offers.timer")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <TimerBlock value={pad(timeLeft.h)} label="Hours" />
            <span className="text-brand-gold dark:text-[#C19A6B] text-3xl font-bold mb-4">:</span>
            <TimerBlock value={pad(timeLeft.m)} label="Minutes" />
            <span className="text-brand-gold dark:text-[#C19A6B] text-3xl font-bold mb-4">:</span>
            <TimerBlock value={pad(timeLeft.s)} label="Seconds" />
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/products?offer=true"
          className="inline-flex items-center gap-3 bg-brand-gold text-brand-bg font-bold px-10 py-4 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold hover:shadow-gold-lg text-lg group"
        >
          {t("offers.viewAll")}
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
