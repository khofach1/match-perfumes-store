"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/data/products";

interface Props {
  titleFr: string;
  titleEn: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductCarousel({ titleFr, titleEn, products, viewAllHref = "/products" }: Props) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "prev" | "next") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-wider text-black">
            {lang === "fr" ? titleFr : titleEn}
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
            >
              {lang === "fr" ? "Voir tout →" : "View all →"}
            </Link>
            <button
              onClick={() => scroll("prev")}
              className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("next")}
              className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-48 sm:w-52">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
