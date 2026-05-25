"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function SelectedPackages() {
  const { t } = useLanguage();
  const autoplay = Autoplay({ delay: 3500, stopOnInteraction: true });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Show products marked as isOffer or isNew (first 8)
  const featured = products.filter((p) => p.isOffer || p.isNew).slice(0, 8);

  return (
    <section className="py-20 bg-brand-surface dark:bg-[#1A1714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-brand-gold dark:bg-[#C19A6B]" />
              <span className="text-brand-gold dark:text-[#C19A6B] text-xs uppercase tracking-widest font-medium">
                SÉLECTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-[#F5F0E8] font-heading">
              {t("packages.title")}
            </h2>
            <p className="text-brand-text-secondary dark:text-[#A09080] mt-2 text-sm">
              {t("packages.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-brand-border dark:border-[#3A3228] flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold dark:hover:border-[#C19A6B] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-brand-border dark:border-[#3A3228] flex items-center justify-center text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold dark:hover:border-[#C19A6B] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            <Link
              href="/products"
              className="hidden sm:inline-block border border-brand-gold dark:border-[#A07D4F] text-brand-gold dark:text-[#C19A6B] text-sm px-5 py-2 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all duration-300 ms-2"
            >
              {t("packages.viewAll")}
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 md:gap-5">
            {featured.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_calc(100%-1rem)] sm:flex-[0_0_calc(50%-0.625rem)] md:flex-[0_0_calc(33.333%-0.833rem)] lg:flex-[0_0_calc(25%-0.75rem)] min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
