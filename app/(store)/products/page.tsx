"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react";

type Category = "all" | "women" | "men" | "unisex" | "niche" | "gifts";
type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";

function ProductsContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("category") as Category) ?? "all";
  const showOffers = searchParams.get("offer") === "true";
  const showNew = searchParams.get("new") === "true";

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory && initialCategory !== "all" ? [initialCategory] : []
  );
  const [priceMax, setPriceMax] = useState(300);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories: { key: Category; label_en: string; label_fr: string }[] = [
    { key: "all", label_en: "All Categories", label_fr: "Toutes les catégories" },
    { key: "women", label_en: "Women's", label_fr: "Femmes" },
    { key: "men", label_en: "Men's", label_fr: "Hommes" },
    { key: "unisex", label_en: "Unisex", label_fr: "Unisexe" },
    { key: "niche", label_en: "Niche", label_fr: "Niche" },
    { key: "gifts", label_en: "Gifts & Sets", label_fr: "Coffrets & Sets" },
  ];

  const sortOptions: { value: SortOption; label_en: string; label_fr: string }[] = [
    { value: "default", label_en: "Default", label_fr: "Par défaut" },
    { value: "price-asc", label_en: "Price: Low to High", label_fr: "Prix croissant" },
    { value: "price-desc", label_en: "Price: High to Low", label_fr: "Prix décroissant" },
    { value: "rating", label_en: "Top Rated", label_fr: "Mieux notés" },
    { value: "newest", label_en: "Newest", label_fr: "Nouveautés" },
  ];

  const toggleCategory = (cat: Category) => {
    if (cat === "all") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category as Category)
      );
    }

    // Offer filter
    if (showOffers) result = result.filter((p) => p.isOffer);
    if (showNew) result = result.filter((p) => p.isNew);

    // Price filter
    result = result.filter((p) => p.price <= priceMax);

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
    }

    return result;
  }, [selectedCategories, priceMax, sortBy, showOffers, showNew]);

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#0F0D0A]">
      {/* Page header */}
      <div className="bg-brand-surface dark:bg-[#1A1714] border-b border-brand-border dark:border-[#3A3228] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-brand-gold dark:bg-[#C19A6B]" />
            <span className="text-brand-gold dark:text-[#C19A6B] text-xs uppercase tracking-widest">
              Shop
            </span>
          </div>
          <h1 className="text-4xl font-bold text-brand-text-primary dark:text-[#F5F0E8] font-heading">
            {showOffers
              ? t("nav.offers")
              : showNew
              ? t("nav.newArrival")
              : t("common.allCategories")}
          </h1>
          <p className="text-brand-text-secondary dark:text-[#A09080] mt-2">
            {filteredProducts.length}{" "}
            {lang === "fr" ? "produits trouvés" : "products found"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setFiltersOpen((p) => !p)}
            className="flex items-center gap-2 border border-brand-border dark:border-[#3A3228] px-4 py-2 rounded-lg text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold dark:hover:border-[#C19A6B] hover:text-brand-gold dark:hover:text-[#C19A6B] transition-all duration-200"
          >
            <Filter size={16} />
            {t("common.filters")}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-brand-surface dark:bg-[#1A1714] border border-brand-border dark:border-[#3A3228] rounded-lg px-4 py-2 text-sm text-brand-text-primary dark:text-[#F5F0E8] pr-8 focus:outline-none focus:border-brand-gold dark:focus:border-[#C19A6B]"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {lang === "fr" ? o.label_fr : o.label_en}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute end-2 top-1/2 -translate-y-1/2 text-brand-text-secondary pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={[
              "w-64 flex-shrink-0 space-y-8",
              "lg:block",
              filtersOpen ? "block" : "hidden",
              "lg:sticky lg:top-24 lg:self-start",
            ].join(" ")}
          >
            {/* Mobile close */}
            <div className="flex items-center justify-between lg:hidden mb-4">
              <span className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold">
                {t("common.filters")}
              </span>
              <button
                onClick={() => setFiltersOpen(false)}
                className="text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Categories */}
            <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5">
              <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-4">
                {t("common.category")}
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const isSelected =
                    cat.key === "all"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.key);
                  return (
                    <button
                      key={cat.key}
                      onClick={() => toggleCategory(cat.key)}
                      className={[
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                        isSelected
                          ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
                          : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8] hover:bg-brand-surface dark:hover:bg-[#1A1714]",
                      ].join(" ")}
                    >
                      <span>{lang === "fr" ? cat.label_fr : cat.label_en}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-brand-gold" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5">
              <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-4">
                {t("common.priceRange")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-text-secondary dark:text-[#A09080]">0 {t("currency")}</span>
                  <span className="text-brand-gold font-medium">
                    {priceMax} {t("currency")}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={10}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-brand-gold cursor-pointer"
                />
                <div className="flex justify-between text-xs text-brand-text-secondary dark:text-[#A09080]">
                  <span>0</span>
                  <span>300 {t("currency")}</span>
                </div>
              </div>
            </div>

            {/* Sort (desktop) */}
            <div className="hidden lg:block bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] rounded-2xl p-5">
              <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-sm uppercase tracking-widest mb-4">
                {t("common.sortBy")}
              </h3>
              <div className="space-y-1">
                {sortOptions.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setSortBy(o.value)}
                    className={[
                      "w-full text-start px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      sortBy === o.value
                        ? "bg-brand-gold/10 text-brand-gold"
                        : "text-brand-text-secondary dark:text-[#A09080] hover:text-brand-text-primary dark:hover:text-[#F5F0E8] hover:bg-brand-surface dark:hover:bg-[#1A1714]",
                    ].join(" ")}
                  >
                    {lang === "fr" ? o.label_fr : o.label_en}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Category tabs — quick filter row */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
              {categories.map((cat) => {
                const isActive =
                  cat.key === "all"
                    ? selectedCategories.length === 0
                    : selectedCategories.length === 1 &&
                      selectedCategories[0] === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      if (cat.key === "all") {
                        setSelectedCategories([]);
                      } else {
                        setSelectedCategories([cat.key]);
                      }
                    }}
                    className={[
                      "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[40px]",
                      isActive
                        ? "bg-brand-gold text-brand-bg shadow-gold"
                        : "bg-brand-card dark:bg-[#242018] border border-brand-border dark:border-[#3A3228] text-brand-text-secondary dark:text-[#A09080] hover:border-brand-gold dark:hover:border-[#C19A6B] hover:text-brand-gold dark:hover:text-[#C19A6B]",
                    ].join(" ")}
                  >
                    {lang === "fr" ? cat.label_fr : cat.label_en}
                  </button>
                );
              })}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-brand-text-primary dark:text-[#F5F0E8] font-semibold text-xl mb-2">
                  {t("common.noProducts")}
                </h3>
                <p className="text-brand-text-secondary dark:text-[#A09080]">
                  {t("common.noProductsSubtext")}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceMax(300);
                  }}
                  className="mt-6 border border-brand-gold text-brand-gold px-6 py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
                >
                  {lang === "fr" ? "Effacer les filtres" : "Clear Filters"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brand-gold text-lg">Loading...</div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
