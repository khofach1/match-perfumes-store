"use client";

import React from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { customerReviews } from "@/data/products";

interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-72 bg-brand-card dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5 mx-2 hover:border-brand-gold/40 transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= review.rating ? "fill-brand-gold text-brand-gold dark:fill-[#C19A6B] dark:text-[#C19A6B]" : "text-brand-border dark:text-[#3A3228]"}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-brand-text-secondary dark:text-[#A09080] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
          <span className="text-brand-gold dark:text-[#C19A6B] text-sm font-bold">{review.initials}</span>
        </div>
        <div>
          <p className="text-brand-text-primary dark:text-[#F5F0E8] text-sm font-medium leading-none mb-0.5">
            {review.name}
          </p>
          <p className="text-brand-text-secondary dark:text-[#A09080] text-[11px]">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const { t } = useLanguage();

  const doubled = [...customerReviews, ...customerReviews];
  const evenReviews = doubled.filter((_, i) => i % 2 === 0);
  const oddReviews = doubled.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-brand-gold dark:bg-[#C19A6B]" />
          <span className="text-brand-gold dark:text-[#C19A6B] text-xs uppercase tracking-widest font-medium">
            {t("reviews.badge")}
          </span>
          <span className="h-px w-12 bg-brand-gold dark:bg-[#C19A6B]" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-[#F5F0E8] mb-3 font-heading">
          {t("reviews.title")}
        </h2>
        <p className="text-brand-text-secondary dark:text-[#A09080] text-base max-w-lg mx-auto">
          {t("reviews.sectionSubtitle")}
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div className="flex animate-marquee-slow" style={{ width: "max-content" }}>
          {evenReviews.map((review, i) => (
            <ReviewCard key={`row1-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {oddReviews.map((review, i) => (
            <ReviewCard key={`row2-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute start-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg dark:from-[#0F0D0A] to-transparent z-10 hidden lg:block" />
      <div className="pointer-events-none absolute end-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg dark:from-[#0F0D0A] to-transparent z-10 hidden lg:block" />
    </section>
  );
}
