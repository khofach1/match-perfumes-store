"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { heroSlides } from "@/data/products";

export default function HeroSlider() {
  const { lang } = useLanguage();
  const autoplay = Autoplay({ delay: 4500, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      <div ref={emblaRef} className="overflow-hidden h-full" style={{ minHeight: "90vh" }}>
        <div className="flex h-full" style={{ minHeight: "90vh" }}>
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="relative flex-[0_0_100%] min-w-0"
              style={{ minHeight: "90vh" }}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={lang === "fr" ? slide.title_fr : slide.title_en}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />

              {/* Overlay gradients — intensity varies per slide */}
              {slide.scrim === "heavy" ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 dark:from-[#0F0D0A]/20 via-transparent to-brand-bg/75 dark:to-[#0F0D0A]/75" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/97 dark:from-[#0F0D0A]/97 via-brand-bg/80 dark:via-[#0F0D0A]/80 to-brand-bg/20 dark:to-[#0F0D0A]/20" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/10 dark:from-[#0F0D0A]/10 via-transparent to-brand-bg/60 dark:to-[#0F0D0A]/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/70 dark:from-[#0F0D0A]/70 via-brand-bg/30 dark:via-[#0F0D0A]/30 to-transparent" />
                </>
              )}

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="h-px w-8 bg-brand-gold" />
                      <span className="text-brand-gold text-xs uppercase tracking-widest font-medium">
                        Anar Perfumes
                      </span>
                    </div>
                    <h1 className="font-heading font-bold text-brand-text-primary dark:text-[#F5F0E8] mb-4 leading-tight text-4xl sm:text-6xl">
                      {lang === "fr" ? slide.title_fr : slide.title_en}
                    </h1>
                    <p className="text-brand-text-secondary dark:text-[#A09080] text-lg sm:text-xl mb-8 max-w-lg leading-relaxed">
                      {lang === "fr" ? slide.subtitle_fr : slide.subtitle_en}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-3 bg-brand-gold text-brand-bg font-semibold px-8 py-4 rounded-xl hover:bg-brand-gold-hover transition-all duration-300 shadow-gold hover:shadow-gold-lg text-base group"
                    >
                      {lang === "fr" ? slide.cta_fr : slide.cta_en}
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        className="absolute start-4 sm:start-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-bg/60 dark:bg-[#0F0D0A]/60 backdrop-blur-sm border border-brand-border dark:border-[#3A3228] text-brand-text-primary dark:text-[#F5F0E8] hover:bg-brand-gold hover:text-brand-bg hover:border-brand-gold transition-all duration-300 flex items-center justify-center z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute end-4 sm:end-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-bg/60 dark:bg-[#0F0D0A]/60 backdrop-blur-sm border border-brand-border dark:border-[#3A3228] text-brand-text-primary dark:text-[#F5F0E8] hover:bg-brand-gold hover:text-brand-bg hover:border-brand-gold transition-all duration-300 flex items-center justify-center z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-8 start-0 end-0 flex items-center justify-center gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={[
              "transition-all duration-300 rounded-full",
              i === selectedIndex
                ? "w-8 h-2 bg-brand-gold"
                : "w-2 h-2 bg-brand-text-secondary/50 hover:bg-brand-text-secondary",
            ].join(" ")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
