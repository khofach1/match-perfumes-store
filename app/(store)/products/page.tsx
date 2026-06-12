"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react";

type Category = "all" | "women" | "men" | "unisex" | "gifts";

function ProductsContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("category") as Category) ?? "all";
  const showOffers = searchParams.get("offer") === "true";
  const showNew = searchParams.get("new") === "true";

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    initialCategory !== "all" ? initialCategory : "all"
  );
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const categories: { key: Category; label_en: string; label_fr: string }[] = [
    { key: "all",    label_en: "All",    label_fr: "Tous"     },
    { key: "women",  label_en: "Women",  label_fr: "Femmes"   },
    { key: "men",    label_en: "Men",    label_fr: "Hommes"   },
    { key: "unisex", label_en: "Unisex", label_fr: "Unisexe"  },
    { key: "gifts",  label_en: "Gifts",  label_fr: "Coffrets" },
  ];

  const hasActiveFilters =
    selectedCategory !== "all" || selectedBrand !== "all";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (showOffers) result = result.filter((p) => p.isOffer);
    if (showNew)    result = result.filter((p) => p.isNew);

    return result;
  }, [selectedCategory, selectedBrand, showOffers, showNew]);

  return (
    <div className="min-h-screen bg-bone">
      {/* Page header */}
      <div className="border-b border-border px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-sand">
            {lang === "fr" ? "Collection" : "Collection"}
          </p>
          <h1 className="font-display text-5xl font-light text-ink sm:text-6xl">
            {showOffers
              ? t("nav.offers")
              : showNew
              ? t("nav.newArrival")
              : lang === "fr"
              ? "Tous les Produits"
              : "All Products"}
          </h1>
          <p className="mt-4 text-sm text-sand">
            {filteredProducts.length}{" "}
            {lang === "fr" ? "références" : "references"}
          </p>
        </div>
      </div>

      {/* Horizontal filter bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-bone/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none sm:gap-3">

            {/* Category pills */}
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={[
                  "flex-shrink-0 border px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-all duration-200",
                  selectedCategory === cat.key
                    ? "border-ink bg-ink text-bone"
                    : "border-border text-sand hover:border-ink-soft hover:text-ink",
                ].join(" ")}
              >
                {lang === "fr" ? cat.label_fr : cat.label_en}
              </button>
            ))}

            {/* Divider */}
            <div className="mx-1 h-5 w-px flex-shrink-0 bg-border" />

            {/* Brand dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="cursor-pointer appearance-none border border-border bg-transparent py-1.5 pl-4 pr-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-sand transition-all duration-200 hover:border-ink-soft hover:text-ink focus:outline-none"
              >
                <option value="all">
                  {lang === "fr" ? "Marque" : "Brand"}
                </option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={11}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sand"
              />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex flex-shrink-0 items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-sand transition-colors duration-200 hover:text-ink"
              >
                <X size={11} />
                {lang === "fr" ? "Effacer" : "Clear"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-sand">
              {lang === "fr" ? "Aucun résultat" : "No results"}
            </p>
            <h3 className="mb-2 font-display text-3xl font-light text-ink">
              {t("common.noProducts")}
            </h3>
            <p className="mb-10 text-sm text-sand">{t("common.noProductsSubtext")}</p>
            <button
              onClick={clearFilters}
              className="border border-ink px-8 py-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-ink hover:text-bone"
            >
              {lang === "fr" ? "Effacer les filtres" : "Clear Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-sand">
            Loading…
          </p>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
