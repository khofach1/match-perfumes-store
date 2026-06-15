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
  const { lang } = useLanguage();
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
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
            {showOffers
              ? (lang === "fr" ? "Offres" : "Offers")
              : showNew
              ? (lang === "fr" ? "Nouveautés" : "New Arrivals")
              : lang === "fr"
              ? "Tous les Produits"
              : "All Products"}
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            {filteredProducts.length}{" "}
            {lang === "fr" ? "produits" : "products"}
          </p>
        </div>
      </div>

      {/* Horizontal filter bar */}
      <div className="sticky top-[102px] z-30 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none sm:gap-3">

            {/* Category pills */}
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={[
                  "flex-shrink-0 border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200",
                  selectedCategory === cat.key
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-500 hover:border-black hover:text-black",
                ].join(" ")}
              >
                {lang === "fr" ? cat.label_fr : cat.label_en}
              </button>
            ))}

            {/* Divider */}
            <div className="mx-1 h-5 w-px flex-shrink-0 bg-gray-200" />

            {/* Brand dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="cursor-pointer appearance-none border border-gray-300 bg-transparent py-1.5 pl-4 pr-8 text-[11px] font-semibold uppercase tracking-wider text-gray-500 transition-all duration-200 hover:border-black hover:text-black focus:outline-none"
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
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto flex flex-shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 transition-colors duration-200 hover:text-black"
              >
                <X size={11} />
                {lang === "fr" ? "Effacer" : "Clear"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="mb-3 text-sm text-gray-400">
              {lang === "fr" ? "Aucun produit trouvé" : "No products found"}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 border border-black px-8 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white"
            >
              {lang === "fr" ? "Effacer les filtres" : "Clear Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
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
